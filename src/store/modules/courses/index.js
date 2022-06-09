import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      courses: [],
      userCourses: [],
      mostRecentlyCompleted: [],
      isLoading: false,
    };
  },
  mutations,
  actions,
  getters,
};
