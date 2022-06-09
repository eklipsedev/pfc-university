export default {
  getUser(state) {
    return state.userId;
  },
  getCurrentUser(state) {
    return state.currentUser;
  },
  avatar(state) {
    return state.avatar;
  },
  token(state) {
    return state.token;
  },
  isAdmin(state) {
    return state.userRole === 'Admin';
  },
  isSuperAdmin(state) {
    return state.userRole === 'Super-Admin'
  },
  email(state) {
    return state.email;
  },
  firstName(state) {
    return state.firstName;
  },
  lastName(state) {
    return state.lastName;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  },
  isAuthLoading(state) {
    return state.isAuthLoading;
  },
};
