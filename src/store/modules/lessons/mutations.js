export default {
  setLessons(state, payload) {
    state.lessons = payload;
  },
  setUserLessons(state, payload) {
    state.userLessons = payload;
  },
  setCompletedLessons(state, payload) {
    state.completedLessons = payload;
  },
  updateCompletedLessons(state, payload) {
    if (state.completedLessons.includes(payload.name)) {
      const index = state.completedLessons.indexOf(payload.name);
      state.completedLessons.splice(index, 1);
    } else {
      state.completedLessons.push(payload.name);
    }
  },
  updateLessonStatus(state, payload) {
    state.userLessons = { ...state.userLessons, complete: payload.isComplete };
  },
};
