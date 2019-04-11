Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    nums: {
      type: Number,
      value: 0,
    },
    size: {
      type: Number,
      value: 0,
    },
    isDisable: {
      type: Boolean,
      value: false
    }
  },
  data: {
    // 这里是一些组件内部数据
    starArray: [],
    starNum: 0,
    imageSize: 0
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached() {
      this._getArrayByNums(this.properties.nums);
    }
  },
  methods: {
    _getArrayByNums (data) {
      let jisu = 0;
      if ((data + '').indexOf('.') > 0) { //是有小数
        jisu = Math.floor(data);
      } else {
        jisu = data;
      }
      let tempArray = ['../../images/nullStar.png', '../../images/nullStar.png', '../../images/nullStar.png', '../../images/nullStar.png', '../../images/nullStar.png']; 
      while (jisu > 0) {
        jisu--;
        tempArray[jisu] = '../../images/fullStar.png';
      }
      if ((data + '').indexOf('.') > 0) {
        tempArray[Math.floor(data)] = '../../images/halfStar.png';
      }
      this.setData({
        starArray: tempArray,
        imageSize: this.properties.size,
        starNum: data
      });
    }
  }
})