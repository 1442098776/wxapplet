const api = require('../../config/api.js');
const util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {
    value: '',
    orderNumber: '',
    index: 0,
    text:'',
    list: {
      status:'',
      orderNumber: 2220000,
      value: '觉得宝贝不太好，不想要了。觉得宝贝不太好，不想要了',
      consent: false,   //卖家是否同意退款,
      goods: [
        { id: 0, img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: 'VAV-808', price: 120.0, text: '迷你小巧、便携式、刘海内扣、不伤发', num: 2 },
        { id: 1, img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: 'VAV-808', price: 120.0, text: '迷你小巧、便携式、刘海内扣、不伤发', num: 2 }
      ],
      imgList: [],
      express: ['天天快递', '顺丰快递', '圆通快递'],
      company: '顺丰快递',
      expressNum: 24686407682,
      total: 120.0,
      total1: 120.0
    }
  },
  onLoad: function (options) {
    let orderNumber=options.orderNumber,
        text=options.text;
        this.setData({
          text:text
        })
    util.request(api,{orderNumber:orderNumber,user_id:app.globalData.loginState},"POST").then(res=>{
      console.log(res)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  checkValue(e) {
    let value = e.detail.value;
    this.setData({
      value: value
    })
  },
  //提交
  submit(e) {
    console.log(e)
    var upload = this.selectComponent('#upload')
    var imgList = upload.data.imgList;
    console.log(imgList)
    let orderNumber = e.currentTarget.dataset.ordernumber,
      express = e.currentTarget.dataset.express,
      expressnum = e.currentTarget.dataset.expressnum,
      that = this;
    if (this.data.list.express == '' && this.data.list.expressNum == '') {
      util.showModal('信息不完整,请把信息填写完整!', false, '确定').then(res => { })
    } else {
      if (this.data.list.status == 0) {
        util.request(api, { orderNumber: orderNumber, imgList: imgList, user_id: app.globalData.loginState }, "POST").then(res => {
          console.log(res)
          that.data.list.status = 0;
          that.setData({
            list: that.data.list
          })
        })
      }
      if (this.data.list.status == 2) {
        util.request(api, { orderNumber: orderNumber, express: express, expressnum: expressnum, user_id: app.globalData.loginState }, "POST").then(res => { 
          that.data.list.status=3;
          that.setData({
            list:that.data.list
          })
        })
      }
    }
  },
  //取消申请
  cancel(e) {
    // console.log(e)
    let orderNumber = e.currentTarget.dataset.ordernumber;
    util.request(api, { orderNumber: orderNumber, user_id: app.globalData.loginState }, "POST").then(res => { })
  },
  //修改申请
  change() {
    this.data.list.status = 0;
    this.setData({
      list: this.data.list
    })
  },
  //快递公司
  check(e) {
    // console.log(e)
    let index = e.detail.value;
    this.setData({
      index: index
    })
  },
  //快递单号
  inpputValue(e) {
    // console.log(e)
    let value = e.detail.value;
    this.data.list.expressNum = value;
    this.setData({
      list: this.data.list
    })
  }
})