
const state = {
  userId: null
}
// getters
const getters = {
  getUserId: function () {
    return state.userId
  }
}
// actions
const actions = {
  // setLastUser({commit, state}, params) {
  //   return new Promise((resolve, reject) => {
  //     user.setLastUser(params, r => {
  //       resolve(r.data);
  //     });
  //   });
  // }
}
// mutations
const mutations = {
  setUserId: function (state, userId) {
    state.userId = userId
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
