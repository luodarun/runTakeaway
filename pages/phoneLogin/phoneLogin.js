// pages/phoneLogin/phoneLogin.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    isPhone: false,
    isSend: false,
    code: '',
    phoneNumber: '',
    sendText: "获取验证码"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  judgePhone (options) {
    let reg = new RegExp(/^[1][3,4,5,6,7,8,9][0-9]{9}$/) // 手机正则
    if (reg.test(options.detail.value)) {
      this.setData({
        isPhone: true,
        phoneNumber: options.detail.value
      });
    } else {
      this.setData({
        isPhone: false,
        phoneNumber: options.detail.value
      });
    }
      
  },
  getCode(options) {
    this.setData({
      code: options.detail.value
    });
  },
  sendCode(options) {
    if (this.data.isPhone && !this.data.isSend) {
      let tempTimer = setInterval(() => {
        if (this.data.sendText === '获取验证码') {
          this.setData({
            sendText: 60
          });
        } else if (parseInt(this.data.sendText) >= 1) {
          let tempTime = parseInt(this.data.sendText);
          tempTime--;
          this.setData({
            sendText: tempTime
          });
        } else {
          this.setData({
            sendText: '获取验证码',
            isSend: false
          });
          clearInterval(tempTimer); 
        }
      }, 1000);
      this.setData({
        isSend: true
      });
    }
  },
  login (options) {
    if (this.data.isPhone && this.data.sendText !== '获取验证码' && this.data.code.length === 6) {
      app.globalData.userInfo.phonenum = this.data.phoneNumber;
      app.globalData.userInfo.nickname = app.globalData.userInfo.nickName;
      wx.request({
        url: 'http://localhost:8080/user/login',  //本地服务器地址
        data: app.globalData.userInfo,
        method: 'POST',
        header: {
          'content-type': 'application/json' //默认值
        },
        success: function (res) {
          if (res.data.code === 1002 || res.data.code === 0) {
            app.globalData.userInfo = res.data.data;
            wx.switchTab({
              url: '../user/user'
            });
          }
        },
        fail: function (res) {
          console.log("失败");
        }
      });
    } 
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})