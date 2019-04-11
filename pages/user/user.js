// pages/user/user.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    encryptPhoneNum: '',
    userImageSrc: '../../images/user.png',
    hongbaoAmount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  encryptPhoneNum (phoneNum) {
    if (!phoneNum) {
       return ""; 
    }
    let tempArray = [...phoneNum];
    tempArray.splice(3, 4, "****");
    return tempArray.join("");
  },
  toSignIn (data) {
    wx.navigateTo({
      url: '../permission/permission',
    }); 
  },
  toHongbao (data) {
    if (app.globalData.userInfo && app.globalData.userInfo.userid) {
      wx.navigateTo({
        url: '../hongbao/hongbao',
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
    if (app.globalData.userInfo && app.globalData.userInfo.phonenum) {
      let tempData = this.encryptPhoneNum(app.globalData.userInfo.phonenum);
      this.setData({
        encryptPhoneNum: tempData,
        userImageSrc: '../../images/user2.png',
        nickName: app.globalData.userInfo.nickname
      });
    }
    if (app.globalData.userInfo && app.globalData.userInfo.userid) {
      let _this = this;
      wx.request({
        url: 'http://localhost:8080/hongbao/selectYxCount',  //本地服务器地址
        data: {
          userId: app.globalData.userInfo.userid
        },
        method: 'POST',
        header: {
          'content-type': 'application/json' //默认值
        },
        success: function (res) {
          _this.setData({
            hongbaoAmount: res.data.data
          });
        },
        fail: function (res) {
          console.log("失败");
        }
      });
    }
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