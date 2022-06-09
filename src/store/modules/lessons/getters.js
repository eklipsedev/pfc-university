export default {
  lessons(state) {
    return state.lessons;
  },
  hasLessons(state) {
    return state.lessons || state.lessons.length > 0;
  },
  getUserLessons(state) {
    return state.userLessons;
  },
  getCompletedLessons(state) {
    return state.completedLessons;
  },
  getLessonStatus(state) {
    return state.lessons;
  },
};
