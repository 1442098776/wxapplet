const api = require('../../config/api.js');
const util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {
    circleList: [],//圆点数组  
    awardList: [],//奖品数组  
    colorCircleFirst: '#FEDF2B',//圆点颜色1  
    colorCircleSecond: '#F57069',//圆点颜色2  
    colorAwardDefault: '#F5F0FC',//奖品默认颜色  
    colorAwardSelect: '#ffe400',//奖品选中颜色  
    indexSelect:0,//被选中的奖品index  
    isRunning: false,//是否正在抽奖  
    list:{
      lottery: ['1元', '2元', '3元', '4元', '5元', '6元', '7元', '8元'],    //中奖的文字数组
      imageAward: [
        '../../images/1.jpg',
        '../../images/2.jpg',
        '../../images/3.jpg',
        '../../images/4.jpg',
        '../../images/5.jpg',
        '../../images/6.jpg',
        '../../images/7.jpg',
        '../../images/8.jpg',
      ],//奖品图片数组  
      bgImg: 'http://img.51miz.com/Element/00/71/51/36/b3701b66_E715136_d061ccd3.jpg!/quality/90/unsharp/true/compress/true/format/jpg/fh/630',
      integral: 240,
      integral1:20    //消耗的积分
    }
  },

  onLoad: function () {
    if(app.globalData.loginState){
      util.showNavigation(2000,'')
    }else{
      util.showModal('请先去登录',true,'确定').then(res=>{
        if(res){
          wx.switchTab({
            url: '/pages/user/user'
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
    var _this = this;
    //圆点设置  
    var leftCircle = 7.5;
    var topCircle = 7.5;
    var circleList = [];
    for (var i = 0; i < 24; i++) {
      if (i == 0) {
        topCircle = 0;
        leftCircle = 0;
      } else if (i < 6) {
        topCircle = 0;
        leftCircle = leftCircle + 90;
      } else if (i == 6) {
        topCircle = 0;
        leftCircle = 540;
      } else if (i < 12) {
        topCircle = topCircle + 90;
        leftCircle = 540;
      } else if (i == 12) {
        topCircle = 540;
        leftCircle = 540;
      } else if (i < 18) {
        topCircle = 540;
        leftCircle = leftCircle - 90;
      } else if (i == 18) {
        topCircle = 540;
        leftCircle = 0;
      } else if (i < 24) {
        topCircle = topCircle - 90;
        leftCircle = 0;
      } else {
        return
      }
      circleList.push({ topCircle: topCircle, leftCircle: leftCircle });
    }
    this.setData({
      circleList: circleList
    })

    //圆点闪烁  
    setInterval(function () {
      if (_this.data.colorCircleFirst == '#FEDF2B') {
        _this.setData({
          colorCircleFirst: '#F57069',
          colorCircleSecond: '#FEDF2B',
        })
      } else {
        _this.setData({
          colorCircleFirst: '#FEDF2B',
          colorCircleSecond: '#F57069',
        })
      }
    }, 500)//设置圆点闪烁的效果  

    //奖品item设置  
    var awardList = [];
    //间距,怎么顺眼怎么设置吧.  
    var topAward = 25;
    var leftAward = 5;
    for (var j = 0; j < 8; j++) {
      if (j == 0) {
        topAward = 0;
        leftAward = 5;
      } else if (j < 3) {
        topAward = topAward;
        //166.6666是宽.15是间距.下同  
        leftAward = leftAward + 167 + 5;
      } else if (j < 5) {
        leftAward = leftAward;
        //150是高,15是间距,下同  
        topAward = topAward + 150 + 15;
      } else if (j < 7) {
        leftAward = leftAward - 167 - 5;
        topAward = topAward;
      } else if (j < 8) {
        leftAward = leftAward;
        topAward = topAward - 150 - 15;
      }
      var imageAward = this.data.list.imageAward[j];
      awardList.push({ topAward: topAward, leftAward: leftAward, imageAward: imageAward });
    }
    this.setData({
      awardList: awardList
    })
  },

  //开始抽奖  
  startGame: function () {
    if (this.data.isRunning) return
    this.setData({
      isRunning: true
    })
    var _this = this;
    var indexSelect = 0
    var i = 0;
    var num=0;    //请求回来的中奖奖品的下标
    util.request(api,{user_id:app.globalData.loginState},"POST").then(res=>{
      num=res
    })
    var timer = setInterval(function () {
      indexSelect++;
      //这里我只是简单粗暴用y=30*x+200函数做的处理.可根据自己的需求改变转盘速度  
      i += 30;
      // indexSelect = indexSelect % 8;
      if (indexSelect >= _this.data.list.imageAward.length){
        indexSelect=0
      }
      _this.setData({
        indexSelect: indexSelect
      })
      if (i >1000) {
        //去除循环  
        let indexSelect=num
        _this.setData({
          indexSelect:indexSelect
        })
        clearInterval(timer)
        //获奖提示  
        wx.showModal({
          title: '恭喜您',
          content: '获得了' + _this.data.list.lottery[indexSelect],
          showCancel: false,//去掉取消按钮  
          success: function (res) {
            if (res.confirm) {
              _this.setData({
                isRunning: false
              })
              util.request(api, { lottery: _this.data.list.lottery[indexSelect], user_id: app.globalData.loginState},"POST").then(res=>{
                _this.data.list.integral = _this.data.list.integral - _this.data.list.integral1
                _this.setData({
                  list:_this.data.list
                })
              })
            }
          }
        })
      }
    },80)
  }
})