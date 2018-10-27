const api = require('../../config/api.js');
const util = require('../../utils/util.js');
const userInfo = require('../../services/userInfo.js');
// const public1=require('../../services/public.js');

const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
    userInfo: null,
    popup: false,
    week:['周一','周二','周三','周四','周五','周六','周日'],
    day: new Date().getUTCDay(),
    signIn:{
      integral:50,
      integralTotal:240,
      signIn: true,
    },
    url: ['/pages/orderManagement/orderManagement', '/pages/orderManagement/orderManagement', '/pages/orderManagement/orderManagement', '/pages/orderManagement/orderManagement',''],
    list: {
      signIn:true,
      fans: 0,
      fans1: 0,
      arr: [
        { id: 1, state:1, name: '待付款', num: 8, img: '/static/images/3.png' },
        { id: 2, state: 2, name: '待成团', num: 8, img: '/static/images/4.png' },
        { id: 3, state: 3, name: '待发货', num: 8, img: '/static/images/5.png' },
        { id: 4, state: 4, name: '待收货', num: 8, img: '/static/images/6.png' },
        { id: 5, state: '', name: '退款/售后', num: 8, img: '/static/images/7.png' },
      ],
      cash: 120.8
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(public.Encrypt('你他妈的'))
    // console.log(public.Decrypt('这是解密的字符串'))

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      util.getUserInfo().then(res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      })
    }
  },
  onShow: function (options){},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindGetUserInfo(e) {
    var that=this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          that.userLogin();
          util.showNavigation(2000,'正在登录')
        }else{ 
          console.log('bbb')
          wx.openSetting({
            success: function (res) {
              that.userLogin()
            }
          })
          that.setData({
            hasUserInfo: false
          })
        }
      }
    })
  },
  userLogin(){
    userInfo.loginByWeixin().then(msg => {
      app.globalData.userInfo = msg.data
      app.globalData.loginState = msg.user_id
      this.setData({
        userInfo: msg.data,
        hasUserInfo: true
      })
    })
  },
  //关团签到
  close(){
    this.data.popup=false;
    this.setData({
      popup: this.data.popup
    })
  },
  popupShow(){
    let that=this;
    util.request(api,{user_id:app.globalData.loginState},"POST").then(res=>{})
  },
  //提现
  Withdraw(){
    wx.navigateTo({
      url: '/pages/Withdraw/Withdraw',
    })
  }
})