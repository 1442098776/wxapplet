const api = require('../../config/api.js');
const util = require('../../utils/util.js');
const app = getApp();
Page({
  data: {
    list:{
      goods:[
        { id: 0, img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: 'VAV-808', orderNumber: 23468028640},
        { id: 1, img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: 'VAV-909', orderNumber: 23468028640 },
        { id: 1, img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', name: 'VAV-909', orderNumber: 23468028640 }
      ],
      message:[
        {address:'本人已签收',time:'18:36:24'},
        { address: '派送中，公明上村派件员，王小明正在派件', time: '18:36:24' },
        { address: '到达深圳光明新区，光明第二仓库', time: '17:36:24' },
        { address: '深圳南山运转中心，运往光明新区', time: '15:36:24' }
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let orderNumber=options.orderNumber;
    util.request(api, { orderNumber: orderNumber, user_id: app.globalData.loginState}).then(res=>{
      console.log(res)
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})