// pages/hongbao/hongbao.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yxHongbaoList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(222);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log(111);
  },
  showOver(data) {
    wx.navigateTo({
      url: '../overhongbao/overhongbao',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let _this = this;
    wx.request({
      url: 'http://localhost:8080/hongbao/getUserYxHongbao', //本地服务器地址
      data: {
        userId: app.globalData.userInfo.userid
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function(res) {
        _this.setData({
          yxHongbaoList: res.data.data
        });
      },
      fail: function(res) {
        console.log("失败");
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})