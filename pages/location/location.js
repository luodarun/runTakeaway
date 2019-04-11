// pages/location/location.js
import { unionArray} from '../../utils/util.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location_province: '',
    userAddress: [
      {address: '杀马特', name: '洗剪吹', gender: '1', phone: '15555555555'},
      { address: '烟锁池塘柳', name: '桃燃锦江提', gender: '0', phone: '16666666666' },
      { address: '圣地亚哥哥伦比亚地下室', name: '毛阿斗', gender: '1', phone: '17777777777' }
    ],
    location_address: [],
    title: ''
  },
  addLocation (data) {
    wx.navigateTo({
      url: '../addLocation/addLocation',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title
    })   
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
    let tempArray = [];
    for (let i in app.globalData.addressDetailInfo.address_reference) {
      tempArray.push(app.globalData.addressDetailInfo.address_reference[i]);
    }
    this.setData({
      location_province: app.globalData.addressDetailInfo.address_component.province,
      location_address: unionArray(tempArray, 'id')
    });
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