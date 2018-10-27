const api = require('../../config/api.js');
const util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {
    orderNumber: '',
    text: '',
    value:'',
    imgList:[],
    product: [{
      id: 0,
      img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      name: 'VAV-808',
      price: 120,
      describe: '迷你小巧、便携式、刘海内扣、不伤发',
      num: 2
    },
    {
      id: 1,
      img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      name: 'VAV-808',
      price: 120,
      describe: '迷你小巧、便携式、刘海内扣、不伤发',
      num: 2
    }
    ],
  },
  onLoad: function (options) {
    let orderNumber = options.orderNumber,
      text = options.text;
    this.setData({
      orderNumber: orderNumber,
      text: text
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  checkValue(e){
    let value=e.detail.value;
    this.setData({
      value:value
    })
  },
  //提交
  submit(){
    var upload=this.selectComponent('#upload')
    var imgList=upload.data.imgList;
    console.log(imgList)
    if(this.data.value==""){
      util.showModal('请填写评价内容!',false,'确定').then(res=>{
        // console.log(res)
      })
    }else{
      util.request(api, { value: this.data.value, imgList: imgList, orderNumber: this.data.orderNumber, user_id: app.globalData.loginState }, "POST").then(res => { })
    }
  }
})