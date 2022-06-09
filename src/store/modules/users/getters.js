export default {
  users(state) {
    return state.users;
  },
  hasUsers(state) {
    return state.users || state.users.length > 0;
  },
  filterUsers: (state) => (id) => {
    return state.users.find(user => user.user.id === id)
  }
};
