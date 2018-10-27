//index.js
//获取应用实例
const util=require('../../utils/util.js');
const api=require('../../config/api.js');
const app = getApp()

Page({
  data: {
    api:'',
    indicatorDots: true,
    autoplay:true,
    interval: 5000,
    duration: 1000,
    img:'/static/images/bg.png',
    sort: [
      { id: 1,path:'/pages/groupList/groupList', url: '/static/images/group.png', text: '拼团' },
      { id: 2,path:'/pages/sort/sort', url: '/static/images/hot.png', text: '爆款' },
      { id: 3,path:'/pages/bale/bale', url: '/static/images/debris.png', text: '碎片' },
      { id: 4,path:'/pages/lottery/lottery', url: '/static/images/lottery.png', text: '抽奖' }
    ],
    count:{
      "errno": 0,
      imgUrls: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ],
      
    list:[
      { id: 1, url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: 'VAV-006玖瑰金', price: '100.0', price1: '120.6' },
      { id: 2, url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: 'VAV-006玖瑰金', price: '100.0', price1: '120.6' },
      { id: 3, url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: 'VAV-006玖瑰金', price: '100.0', price1: '120.6' },
      { id: 4, url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: 'VAV-006玖瑰金', price: '100.0', price1: '120.6' },
      { id: 5, url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: 'VAV-006玖瑰金', price: '100.0', price1: '120.6' },
      { id: 6, url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: 'VAV-006玖瑰金', price: '100.0', price1: '120.6' },
      { id: 7, url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: 'VAV-006玖瑰金', price: '100.0', price1: '120.6' }
    ],
    activity: {id:0, url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'},
    goods: [
      { id: 1, url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: 'VAV-006玫瑰金卷发器', price: '120.0', debris: '60',count:'2400'},
      { id: 2, url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: 'VAV-006玫瑰金卷发器', price: '120.0', debris: '60', count: '2400' },
      { id: 3, url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: 'VAV-006玫瑰金卷发器', price: '120.0', debris: '60', count: '2400' },
      { id: 4, url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: 'VAV-006玫瑰金卷发器', price: '120.0', debris: '60', count: '2400' },
      { id: 5, url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: 'VAV-006玫瑰金卷发器', price: '120.0', debris: '60', count: '2400' },
      { id: 6, url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: 'VAV-006玫瑰金卷发器', price: '120.0', debris: '60', count: '2400' },
      { id: 7, url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: 'VAV-006玫瑰金卷发器', price: '120.0', debris: '60', count: '2400' },
      { id: 8, url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: 'VAV-006玫瑰金卷发器', price: '120.0', debris: '60', count: '2400' }
    ]
    }
  },
  onLoad: function () {
    // this.setData({
    //   api: api.NewApiImgUrl
    // })
    console.log(this.data.api)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    }
    util.showNavigation(1000,'正在加载')
    util.request(api.index,{},"GET").then(res=>{
      console.log(res)
      // this.setData({
      //   count:res
      // })
    })
  }
})
