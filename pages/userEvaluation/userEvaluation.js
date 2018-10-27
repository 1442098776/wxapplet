const api = require('../../config/api.js');
const util = require('../../utils/util.js');
Page({
  data: {
    height:'',
    indexGrade:0,
    flag: true, //滚到底部开启
    page: 1, //页数
    id:0,
    list: {
      title: [
        { id: 0, text: '全部评价' },
        { id: 1, text: '好评' },
        { id: 2, text: '中评' },
        { id: 3, text: '差评' }
      ],
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
    }
  },
  onLoad: function (options) {
    var that = this,
    id=options.id;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight
        })
      }
    })
    this.setData({
      id:id
    })
    this.requestDate()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
  //点击头部类别
  grade(e) {
    let index = e.currentTarget.dataset.index,
      id= e.currentTarget.dataset.id,
      that = this;
    this.setData({
      indexGrade: index,
      id: id
    })
    util.request(api, {
      id: id
    }, "POST").then(res => {
      that.data.list.evaluate=res
      that.setData({
        list: that.data.list
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
      id: this.data.id
    }, "GET").then(res => {
      if (res.length < 20) {
        f = false
      } else {
        f = true
      }
      var list = that.data.list.evaluate.concat(res)
      var page = ++this.data.page
      that.setData({
        list: list,
        page: page,
        flag: f
      })
    })
  },
})