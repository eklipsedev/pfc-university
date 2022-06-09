export default {
  courses(state) {
    return state.courses;
  },
  hasCourses(state) {
    return state.courses || state.courses.length > 0;
  },
  getUserCourses(state) {
    return state.userCourses;
  },
  isLoading(state) {
    return state.isLoading;
  },
  getMostRecentlyCompleted(state) {
    return state.mostRecentlyCompleted;
  }
};
