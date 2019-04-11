// pages/seller/seller.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseLabel: '菜单',
    chooseLabel2: "热销",
    screenHeight: app.globalData.windowHeight,
    secondMenu: [
      {
        menuName: '热销',
        menuImage: '../../images/rexiao.png',
      },
      {
        menuName: '折扣',
        menuImage: '../../images/discount.png',
        menuDesc: '超过限购份数可原价购买'
      },
      {
        menuName: '特价菜',
      },
      {
        menuName: '一次性餐具',
      },
      {
        menuName: '冬季新品',
      },
      {
        menuName: '冬天的藕芋',
      },
      {
        menuName: '一人食半例菜',
      },
      {
        menuName: '老火靓汤',
      },
      {
        menuName: '套餐',
      },
      {
        menuName: '凉菜',
      },
      {
        menuName: '特色推荐',
      },
      {
        menuName: '烧味卤水',
      },
      {
        menuName: '粤式小炒',
      },
      {
        menuName: '浓香煲仔饭',
      },
      {
        menuName: '饮品饮料',
      },
      {
        menuName: '酒水类',
      },
      {
        menuName: '主食点心',
      }
    ],
    secondMenuGoods: [
      {
        goodsName: '碳烤羊排',
        goodsDesc: '真的真的很好吃，想吃你就多吃点，想吃吗？我就不给你你吃',
        sellNum: 111,
        praiseNum: 11,
        goodsPrice: 300,
        isRecommend: true,
        goodsDiscount: 9,
        discountNum: 1
      },
      {
        goodsName: '碳烤羊排',
        goodsDesc: '真的真的很好吃，想吃你就多吃点，想吃吗？我就不给你你吃',
        sellNum: 111,
        praiseNum: 11,
        goodsPrice: 300,
        isRecommend: true,
        goodsDiscount: 0,
        discountNum: 1
      },
      {
        goodsName: '碳烤羊排',
        goodsDesc: '真的真的很好吃，想吃你就多吃点，想吃吗？我就不给你你吃',
        sellNum: 111,
        praiseNum: 11,
        goodsPrice: 300,
        isRecommend: true,
        goodsDiscount: 0,
        discountNum: 1
      }
    ],
    toView: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
    let tempArray = this.data.secondMenu;
    tempArray.forEach((item) => {
      item.goods = this.data.secondMenuGoods;
    });
    this.setData({
      secondMenu: tempArray
    });
  },
  choose (options) {
    this.setData({
      chooseLabel: options.currentTarget.dataset.name
    });
  },
  choose2 (options) {
    this.setData({
      chooseLabel2: options.currentTarget.dataset.name,
      toView: 'secondMenuDetail' + options.currentTarget.dataset.index
    });
  },
  scrollGoods (options) {
    console.log(options);
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