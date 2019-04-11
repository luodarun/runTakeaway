// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  toPhoneLogin (options) {
    wx.navigateTo({
      url: '../phoneLogin/phoneLogin',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  getPhoneNumber (data) {
    if (data.detail.iv) { // 获取成功
      console.log(data.detail);
      wx.request({
        url: 'http://localhost:8080/user/codeToSession',  //本地服务器地址
        data: {
          encryptedData: data.detail.encryptedData,
          sessionKey: app.globalData.session_key,
          iv: data.detail.iv
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' //默认值
        },
        success: (res) => {
          
        },
        fail: function (res) {
          console.log("失败");
        }
      })
    }
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