// pages/home/home.js
var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    local_text: "",
    allTypes: [],
    allGroupsTypes: [],
    guangGaoList: [],
    needLength: 10,
    screenHeight: app.globalData.windowHeight,
    top: 0,
    nums: 3.2,
    size: 15,
    sellerArray: [{}, {}, {}, {}, {}],
    selectLable: 0,
    selectLable2: 0,
    mask1Hidden: true,
    mask2Hidden: true,
    select_text: '综合排序',
    sortList: ["综合排序", "距离最近", "评分最高", "起送价最低", "配送费最低", "人均高到低", "人均低到高"],
    selectedSortListIndex: 0,  
    toView: '',
    filterArray: [
      {typesName: '商家特色', isMutAble: '1', types: [
        { typeName: '闰水专送', typeImage: '../../images/runShuizs.png'},
        { typeName: '到店自取', typeImage: '../../images/daoDianzq.png'},
        { typeName: '点评高分', typeImage: ''},
        { typeName: '品牌商家', typeImage: ''},
        { typeName: '免配送费', typeImage: ''},
        { typeName: '新商家', typeImage: ''},
        { typeName: '0元起送', typeImage: ''},
        { typeName: '跨天预订', typeImage: ''}
      ]},
      {
        typesName: '人均价', isMutAble: '0', types: [
          { typeName: '20元以下', typeImage: ''},
          { typeName: '20-40元', typeImage: ''},
          { typeName: '40元以上', typeImage: ''}
        ]
      },
      {
        typesName: '优惠活动', isMutAble: '1', types: [
          { typeName: '满减优惠', typeImage: ''},
          { typeName: '进店领券', typeImage: ''},
          { typeName: '折扣商品', typeImage: ''},
          { typeName: '门店新客立减', typeImage: ''},
          { typeName: '首单立减', typeImage: ''},
          { typeName: '满赠活动', typeImage: ''},
          { typeName: '满返代金券', typeImage: ''},
          { typeName: '减配送费', typeImage: ''},
          { typeName: '买赠活动', typeImage: ''},
          { typeName: '提前下单优惠', typeImage: ''}
        ]
      }
    ],
    selectedFilters: []
  },
  mask1Cancel () {
    this.setData({
      mask1Hidden: true
    })
  },
  mask2Cancel(data) {
    this.setData({
      mask2Hidden: true
    })
  },
  comfirmFilters () {
    this.mask2Cancel();
  },
  clearFilters () {
    this.setData({
      selectedFilters: []
    })
  },
  goSeller (data) {
    wx.navigateTo({
      url: '../seller/seller?title=鸿毛饺子' + data.currentTarget.dataset.index,
    })
  },
  selectFilter (options) {
    let tempArray = this.data.selectedFilters;
    if (tempArray.includes(options.currentTarget.dataset.name.typeName)) { // 已经选过了
      tempArray.splice(tempArray.indexOf(options.currentTarget.dataset.name.typeName), 1);
    } else {  
      tempArray.push(options.currentTarget.dataset.name.typeName);
    }
    this.setData({
      selectedFilters: tempArray
    });
  },
  selectLabel (data) {
    if (this.data.sortList.includes(data._relatedInfo.anchorTargetText)) {
      this.setData({
        mask1Hidden: false,
        mask2Hidden: true,
        selectLable: 0
      });
      this.scrollAim(data);
    } else if (data._relatedInfo.anchorTargetText === "销量高") {
      this.setData({
        selectLable: 1
      });
    } else if (data._relatedInfo.anchorTargetText === "速度快") {
      this.setData({
        selectLable: 2
      });
    } else if (data._relatedInfo.anchorTargetText === "减配送费") {
      let tempArray = this.data.selectedFilters;
      if (tempArray.includes("减配送费")) { // 已经选了
        tempArray.splice(tempArray.indexOf("减配送费"), 1);
      } else {
        tempArray.push("减配送费");
      }
      this.setData({
        selectedFilters: tempArray
      });
    } else {
      this.setData({
        mask1Hidden: true,
        mask2Hidden: false,
      });
      this.scrollAim(data);
    }
  },
  sortSelected (e) {
    var that = this;
    that.setData({
      selectedSortListIndex: e.currentTarget.dataset.index,
      select_text: e._relatedInfo.anchorTargetText
    });
  },
  toLocation(options) {
    wx.navigateTo({
      url: '../location/location',
    })
  },
  //控制回到顶部按钮的显示与消失
  scrollTopFun(e) {
    this.setData({
      top: e.detail.scrollTop
    });
  },
  scrollBottom(e) {
    console.log(123);
  },
  scrollAim(event) {
    this.setData({
      toView: 'shaixuan',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddress();
    this.createType();
  },
  getAddress () {
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: (res) => {
        app.globalData.longitude = res.longitude;
        app.globalData.latitude = res.latitude;
        var qqmapsdk = new QQMapWX({
          key: '63QBZ-OCX3I-Z6CGT-5KWTX-GMGDZ-35F72' // 必填
        });
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: app.globalData.latitude,
            longitude: app.globalData.longitude
          },
          fail: function (res) {
            console.log("获取地址失败" + res);
          },
          complete: (res) => {
            console.log(app.globalData.latitude, app.globalData.longitude);
            console.log(res);
            this.setData({
              local_text: res.result.address
            });
            app.globalData.address = res.result.address;
            app.globalData.addressDetailInfo = res.result;
          }
        });
      }
    })
  },
  createType() {
    let tempArray = [];
    for (let i = 0; i < 16; i++) {
      let tempObj = {};
      tempObj.imageSrc = '../../images/' + ((i % 8) + 1) + '.png';
      tempObj.functionName = "美食" + (i + 1);
      tempArray.push(tempObj);
    }
    this.setData({
      allTypes: tempArray
    });
    let tempArray2 = new Array(Math.ceil(tempArray.length / this.data.needLength));
    for (let k = 0; k < tempArray.length; k++) {
      if (!tempArray2[Math.floor(k / this.data.needLength)]) {
        tempArray2[Math.floor(k / this.data.needLength)] = [];
      }
      tempArray2[Math.floor(k / this.data.needLength)].push(tempArray[k]);
    }
    this.setData({
      allGroupsTypes: tempArray2
    });
    let tempArray3 = [];
    for (let i = 0; i < 3; i++) {
      let tempObj = {};
      tempObj.imageSrc = '../../images/lunbo' + (i + 1) + '.jpg';
      tempArray3.push(tempObj);
    }
    this.setData({
      guangGaoList: tempArray3
    });
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