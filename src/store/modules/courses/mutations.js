export default {
  setCourses(state, payload) {
    state.courses = payload;
  },
  setUserCourses(state, payload) {
    state.userCourses = payload;
  },
  setIsLoading(state, payload) {
    state.isLoading = payload;
  },
  setCoursePercentage(state, payload) {
    state.courses = { ...state.courses, completed: payload.completed };
  },
  setUserCoursePercentage(state, payload) {
    state.userCourses = { ...state.userCourses, completed: payload.completed };
  },
  setMostRecentlyCompleted(state, payload) {
    state.mostRecentlyCompleted = payload;
  },
};
