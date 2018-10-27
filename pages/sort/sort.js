const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({
  data: {
    sortIndex: 0,
    h: '',
    id: '',
    content: {
      cates: [{
          id: 1,
          name: '爆款'
        },
        {
          id: 2,
          name: '直发器'
        },
        {
          id: 3,
          name: '卷发器'
        },
        {
          id: 4,
          name: '吹风机'
        },
        {
          id: 5,
          name: '美容仪器'
        }
      ],
      goods: [{
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        data: [{
            id: 1,
            url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            name: 'VAV-006玖瑰金卷发器',
            price: '120.0',
            debris: '60',
            count: '2400'
          },
          {
            id: 2,
            url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            name: 'VAV-006玖瑰金卷发器',
            price: '120.0',
            debris: '60',
            count: '2400'
          },
          {
            id: 3,
            url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            name: 'VAV-006玖瑰金卷发器',
            price: '120.0',
            debris: '60',
            count: '2400'
          },
          {
            id: 4,
            url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            name: 'VAV-006玖瑰金卷发器',
            price: '120.0',
            debris: '60',
            count: '2400'
          },
          {
            id: 5,
            url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            name: 'VAV-006玖瑰金卷发器',
            price: '120.0',
            debris: '60',
            count: '2400'
          },
          {
            id: 6,
            url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            name: 'VAV-006玖瑰金卷发器',
            price: '120.0',
            debris: '60',
            count: '2400'
          }
        ]
      }]
    }
  },
  onLoad: function(options) {
    util.showNavigation(1000, '正在加载')
    var that = this;
    util.request(api.sort,{}, "GET").then(res => {
      // that.setData({
      //   content: res
      // })
      console.log(res)
    }).catch(err=>{})
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  scroll(e) {
    console.log(e)
    this.setData({
      id: e.currentTarget.dataset.id,
      sortIndex: e.currentTarget.dataset.index
    })
    let id = e.currentTarget.dataset.id;
    // util.request(api.cate, {
    //   id: id
    // }, "POST").then(res => {
    //   console.log(res)
    //   this.setData({
    //     list: res.data
    //   })
    // }).catch(err=>{})
  }
})