import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      userId: null,
      firstName: null,
      lastName: null,
      email: null,
      token: null,
      userRole: null,
      didAutoLogout: false,
      avatar: "",
      isAuthLoading: false,
    };
  },
  mutations,
  actions,
  getters,
};
