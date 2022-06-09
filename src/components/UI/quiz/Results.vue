<template>
  <section v-if="submittedStage" class="message" :class="chooseClass">
    <font-awesome-icon
      class="margin-right"
      :class="chooseClass"
      :icon="chooseIcon"
    />
    <div class="content">
      <h3 :class="chooseClass">{{ chooseHeader }}</h3>
      <p>{{ chooseMessage }}</p>
      <p>{{ chooseSubMessage }}</p>
    </div>
  </section>
</template>

<script>
export default {
  props: [
    "submittedStage",
    "submitStatus",
    "userScore",
    "userQuestionsRemaining",
  ],
  data() {
    return {
      status: this.submitStatus,
      score: this.userScore,
      questionsRemaining: this.userQuestionsRemaining,
    };
  },
  computed: {
    chooseIcon() {
      if (this.status === "Incomplete") {
        return "exclamation-circle";
      } else if (this.status === "Failed") {
        return "times-circle";
      } else {
        return "check-circle";
      }
    },
    chooseClass() {
      if (this.status === "Incomplete") {
        return "incomplete";
      } else if (this.status === "Failed") {
        return "failed";
      } else {
        return "passed";
      }
    },
    chooseHeader() {
      if (this.status === "Incomplete") {
        return "Test incomplete";
      } else if (this.status === "Failed") {
        return "Test not passed";
      } else {
        return "Passed!";
      }
    },
    chooseMessage() {
      if (this.status === "Incomplete") {
        return "Sorry, but you haven't answered all the questions.";
      } else if (this.status === "Failed") {
        return "Sorry, but you have not passed the test.";
      } else {
        return "Congratulations! You passed the test.";
      }
    },
    chooseSubMessage() {
      if (this.status === "Incomplete") {
        return `You have ${this.questionsRemaining} questions remaining.`;
      } else if (this.status === "Failed") {
        return `You scored ${this.score}% — a score of 75% or higher is required to pass.`;
      } else {
        return `You scored ${this.score}% — a score of 75% or higher was required to pass.`;
      }
    },
  },
  created() {
    console.log(this.status)
  }
};
</script>

<style scoped>
.margin-right {
  font-size: 24px;
  margin-right: 20px;
}
p {
  margin-top: 0;
  margin-bottom: 5px;
}
h3 {
  margin-top: 0;
  margin-bottom: 5px;
}
h3.incomplete,
svg.incomplete {
  color: #6c6c6c;
}
h3.failed,
svg.failed {
  color: #ff0101;
}
h3.passed,
svg.passed {
  color: #79a624;
}
section.incomplete {
  border-left-color: #6c6c6c;
}
section.failed {
  border-left-color: #ff0101;
}
section.passed {
  border-left-color: #79a624;
}
.message {
  display: flex;
  margin-bottom: 15px;
  padding: 20px 15px;
  align-items: flex-start;
  text-align: left;
  border-left: 5px solid transparent;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 1px 1px 10px 0 rgb(0 0 0 / 15%);
  color: #6c6c6c;
}
</style>
