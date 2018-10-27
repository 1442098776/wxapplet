const api = require('../../config/api.js');
const util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {
    height: '',
    sortIndex: 0,
    flag: true, //滚到底部开启
    page: 1, //页数
    //订单状态,1为待付款,2为待成团，3为待发货，4为待收货，5为待评价
      list: [{
        id: 0,
        orderNumber: 20200608,
        time: '2020-06-08 16:24:36',
        text: '已申请',
        state:0,
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
        freight: 0.0,
        piece: 1200,
        total: 12
      },
      {
        id: 1,
        orderNumber: 20200608,
        time: '2020-06-08 16:24:36',
        text: '已完成',
        state:1,
        product: [{
          id: 0,
          img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          name: 'VAV-808',
          price: 120,
          describe: '迷你小巧、便携式、刘海内扣、不伤发',
          num: 2
        }],
        freight: 0.0,
        piece: 1200,
        total: 12
      },
      {
        id: 2,
        orderNumber: 20200608,
        time: '2020-06-08 16:24:36',
        text: '已申请',
        state: 0,
        product: [{
          id: 0,
          img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          name: 'VAV-808',
          price: 120,
          describe: '迷你小巧、便携式、刘海内扣、不伤发',
          num: 2
        }],
        freight: 0.0,
        piece: 1200,
        total: 12,
        state: 3
      },
      {
        id: 3,
        orderNumber: 20200608,
        time: '2020-06-08 16:24:36',
        text: '已完成',
        state: 1,
        product: [{
          id: 0,
          img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          name: 'VAV-808',
          price: 120,
          describe: '迷你小巧、便携式、刘海内扣、不伤发',
          num: 2
        }],
        freight: 0.0,
        piece: 1200,
        total: 12
      },
      {
        id: 4,
        orderNumber: 20200608,
        time: '2020-06-08 16:24:36',
        text: '已拒绝',
        state: 2,
        product: [{
          id: 0,
          img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          name: 'VAV-808',
          price: 120,
          describe: '迷你小巧、便携式、刘海内扣、不伤发',
          num: 2
        }],
        freight: 0.0,
        piece: 1200,
        total: 12
      },
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight
        })
      }
    })
    // if (app.globalData.loginState == '') {
    //   app.loginModal()
    // } else {
    //   this.requestDate();
    // }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //滚到底部时加载
  lower(e) {
    console.log(e)
    if (this.data.flag) {
      this.requestDate()
    }
  },
  //请求数据
  requestDate() {
    this.setData({
      flag: false
    })
    var that = this,
      f;
    util.request(api, {
      page: this.data.page,
      catid: '20',
      user_id: app.globalData.loginState
    }, "GET").then(res => {
      if (res.length < 20) {
        f = false
      } else {
        f = true
      }
      var list = that.data.date.list.concat(res)
      var page = ++this.data.page
      that.setData({
        list: list,
        page: page,
        flag: f
      })
    })
  },
  //取消申请
  cancel(e) {
    console.log(e)
    var index = e.currentTarget.dataset.index,
      orderNumber = e.currentTarget.dataset.ordernumber,
      that = this;
    util.request(api, {
      orderNumber: orderNumber,
      user_id: app.globalData.loginState,
    }, "POST").then(res => {
      if (res.errno === 0) {
        that.data.list.splice(index, 1)
        that.setData({
          list: that.data.list
        })
      }
    })
  },
  //查看详情
  look(e){
    console.log(e)
    let orderNumber=e.currentTarget.dataset.ordernumber;
    wx.navigateTo({
      url: '/pages/salesReturn/salesReturn?orderNumber='+orderNumber
    })
  }
})