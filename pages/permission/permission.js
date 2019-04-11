// pages/permission/permission.js
const app = getApp();
Page({

  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      wx.navigateTo({
        url: '../login/login',
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = e => {
        console.log(e);
        if (e.detail.rawData) {
          wx.request({
            url: 'http://localhost:8080/user/judgeSignature',  //本地服务器地址
            data: {
              sessionKey: e.detail.rawData + app.globalData.session_key
            },
            method: 'GET',
            header: {
              'content-type': 'application/json' //默认值
            },
            success: function (res) {
              console.log(res, e.detail.signature);
              if (res.data === e.detail.signature) {
                app.globalData.userInfo = e.detail.userInfo
                wx.navigateTo({
                  url: '../login/login',
                });
              }
            },
            fail: function (res) {
              console.log("失败");
            }
          });
        }
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          if (e.detail.rawData) {
            wx.request({
              url: 'http://localhost:8080/user/judgeSignature',  //本地服务器地址
              data: {
                sessionKey: e.detail.rawData + app.globalData.session_key
              },
              method: 'GET',
              header: {
                'content-type': 'application/json' //默认值
              },
              success: function (res) {
                console.log(res, e.detail.signature);
                if (res.data === e.detail.signature) {
                  app.globalData.userInfo = e.detail.userInfo
                  wx.navigateTo({
                    url: '../login/login',
                  });
                }
              },
              fail: function (res) {
                console.log("失败");
              }
            });
          }
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(app.globalData);
    if (e.detail.rawData) {
      wx.request({
        url: 'http://localhost:8080/user/judgeSignature',  //本地服务器地址
        data: {
          sessionKey: e.detail.rawData + app.globalData.session_key
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' //默认值
        },
        success: function (res) {
          if (res.data === e.detail.signature) {
            app.globalData.userInfo = e.detail.userInfo
            wx.navigateTo({
              url: '../login/login',
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