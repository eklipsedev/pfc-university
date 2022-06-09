export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.userRole = payload.userRole;
    state.firstName = payload.firstName;
    state.lastName = payload.lastName;
    state.email = payload.email;
    state.didAutoLogout = false;
    state.currentUser = payload.currentUser;
  },
  setAvatar(state, payload) {
    state.avatar = payload.avatar;
  },
  setAutoLogout(state) {
    return (state.didAutoLogout = true);
  },
  setIsAuthLoading(state, payload) {
    state.isAuthLoading = payload;
  },
};
