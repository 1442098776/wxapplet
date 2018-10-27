const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const app = getApp()

Page({
  data: {
    value:'',
    popup:false,
    show:true,
    success:false,
    list:{
      price:120.0,
      price1:240.0,
      price2:120.0,
      price3:50
    }
  },
  onLoad: function (options) {
    if(app.globalData.loginState!=''){
      util.request(api,{user_id:app.globalData.loginState},"POST").then(res=>{
        console.log(res)
      })
    }else{
      util.showModal('请先登录!',true,'确定').then(res=>{
        if(res){
          wx.switchTab({
            url: '/pages/user/user',
          })
        }
      }).catch(err=>{
        if(err==false){
          wx.navigateBack({
            delta:1
          })
        }
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //输入金额
  inputValue(e){
    
    let value = e.detail.value;
    this.setData({
      value:value
    })
  },
  //我要提现
  Withdraw(){
    this.setData({
      popup:true,
      show:true
    })
  },
  //确认提现
  submit(){
    var value = this.data.value;
    if(value==''){
      wx.showToast({
        title: '请输入提现金额!',
        icon:'none',
        duration:1000,
        mask:true
      })
    }else{
      if(value<=this.data.list.price){
        console.log('bbbb')
        util.request(api, { value: this.data.value, user_id: app.globalData.loginState},"POST").then(res=>{
          this.setTimeOut()
          this.setData({
            show: false,
            success: true
          })
        })
      }else{
        this.setData({
          show:false,
          success:false
        })
        this.setTimeOut()
      }
    }
  },
  setTimeOut(){
    var that=this;
    setTimeout(function () {
      that.setData({
        popup: false,
        show: true,
        success: false,
        value:''
      })
    }, 1000)
  }
})