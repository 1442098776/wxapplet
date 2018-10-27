const api = require('../../config/api.js');
const util = require('../../utils/util.js');
const app = getApp()

Page({

  data: {
    isAllSelect: false,
    totalMoney: 0,
    conversion:false,     //兑换弹窗是否显示
    id:'',
    bale:{
      list: [{
        id: 1,
        Blean: false,
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: 'VAV-006玖瑰金',
        num: 10,
        debris: 120,
        debris1: 200,
        debrisMoney: 0.05,
        price: 120.0,
        price1: 100.0
      },
      {
        id: 2,
        Blean: false,
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: 'VAV-006玖瑰金',
        num: 1,
        debris: 120,
        debris1: 200,
        debrisMoney: 0.05,
        price: 120.0,
        price1: 100.0
      },
      {
        id: 3,
        Blean: false,
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: 'VAV-006玖瑰金',
        num: 1,
        debris: 120,
        debris1: 200,
        debrisMoney: 0.05,
        price: 120.0,
        price1: 100.0
      }
      ],
      list1: [{
        id: 1,
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: 'VAV-006玫瑰金',
        money: '10',
        data: '2020-06-08  12:00:00'
      },
      {
        id: 2,
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: 'VAV-006玫瑰金',
        money: '10',
        data: '2020-06-08  12:00:00'
      }
      ],
    },
    goodsConversion:{
      id:0,
      img:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      debris:60,
      debris1:60,
      exchangeNum:50,
      price:10
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.loginState == '') {
      app.loginModal()
    } else {
      this.requestDate();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  requestDate(){
    var that=this;
    util.request(api, {user_id:app.globalData.loginState}, "GET").then(res => {
      that.setData({
        bale: res.data
      })
    })
  },
  switchSelect(e) {
    // console.log(e)
    //获取item项的id，和数组的下标值
    var Allprice = 0,
      i = 0;
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    this.data.bale.list[index].Blean = !this.data.bale.list[index].Blean;
    //价格统计
    if (this.data.bale.list[index].Blean) {
      this.data.totalMoney = this.data.totalMoney + (this.data.bale.list[index].price * this.data.bale.list[index].num) - (this.data.bale.list[index].debris * this.data.bale.list[index].debrisMoney)
    } else {
      this.data.totalMoney = this.data.totalMoney - (this.data.bale.list[index].price * this.data.bale.list[index].num) + (this.data.bale.list[index].debris * this.data.bale.list[index].debrisMoney)
    }
    //是否全选判断
    for (i = 0; i < this.data.bale.list.length; i++) {
      Allprice = Allprice + (this.data.bale.list[index].price * this.data.bale.list[index].num) - (this.data.bale.list[index].debris * this.data.bale.list[index].debrisMoney)
      if (Allprice == this.data.totalMoney) {
        this.data.isAllSelect = true;
      } else {
        this.data.isAllSelect = false;
      }
    }

    this.setData({
      bale: this.data.bale,
      totalMoney: this.data.totalMoney,
      isAllSelect: this.data.isAllSelect
    })
  },
  //全选
  allSelect(e) {
    let i = 0;
    if (!this.data.isAllSelect) {
      for (i = 0; i < this.data.bale.list.length; i++) {
        if (this.data.bale.list[i].Blean == false) {
          this.data.bale.list[i].Blean = true;
          this.data.totalMoney = this.data.totalMoney + (this.data.bale.list[i].price * this.data.bale.list[i].num) - (this.data.bale.list[i].debris * this.data.bale.list[i].debrisMoney)
        }
      }
    } else {
      for (i = 0; i < this.data.bale.list.length; i++) {
        this.data.bale.list[i].Blean = false;
      }
      this.data.totalMoney = 0;
    }
    this.setData({
      bale: this.data.bale,
      isAllSelect: !this.data.isAllSelect,
      totalMoney: this.data.totalMoney
    })
  },
  //数量减
  subtract(e) {
    let index = e.target.dataset.index;
    if (this.data.bale.list[index].num > 1) {
      this.data.bale.list[index].num = this.data.bale.list[index].num - 1
      if (this.data.bale.list[index].Blean) {
        this.data.totalMoney = this.data.totalMoney - this.data.bale.list[index].price
      }
      this.setData({
        bale: this.data.bale,
        totalMoney: this.data.totalMoney
      })
    }
  },
  //数量加
  add(e) {
    let index = e.target.dataset.index;
    this.data.bale.list[index].num = this.data.bale.list[index].num + 1
    if (this.data.bale.list[index].Blean) {
      this.data.totalMoney = this.data.totalMoney + this.data.bale.list[index].price
    }
    this.setData({
      bale: this.data.bale,
      totalMoney: this.data.totalMoney
    })
  },
  //结算
  total(e) {
    console.log(e)
    let state = e.currentTarget.dataset.state,
    arr=[],
    listArr= this.data.bale.list.filter((item,i)=>{
      if (item.Blean==true){
        return item;
      }
    })
    arr.push(listArr)
    console.log(arr)
    util.request(api,{arr:arr},"POST").then(res=>{})
    wx.navigateTo({
      url: '/pages/order/order?state=' + state,
    })
  },
  //兑换优惠券
  conversion(e){
    console.log(e)
    let id=e.currentTarget.dataset.id,
        that=this;
    util.request(api,{id:id,user_id:app.globalData.loginState},"POST").then(res=>{
      that.setData({
        conversion:true,
        id:id
      })
    }).catch(err=>{})
  },
  //关团弹窗
  close(){
    this.setData({
      conversion: false
    })
  },
  //确认况换
  submit(e){
    console.log(e)
    let id=e.currentTarget.dataset.id,
        that=this;
    this.setData({
      conversion: false
    })
    util.request(api,{id:id,user_id:app.globalData.loginState},"POST").then(res=>{
      wx.showModal({
        title: '兑换成功',
        content: '可在购物时使用，或赠送好友',
        showCancel: false,
        success: function (msg) {
          console.log(msg)
          if (msg.confirm) {
            that.requestDate()
          }
        }
      })
    })
  }
})