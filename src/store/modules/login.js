const state = {
  currentUser: {
    userId: null,
    userType: '1', // 1.监测人员 2.客户//默认进来是监测人员
    realName: 'libin',
    company: '公司姓名'
  },
  token: '',
  currentType: '1', // 默认1是主任务，2是纠错任务
  currentTask: null, // 记录当前的任务（记录监测中或者查看中的任务）
  qrcode: null// 记录扫码信息
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
  },
  getCurrentTask () {
    return state.currentTask
  },
  getQrcode () {
    return state.qrcode
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
  },
  setCurrentTask (state, currentTask) {
    state.currentTask = currentTask
  },
  setQrcode (state, qrcode) {
    state.qrcode = qrcode
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
