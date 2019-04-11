//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.getSystemInfo({
      success: res => {
        // 高度,宽度 单位为px
        this.globalData.windowHeight = res.windowHeight;
        this.globalData.windowWidth = res.windowWidth;
      }
    });
    

    // 登录
    wx.login({
      success: res => {
        console.log(res.code);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'http://localhost:8080/user/codeToSession',  //本地服务器地址
          data: {
            code: res.code
          },
          method: 'GET',
          header: {
            'content-type': 'application/json' //默认值
          },
          success: (res) => {
            this.globalData.openid = res.data.openid;
            this.globalData.session_key = res.data.session_key;
          },
          fail: function (res) {
            console.log("失败");
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    windowHeight: 0,
    windowWidth: 0,
    addressDetailInfo: {},
    address: '',
    longitude: 0,
    latitude: 0,
    openid: '',
    session_key: ''
  }
})