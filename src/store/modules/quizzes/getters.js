export default {
    quizzes(state) {
      return state.quizzes;
    },
    hasQuizzes(state) {
      return state.quizzes || state.quizzes.length > 0;
    },
    getQuizQuestions(state) {
      return state.quizzes;
    }
  };