const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({
  data: {
    height: '',
    width: '',
    active: false,
    addressList: {
      id: '',
      name: '', //联系人
      tel: '', //联系号码
      Province: ['广东省', '深圳市', '光明新区'],
      address: '', //地址
      setAddress: true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    if (options.id != undefined) {
      this.data.addressList.id = options.id
      this.data.addressList.name = options.name
      this.data.addressList.tel = options.tel
      this.data.addressList.Province[0] = options.Province0
      this.data.addressList.Province[1] = options.Province1
      this.data.addressList.Province[2] = options.Province2
      this.data.addressList.address = options.address
      this.data.addressList.setAddress = options.setAddress
      this.setData({
        addressList: this.data.addressList,
        active:true
      })
    }
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          height: res.windowHeight,
          width: res.windowWidth
        })
      },
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //样式改变
  active() {
    this.setData({
      active: true
    })
  },
  //收货人
  inputName(e) {
    let value = e.detail.value
    this.data.addressList.name = value
    this.setData({
      addressList: this.data.addressList
    })
    if (this.data.addressList.name.length == 0) {
      this.Toast('收货人不能为空!', 1000, "none")
    }
  },
  //电话号码
  inputTel(e) {
    let str = /^1\d{10}$/;
    let tel = e.detail.value;
    if (str.test(tel)) {
      this.data.addressList.tel = e.detail.value
      this.setData({
        addressList: this.data.addressList
      })
    } else {
      let that = this;
      wx.showToast({
        title: '手机号不正确!',
        icon: 'none',
        duration: 1000,
        success: function() {
          that.data.addressList.tel = ''
          setTimeout(function() {
            that.setData({
              addressList: that.data.addressList
            })
          }, 1000)
        }
      })
    }
  },
  //省市区
  changeRegin(e) {
    // console.log(e)
    this.data.addressList.Province = e.detail.value
    this.setData({
      addressList: this.data.addressList
    })
  },
  //详细地址
  inputAddress(e) {
    let value = e.detail.value
    this.data.addressList.address = value
    this.setData({
      addressList: this.data.addressList
    })
    if (this.data.addressList.address.length == 0) {
      this.Toast('地址不能为空!', 1000, "none")
    }
  },
  //默认设置
  setAddress() {
    this.data.addressList.setAddress = !this.data.addressList.setAddress
    this.setData({
      addressList: this.data.addressList
    })
  },
  //添加
  submit(e) {
    // console.log(e.detail.value)
    let id = e.detail.value.id,
      name = e.detail.value.name,
      tel = e.detail.value.tel,
      Province = e.detail.value.Province,
      address = e.detail.value.address,
      setAddress = e.detail.value.setAddress;
    let str = /^1\d{10}$/;
    this.setData({
      addressList: e.detail.value
    })
    console.log(this.data.addressList)
    if (this.data.addressList.name.length == 0 || str.test(tel) == false || this.data.addressList.Province.length == 0 || this.data.addressList.address.length == 0) {
      this.Toast('请检查内容,不能为空!', 1000, "none")
      return false;
    }
    if (this.data.addressList.name.length != 0 && str.test(tel) == true && this.data.addressList.Province.length != 0 && this.data.addressList.address.length != 0) {
      util.request(api, {
        addressList: this.data.addressList
      }, "POST").then(res => {
        this.Toast('添加成功', 2000, "success")
      })
    }
  },
  Toast(msg, time, icon) {
    wx.showToast({
      title: msg,
      duration: time,
      icon: icon,
      mask:true
    })
  }
})