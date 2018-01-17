const state = {
  currentUser: {
    userId: null,
    userType: '1',
    realName: 'libin',
    company: '公司姓名'
  },
  token: ''
}
// getters
const getters = {
  getCurrentUser: function () {
    return state.currentUser
  },
  getToken () {
    return state.token
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
  setCurrentUser: function (state, currentUser) {
    state.currentUser = currentUser
  },
  setToken (state, token) {
    state.token = token
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
