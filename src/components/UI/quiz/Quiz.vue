<template>
<div class="quiz-wrapper" v-for="quiz in getQuizzes" :key="quiz.id">
  <results
    v-if="submittedStage"
    :submittedStage="submittedStage"
    :submitStatus="status"
    :userScore="score"
    :userQuestionsRemaining="getQuestionsRemaining"
  ></results>
  <initial-state
    v-if="introStage"
    :introStage="introStage"
    :setQuestionStage="setQuestionStage"
    :title="quiz.name"
    :estimated-time="quiz.completionTime"
  ></initial-state>
  <div v-if="questionStage">
    <form
      @submit.prevent="submitQuiz"
      class="quiz"
    >
      <div class="messages"></div>
      <ol class="questions">
        <question
          v-for="(question, index) in quiz.assignmentRef.questions"
          :key="index"
          :questionTitle="question.question"
          :isCorrect="question.isCorrect"
          :isQuizSubmitted="submittedStage"
          :choices="question.choices"
          :correctChoice="question.correctChoice"
          :questionIndex="index"
          :v-model="index"
          @set-choice="addChoiceToAnswers"
        ></question>
      </ol>
      <base-button v-if="questionStage && !submittedStage" mode="primary"
        >Submit Quiz</base-button
      >
      <base-button
        v-if="submittedStage && status !== 'Passed' && status !== 'Incomplete'"
        mode="primary"
        @click="setQuestionStage"
        >Retake Quiz<font-awesome-icon class="margin-left" icon="sync-alt"
      /></base-button>
      <base-button v-if="submittedStage && status === 'Passed'" mode="primary"
        >Continue to Next Course</base-button
      >
    </form>
  </div>
  </div>
</template>

<script>
import Question from "./Question.vue";
import InitialState from "./InitialState.vue";
import Results from "./Results.vue";

export default {
  components: {
    Question,
    InitialState,
    Results,
  },
  data() {
    return {
      introStage: true,
      questionStage: false,
      submittedStage: false,
      questions: [],
      answers: [],
      correct: 0,
      score: null,
      status: "",
    };
  },
  computed: {
    getQuizzes() {
      const lessonId = this.$route.params.lessonId;
      const lessons = this.$store.getters.lessons;
      return lessons.filter((lesson) => {
        if (lesson.id === lessonId) {
          return true;
        }
      });
    },
    getQuestionsRemaining() {
      return this.questions.length - this.answers.length;
    },
  },
  methods: {
    submitQuiz() {
      // loop through list of quizzes
      this.getQuizzes.forEach((quiz) => {
        // loop through questions of given quiz
        quiz.assignmentRef.questions.forEach((question, index) => {
          //push the returned questions into the questions array
          this.questions.push(question.question);
          // set the user choice equal to the equavalent answer returned by index
          const userChoice = this.answers[index];
          // check if they are equal or not
          if (userChoice === question.correctChoice) {
            // add to the number of correct answers
            this.correct++;
            // set the correct answers to green
            this.$store.dispatch("setQuizzes");
            question.isCorrect = true;
          } else {
            // set incorrect answers to red
            question.isCorrect = false;
          }
        });

        // set the score state equal to the resulting score
        this.score = (this.correct / this.questions.length) * 100;
        console.log(this.correct + " === " + this.score);

        // set the status based on the score the user received
        if (this.score < 75) {
          this.status = "Failed";
        } else if (this.score >= 75) {
          this.status = "Passed";
        } else if (this.answers.length !== this.questions.length) {
          this.status = "Incomplete";
        }

        // set the stage to submitted
        this.setSubmittedStage();
      });
    },
    isThisCorrect() {},
    addChoiceToAnswers(choice) {
      this.answers.push(choice);
    },
    setQuestionStage() {
      this.introStage = false;
      this.questionStage = true;
      this.submittedStage = false;
      this.answers = [];
    },
    setSubmittedStage() {
      this.introStage = false;
      this.questionStage = true;
      this.submittedStage = true;
    },
  },
};
</script>

<style scoped>
.quiz {
  width: 100%;
  margin: 0;
}
.quiz-wrapper {
  margin: 0 auto;
  padding: 50px;
  max-width: 800px;
}
.questions {
  display: flex;
  padding-left: 40px;
  flex-direction: column;
  list-style: none;
  color: #6c6c6c;
}
.margin-left {
  margin-left: 8px;
}
</style>
