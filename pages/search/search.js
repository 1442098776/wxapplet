const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({
  data: {
    value:'卷发棒',
    list:[
      {id:1,text:'VAV-002B自动卷发棒'},
      { id: 2, text: 'VAV-002B自动卷发棒' },
      { id: 3, text: 'VAV-002B自动卷发棒' },
      { id: 4, text: 'VAV-002B自动卷发棒' },
      { id: 5, text: 'VAV-002B自动卷发棒' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  search(e){
    console.log(e)
    let value=e.detail.value
    this.setData({
      value:value
    })
    util.request(api,{value:value},"POST").then(res=>{
      
    })
  },
  //清空
  clear(){
    this.setData({
      value:''
    })
  }
})