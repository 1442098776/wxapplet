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
    state: 0,
    date:{
    sort: [{
        id: 0,
        text: '全部',
        state: 0
      },
      {
        id: 1,
        text: '待付款',
        state: 1
      },
      {
        id: 2,
        text: '待成团',
        state: 2
      },
      {
        id: 3,
        text: '待发货',
        state: 3
      },
      {
        id: 4,
        text: '待收货',
        state: 4
      },
      {
        id: 5,
        text: '待评价',
        state: 5
      }
    ],
    list: [{
        id: 0,
        orderNumber: 20200608,
        time: '2020-06-08 16:24:36',
        text: '待付款',
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
        total: 12,
        state: 1
      },
      {
        id: 1,
        orderNumber: 20200608,
        time: '2020-06-08 16:24:36',
        text: '待成团',
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
        state: 2
      },
      {
        id: 2,
        orderNumber: 20200608,
        time: '2020-06-08 16:24:36',
        text: '待发货',
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
        text: '待收货',
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
        state: 4
      },
      {
        id: 4,
        orderNumber: 20200608,
        time: '2020-06-08 16:24:36',
        text: '待评价',
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
        state: 5
      },
    ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let state = options.state;
    console.log(state)
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          height: res.windowHeight
        })
      }
    })
    if (app.globalData.loginState == '') {
      app.loginModal()
    } else {
      this.setData({
        state:state
      })
      this.requestDate();
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //点击头部的分类
  sort(e) {
    let index = e.currentTarget.dataset.index,
      state = e.currentTarget.dataset.state,
      that = this;
    this.setData({
      sortIndex: index,
      state: state
    })
    util.request(api, {
      state: state,
      user_id: app.globalData.loginState
    }, "POST").then(res => {
      that.setData({
        list: res
      })
    })
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
      state: this.data.state,
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
  //取消
  cancel(e) {
    console.log(e)
    var index = e.detail.index,
      orderNumber = e.detail.ordernumber,
      that = this;
    util.request(api, {
      orderNumber: orderNumber,
      user_id: app.globalData.loginState,
    }, "POST").then(res => {
      if (res.errno === 0) {
        that.data.date.list.splice(index, 1)
        that.setData({
          date: that.data.date
        })
      }
    })
  },
  //确认收货
  affirm(e) {
    console.log(e)
    let orderNumber = e.detail,
      that = this;
    util.request(api, {
      user_id: app.globalData.loginState
    }, "POST").then(res => {
      that.data.date.list=res
      that.setData({
        date:that.data.date
      })
    })
  }
})