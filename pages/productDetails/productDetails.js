const api = require('../../config/api.js');
const util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {
    state: '',  //拼团详情
    shareUser: '',    //分享的用户
    time: '',
    autoplay: true,
    interval: 4000,
    duration: 1000,
    popup: false,
    hint: [{
      img: '/static/images/heart.png',
      text: '自营电商'
    },
    {
      img: '/static/images/heart.png',
      text: '正品保证'
    },
    {
      img: '/static/images/heart.png',
      text: '七天退换'
    },
    {
      img: '/static/images/heart.png',
      text: '全场包邮'
    }
    ],
    list: {
      dateTime: 1111111,
      id: 0,
      goods: {
        debris: 24,
        debris1: 60,
        debrisPice: 0.5,
        price: 128.0,
        name: 'VAV-808',
        sell: 2400,
        text: '迷你小巧、便携式、刘海内扣、不伤发'
      },
      group: {
        price: 128.8,
        price1: 128.0,
        name: 'VAV-808',
        lump: 2400,
        text: '迷你小巧、便携式、刘海内扣、不伤发',
        bying: [{
          img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          user: '木兮、叶兮',
          num: 3
        },
        {
          img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          user: '木兮、叶兮',
          num: 3
        },
        {
          img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          user: '木兮、叶兮',
          num: 3
        }
        ]
      },
      imgUrls: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'],
      evaluate: [
        {
          id: 0,
          user: '木兮、叶兮',
          time: '2020-06-04',
          text: '性价比高好用，值得购买；性价比高好用，值得购买；性价比高好用，值得购买;',
          img: ['https://cdnapisec.kaltura.com/p/783072/thumbnail/quality/75/entry_id/1_jr8zx75a/width/1920', 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg']
        },
        {
          id: 1,
          user: '木兮、叶兮',
          time: '2020-06-04',
          text: '性价比高好用，值得购买；性价比高好用，值得购买；性价比高好用，值得购买;',
          img: ['https://cdnapisec.kaltura.com/p/783072/thumbnail/quality/75/entry_id/1_jr8zx75a/width/1920', 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg']
        }
      ],
      recommend: [
        { id: 0, url: 'https://cdnapisec.kaltura.com/p/783072/thumbnail/quality/75/entry_id/1_jr8zx75a/width/1920', name: 'VAV-602补水梳', price: 168.0 },
        { id: 1, url: 'https://cdnapisec.kaltura.com/p/783072/thumbnail/quality/75/entry_id/1_jr8zx75a/width/1920', name: 'VAV-602补水梳', price: 168.0 },
        { id: 2, url: 'https://cdnapisec.kaltura.com/p/783072/thumbnail/quality/75/entry_id/1_jr8zx75a/width/1920', name: 'VAV-602补水梳', price: 168.0 },
        { id: 3, url: 'https://cdnapisec.kaltura.com/p/783072/thumbnail/quality/75/entry_id/1_jr8zx75a/width/1920', name: 'VAV-602补水梳', price: 168.0 },
      ],
      details: ['https://cdnapisec.kaltura.com/p/783072/thumbnail/quality/75/entry_id/1_jr8zx75a/width/1920', 'https://cdnapisec.kaltura.com/p/783072/thumbnail/quality/75/entry_id/1_jr8zx75a/width/1920', 'https://cdnapisec.kaltura.com/p/783072/thumbnail/quality/75/entry_id/1_jr8zx75a/width/1920']
    }
  },
  onLoad: function (options) {
    var user_id = app.globalData.loginState
    if (user_id != '') {
      var state = options.state,
        shareUser = options.user_id,
        id = options.id;
      console.log(state)
      if (options.state || shareUser) {
        this.setData({
          state: state,
          shareUser: shareUser
        })
        if (state && shareUser) {
          util.request(api, { state: state, shareUser: shareUser }, "POST").then(res => { })
        } else if (shareUser) {
          util.request(api, { shareUser: shareUser, id: id }, "POST").then(res => { })
        }
      }
      this.nowTime()
    } else {
      util.showModal('请先去登录!', true, '确定').then(res => {
        if (res) {
          wx.switchTab({
            url: '/pages/user/user'
          })
        }
      }).catch(err => {
        if (err == false) {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
  },
  nowTime() { //时间
    var that = this,
      intDiff = this.data.list.dateTime,
      day = 0,
      hour = 0,
      minute = 0,
      second = 0,
      timer = setInterval(function () {

        if (intDiff > 0) { //转换时间
          day = Math.floor(intDiff / (60 * 60 * 24));
          hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
          minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
          second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
          if (hour <= 9) hour = '0' + hour;
          if (minute <= 9) minute = '0' + minute;
          if (second <= 9) second = '0' + second;
          intDiff--;
          var str = hour + ':' + minute + ':' + second
          // console.log(str)    
        } else {
          var str = "已结束！";
          clearInterval(timer);
        }
        that.setData({
          time: str
        })
      }, 1000)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    console.log(options)

    var userName = app.globalData.userInfo.username,
      state = this.data.state,
      user_id = app.globalData.loginState,
      id = options.target.dataset.id;

    if (options.from == 'button') {
      if (state == 1) {
        return {
          title: userName + '推荐，数量有限，先到先得',
          desc: '',
          path: '/pages/productDetails/productDetails?state=' + state + '&user_id=' + user_id,
          success: function (res) {
            console.log(res)
          }
        }
      } else {
        return {
          title: userName + '推荐，数量有限，先到先得',
          desc: '',
          path: '/pages/productDetails/productDetails?user_id=' + user_id + '&id=' + id,
          success: function (res) {
            console.log(res)
          }
        }
      }
    }

  },
  //图片预览
  previewImage(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index,
      index1 = e.currentTarget.dataset.index1,
      urls = this.data.list.evaluate[index].img,
      current = this.data.list.evaluate[index].img[index1];
    wx.previewImage({
      current: current,
      urls: urls,
    })
  },
  previewImage1(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: this.data.list.details[index],
      urls: this.data.list.details
    })
  },
  //分享
  share() {
    if (app.globalData.loginState) {
      this.setData({
        popup: true
      })
    } else {
      this.user()
    }
  },
  user() {
    util.showModal('请先去登录，再分享!', true, '确定').then(res => {
      if (res) {
        wx.switchTab({
          url: '/pages/user/user'
        })
      }
    }).catch(err => { })
  },
  popupHidden() {
    this.setData({
      popup: false
    })
  },
  popupShow() {
    this.setData({
      popup: true
    })
  },
  //立即开团或立即购买
  submit(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id,
      state = e.currentTarget.dataset.state,
      shareUser = e.currentTarget.dataset.shareuser,
      that = this;
    if (app.globalData.loginState) {
      wx.navigateTo({
        url: '/pages/order/order?id=' + id + '&state=' + state + '&shareUser=' + shareUser,
      })
    } else {
      this.user()
    }
  }
})