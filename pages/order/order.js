const util = require('../../utils/util.js');
const api = require('../../config/api.js');

Page({
  data: {
    shareUser:'',    //分销用户
    address: false,
    // btnNum:false,
    disabled:false,
    totalNum:0,
    totalMoney: 0,
    state: 1,   //state状态 1为背包订单 2为普通订单 3拼团订单
    list: {
      contact: {
        name: '黄展强',                              //联系人
        tel: '15638176238',                         //联系号码
        address: '广东省深圳市光明新区今日电器工业园'  //地址
      },
      count: [{
        id: 1,
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: 'VAV-808',                            //商品名称
        price: 120,                                 //价格
        text: '迷你小巧、便携式、刘海内扣、不伤发',    //商品介绍
        num: 10,                                    //数量
        color: ['#F8C2CF', '#A7E9E2', '#E9BEA7'],   //颜色
        colorIndex:0,                               //颜色下标
        debris: 5,                                  //碎片抵扣
        ticket: 10,                                 //优惠券
        freight: 0                                  //运费
      },
      {
        id: 2,
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: 'VAV-808',
        price: 120,
        text: '迷你小巧、便携式、刘海内扣、不伤发',
        num: 1,
        color: ['#F8C2CF', '#A7E9E2', '#E9BEA7'],
        colorIndex: 0,
        debris: 5,
        ticket: 10,
        freight: 0
      }
      ],
      totalNum: 1,     //总件数
      totalMoney:1000  //总金
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let state=options.state,
        shareUser=options.shareUser;

    this.setData({
      state:state,
      shareUser:shareUser
    })
    this.total()

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //计算总金额
  total(){
    let i=0;
    for (i = 0; i < this.data.list.count.length;i++){
      this.data.totalNum = this.data.totalNum + this.data.list.count[i].num;
      this.data.totalMoney = this.data.totalMoney + this.data.list.count[i].price * this.data.list.count[i].num - this.data.list.count[i].debris - this.data.list.count[i].ticket;
    }
    this.setData({
      totalNum: this.data.totalNum,
      totalMoney: this.data.totalMoney,
      list:this.data.list
    })
  },
  //减数量
  subtract(e){
    // console.log(e)
    let index=e.currentTarget.dataset.index;
    if(this.data.list.count[index].num!=1){
      this.data.list.count[index].num =this.data.list.count[index].num-1;
      this.data.totalNum = this.data.totalNum-1;
      this.data.totalMoney = this.data.totalMoney-this.data.list.count[index].price;
    }else{
      this.setData({
        disabled:true
      })
    }
    this.setData({
      totalNum: this.data.totalNum,
      totalMoney: this.data.totalMoney,
      list:this.data.list
    })
    console.log(this.data.list.count[index].num)
  },
  // 选择颜色
  colorCheck(e){
    let index0=e.currentTarget.dataset.index0;
    this.data.list.count[index0].colorIndex=e.currentTarget.dataset.index
    this.setData({
      list:this.data.list
    })
  },
  add(e){
    let index = e.currentTarget.dataset.index;
    this.data.list.count[index].num = this.data.list.count[index].num + 1;
    this.data.totalNum = this.data.totalNum +1;
    this.data.totalMoney = this.data.totalMoney + this.data.list.count[index].price;
    if (this.data.list.count[index].num > 1) {
      this.setData({
        disabled: false
      })
    }
    this.setData({
      totalNum: this.data.totalNum,
      totalMoney: this.data.totalMoney,
      list:this.data.list
    })
  },
  //付款
  startPay(e){
    console.log(e)
    let shareUser = e.currentTarget.dataset.shareuser;
    util.login().then(res=>{
      if(res.code){
        util.request(api, { code: res.code, shareUser: shareUser, user_id: app.globalData.loginState},"POST").then(res=>{
          wx.requestPayment({
            'timeStamp': '',
            'nonceStr': '',
            'package': '',
            'signType': '',
            'paySign': '',
            'success':function(res){
              console.log(res)
            },
            'fail':function(err){
              console.log(err)
            }
          })
        })
      }
    })
  }
})