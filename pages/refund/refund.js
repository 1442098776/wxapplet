const api = require('../../config/api.js');
const util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {
    applyState:0,
    tapIndex:0,
    textareaValue:'',
    list:{
      status:0,     //申请状态
      consent:true,   //卖家是否同意退款
      total:120.0,
      orderNumber:2000000000044,
      goods:[
        { id: 0, img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: 'VAV-808', price: 120.0, num: 2, text:'迷你小巧、便携式、刘海内扣、不伤发'},
        { id: 1, img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: 'VAV-808', price: 120.0, num: 2, text: '迷你小巧、便携式、刘海内扣、不伤发' }
      ],
      itemList: ['我不想要了', '不小心拍多了', '我拍错了'],
      cause:'我不想要了',
      time:'2020-06-08 12:24:46',
      refundNum:202222021354
    }
  },
  onLoad: function (options) {
    console.log(options)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //原因
  check(e){
    let index=e.detail.value;
    this.setData({
      tapIndex:index
    })
  },
  //说明
  inputValue(e){
    let value=e.detail.value;
    this.setData({
      textareaValue:value
    })
  },
  //提交
  submit(e){
    let orderNumber=e.currentTarget.dataset.ordernumber,
      cause = this.data.list.itemList[this.data.tapIndex],
      value = this.data.textareaValue;
    this.data.list.status=1
    this.setData({
      list:this.data.list
    })
    util.request(api, { orderNumber: orderNumber,cause:cause,value:value, user_id: app.globalData.loginState},"POST").then(res=>{})
  },
  //修改申请
  change(e){
    this.data.list.status=0;
    this.setData({
      list:this.data.list
    })
  },
  //取消申请
  cancel(e){
    let orderNumber=e.currentTarget.dataset.ordernumber;
    util.request(api,{orderNumber:orderNumber,user_id:app.globalData.loginState},"POSTG").then(res=>{
      wx.navigateTo({
        url: '/pages/ordeMangement/ordeManagement',
      })
    })
  }
})