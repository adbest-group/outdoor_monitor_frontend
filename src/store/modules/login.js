const state = {
  currentUser: {
    userId: null,
    userType: '0', // 1.监测人员 0.客户
    realName: 'libin',
    company: '公司姓名'
  },
  token: '',
  currentType: '1'// 默认1是主任务，2是纠错任务
}
// getters
const getters = {
  getCurrentUser: function () {
    return state.currentUser
  },
  getToken () {
    return state.token
  },
  getCurrentType () {
    return state.currentType
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
  },
  setCurrentType (state, currentType) {
    state.currentType = currentType
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
