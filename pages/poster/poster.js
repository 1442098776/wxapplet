const api = require('../../config/api.js');
const util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {
    windowWidth: '',
    scrollLeft: '',
    canvasIndex: 1,
    canvas: [
      { canvasId: 'myCanvas', id: 'canvas' },
      { canvasId: 'myCanvas1', id: 'canvas1' },
      { canvasId: 'myCanvas2', id: 'canvas2' }
    ],
    list: [
      { url: 'https://img.adidas.com.cn/resources/2018/9/17/15371544824757995_500X500.jpg', goods: 'https://cdnapisec.kaltura.com/p/783072/thumbnail/quality/75/entry_id/1_ohsstd01/width/1536', code: 'http://www.liantu.com/images/2013/liantu.png', name: 'VAV-022B懒人直发器', price: '120.0', price1: '158.0', text: '年轻', text1: '我的选择', text2: 'Young , I choose', title: '唯戈商城' },
      { url: 'https://img.adidas.com.cn/resources/2018/9/17/15371544824757995_500X500.jpg', goods: 'https://cdnapisec.kaltura.com/p/783072/thumbnail/quality/75/entry_id/1_ohsstd01/width/1536', code: 'http://www.liantu.com/images/2013/liantu.png', name: 'VAV-022B懒人直发器', price: '120.0', price1: '158.0', text: '年轻', text1: '我的选择', text2: 'Young , I choose', title: '唯戈商城' },
      { url: 'https://img.adidas.com.cn/resources/2018/9/17/15371544824757995_500X500.jpg', goods: 'https://cdnapisec.kaltura.com/p/783072/thumbnail/quality/75/entry_id/1_ohsstd01/width/1536', code: 'http://www.liantu.com/images/2013/liantu.png', name: 'VAV-022B懒人直发器', price: '120.0', price1: '158.0', text: '年轻', text1: '我的选择', text2: 'Young , I choose', title: '唯戈商城' }
    ]
  },
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (e) {
        // console.log(e)
        that.setData({
          windowWidth: e.windowWidth,
          scrollLeft: e.windowWidth * 0.45
        })
      }
    })
    var cardInfo = this.data.list[1],
      cardInfo1 = this.data.list[0],
      cardInfo2 = this.data.list[2];

    this.getAvaterInfo(cardInfo)
    this.getAvaterInfo1(cardInfo1)
    this.getAvaterInfo2(cardInfo2)
  },
  showLoadin() {
    wx.showLoading({
      title: '生成中.....',
      mask: true,
    })
  },
  //海报1
  getAvaterInfo(cardInfo) {
    this.showLoadin()
    util.getImgInfo(cardInfo.url).then(res => {
      // console.log(res)
      let bgSrc = res.path;
      this.getGoods(bgSrc, cardInfo)
    })
  },
  getGoods(bgSrc, cardInfo) {
    this.showLoadin()
    util.getImgInfo(cardInfo.goods).then(res => {
      // console.log(res)
      let goodsSrc = res.path
      this.getCode(bgSrc, cardInfo, goodsSrc)
    })
  },
  getCode(bgSrc, cardInfo, goodsSrc) {
    this.showLoadin()
    util.getImgInfo(cardInfo.code).then(res => {
      // console.log(res)
      let codeSrc = res.path
      this.sharePosteCanvas(bgSrc, cardInfo, goodsSrc, codeSrc)
    })
  },
  sharePosteCanvas(bgSrc, cardInfo, goodsSrc, codeSrc) {
    this.showLoadin()
    var that = this;
    const ctx = wx.createCanvasContext('myCanvas1');
    wx.createSelectorQuery().select('#canvas1').boundingClientRect(function (rect) {
      console.log(rect)
      var width = rect.width,
        height = rect.height,
        left = rect.left,
        right = rect.right;
      ctx.setFillStyle('#fff')
      ctx.fillRect(0, 0, width, height);
      if (bgSrc) {
        ctx.drawImage(bgSrc, 0, 0, width, height);
      }
      if (goodsSrc) {
        ctx.drawImage(goodsSrc, 22, 45, width * 0.8, height * 0.38)
      }
      if (cardInfo.name) {
        ctx.setFontSize(12);
        ctx.setFillStyle('#333333');
        ctx.setTextAlign('center');
        ctx.fillText(cardInfo.name, width / 2, height * 0.42 + 45);
      }
      if (cardInfo.price) {
        ctx.setFontSize(15);
        ctx.setFillStyle('#FE4543');
        ctx.setTextAlign('center');
        ctx.fillText('￥' + cardInfo.price, width * 0.38, height * 0.45 + 55);
      }
      if (cardInfo.price1) {
        ctx.setFontSize(12);
        ctx.setFillStyle('#666666');
        ctx.setTextAlign('center');
        ctx.fillText('￥' + cardInfo.price1, width * 0.62, height * 0.45 + 55);
        ctx.setStrokeStyle('#666666')
        ctx.strokeRect(width * 0.55, height * 0.44 + 55, 40, 0.2);
      }
      if (cardInfo.text) {
        ctx.setFontSize(12);
        ctx.setFillStyle('#666666');
        ctx.setTextAlign('left');
        ctx.fillText(cardInfo.text, 34, height * 0.75);
      }
      if (cardInfo.text1) {
        ctx.setFontSize(12);
        ctx.setFillStyle('#666666');
        ctx.setTextAlign('left');
        ctx.fillText(cardInfo.text1, 34, height * 0.75 + 20);
        ctx.setStrokeStyle('#666666')
        ctx.strokeRect(34, height * 0.75 + 30, 17, 0.5);
      }
      if (cardInfo.text2) {
        ctx.setFontSize(9);
        ctx.setFillStyle('#666666');
        ctx.setTextAlign('left');
        ctx.fillText(cardInfo.text2, 34, height * 0.75 + 50);
      }
      if (cardInfo.title) {
        ctx.setFontSize(8);
        ctx.setFillStyle('#999999');
        ctx.setTextAlign('center');
        ctx.fillText(cardInfo.title, width / 2, height * 0.97);
      }
      if (codeSrc) {
        ctx.drawImage(codeSrc, width * 0.65, height * 0.73, 60, 60);
      }
    }).exec()
    setTimeout(function () {
      ctx.draw(); //这里有个需要注意就是，这个方法是在绘制完成之后在调用，不然容易其它被覆盖。
      wx.hideLoading();
    }, 1000)
  },
  //海报2
  getAvaterInfo1(cardInfo1) {
    this.showLoadin()
    util.getImgInfo(cardInfo1.url).then(res => {
      // console.log(res)
      let bgSrc = res.path;
      this.getGoods1(bgSrc, cardInfo1)
    })
  },
  getGoods1(bgSrc, cardInfo1) {
    this.showLoadin()
    util.getImgInfo(cardInfo1.goods).then(res => {
      // console.log(res)
      let goodsSrc = res.path
      this.getCode1(bgSrc, cardInfo1, goodsSrc)
    })
  },
  getCode1(bgSrc, cardInfo1, goodsSrc) {
    this.showLoadin()
    util.getImgInfo(cardInfo1.code).then(res => {
      // console.log(res)
      let codeSrc = res.path
      this.sharePosteCanvas1(bgSrc, cardInfo1, goodsSrc, codeSrc)
    })
  },
  sharePosteCanvas1(bgSrc, cardInfo1, goodsSrc, codeSrc) {
    this.showLoadin()
    var that = this;
    const ctx = wx.createCanvasContext('myCanvas');
    wx.createSelectorQuery().select('#canvas').boundingClientRect(function (rect) {
      console.log(rect)
      var width = rect.width,
        height = rect.height,
        left = rect.left,
        right = rect.right;
      ctx.setFillStyle('#fff')
      ctx.fillRect(0, 0, width, height);
      if (bgSrc) {
        ctx.drawImage(bgSrc, 0, 0, width, height);
      }
      if (goodsSrc) {
        ctx.drawImage(goodsSrc, 22, 45, width * 0.8, height * 0.38)
      }
      if (cardInfo1.name) {
        ctx.setFontSize(12);
        ctx.setFillStyle('#333333');
        ctx.setTextAlign('center');
        ctx.fillText(cardInfo1.name, width / 2, height * 0.42 + 45);
      }
      if (cardInfo1.price) {
        ctx.setFontSize(15);
        ctx.setFillStyle('#FE4543');
        ctx.setTextAlign('center');
        ctx.fillText('￥' + cardInfo1.price, width * 0.38, height * 0.45 + 55);
      }
      if (cardInfo1.price1) {
        ctx.setFontSize(12);
        ctx.setFillStyle('#666666');
        ctx.setTextAlign('center');
        ctx.fillText('￥' + cardInfo1.price1, width * 0.62, height * 0.45 + 55);
        ctx.setStrokeStyle('#666666')
        ctx.strokeRect(width * 0.55, height * 0.44 + 55, 40, 0.2);
      }
      if (cardInfo1.text) {
        ctx.setFontSize(12);
        ctx.setFillStyle('#fff');
        ctx.setTextAlign('left');
        ctx.fillText(cardInfo1.text, width * 0.54, height * 0.7);
      }
      if (cardInfo1.text1) {
        ctx.setFontSize(12);
        ctx.setFillStyle('#fff');
        ctx.setTextAlign('left');
        ctx.fillText(cardInfo1.text1, width * 0.54, height * 0.7 + 20);
        ctx.setStrokeStyle('#fff')
        ctx.strokeRect(width * 0.54, height * 0.7 + 30, 17, 0.5);
      }
      if (cardInfo1.text2) {
        ctx.setFontSize(9);
        ctx.setFillStyle('#fff');
        ctx.setTextAlign('left');
        ctx.fillText(cardInfo1.text2, width*0.54, height * 0.7 + 50);
      }
      if (cardInfo1.title) {
        ctx.setFontSize(8);
        ctx.setFillStyle('#999999');
        ctx.setTextAlign('center');
        ctx.fillText(cardInfo1.title, width*0.85, height * 0.97);
      }
      if (codeSrc) {
        ctx.drawImage(codeSrc, width * 0.17, height * 0.67, 60, 60);
      }
    }).exec()
    setTimeout(function () {
      ctx.draw(); //这里有个需要注意就是，这个方法是在绘制完成之后在调用，不然容易其它被覆盖。
      wx.hideLoading();
    }, 1000)
  },

  //海报3
  getAvaterInfo2(cardInfo2) {
    this.showLoadin()
    util.getImgInfo(cardInfo2.url).then(res => {
      // console.log(res)
      let bgSrc = res.path;
      this.getGoods2(bgSrc, cardInfo2)
    })
  },
  getGoods2(bgSrc, cardInfo2) {
    this.showLoadin()
    util.getImgInfo(cardInfo2.goods).then(res => {
      // console.log(res)
      let goodsSrc = res.path
      this.getCode2(bgSrc, cardInfo2, goodsSrc)
    })
  },
  getCode2(bgSrc, cardInfo2, goodsSrc) {
    this.showLoadin()
    util.getImgInfo(cardInfo2.code).then(res => {
      // console.log(res)
      let codeSrc = res.path
      this.sharePosteCanvas2(bgSrc, cardInfo2, goodsSrc, codeSrc)
    })
  },
  sharePosteCanvas2(bgSrc, cardInfo2, goodsSrc, codeSrc) {
    this.showLoadin()
    var that = this;
    const ctx = wx.createCanvasContext('myCanvas2');
    wx.createSelectorQuery().select('#canvas2').boundingClientRect(function (rect) {
      console.log(rect)
      var width = rect.width,
        height = rect.height,
        left = rect.left,
        right = rect.right;
      ctx.setFillStyle('#fff')
      ctx.fillRect(0, 0, width, height);
      if (bgSrc) {
        ctx.drawImage(bgSrc, 0, 0, width, height);
      }
      if (goodsSrc) {
        ctx.setFillStyle('#fff');
        ctx.rect(width * 0.1 + 5, height * 0.11 + 5, width * 0.74, height * 0.49);
        ctx.fill()
        ctx.drawImage(goodsSrc, 22, 45, width * 0.8, height * 0.38)
        ctx.setStrokeStyle('#fff')
        ctx.strokeRect(width * 0.1, height * 0.11 , width * 0.8, height*0.52);
      }
      if (cardInfo2.name) {
        ctx.setFontSize(12);
        ctx.setFillStyle('#333333');
        ctx.setTextAlign('center');
        ctx.fillText(cardInfo2.name, width / 2, height * 0.42 + 45);
      }
      if (cardInfo2.price) {
        ctx.setFontSize(15);
        ctx.setFillStyle('#FE4543');
        ctx.setTextAlign('center');
        ctx.fillText('￥' + cardInfo2.price, width * 0.38, height * 0.45 + 55);
      }
      if (cardInfo2.price1) {
        ctx.setFontSize(12);
        ctx.setFillStyle('#666666');
        ctx.setTextAlign('center');
        ctx.fillText('￥' + cardInfo2.price1, width * 0.62, height * 0.45 + 55);
        ctx.setStrokeStyle('#666666')
        ctx.strokeRect(width * 0.55, height * 0.44 + 55, 40, 0.2);
      }
      if (cardInfo2.text) {
        ctx.setFontSize(12);
        ctx.setFillStyle('#fff');
        ctx.setTextAlign('left');
        ctx.fillText(cardInfo2.text, width * 0.54, height * 0.78);
      }
      if (cardInfo2.text1) {
        ctx.setFontSize(12);
        ctx.setFillStyle('#fff');
        ctx.setTextAlign('left');
        ctx.fillText(cardInfo2.text1, width * 0.54, height * 0.78 + 20);
        ctx.setStrokeStyle('#fff')
        ctx.strokeRect(width * 0.54, height * 0.78 + 30, 17, 0.5);
      }
      if (cardInfo2.text2) {
        ctx.setFontSize(9);
        ctx.setFillStyle('#fff');
        ctx.setTextAlign('left');
        ctx.fillText(cardInfo2.text2, width * 0.54, height * 0.78 + 50);
      }
      if (cardInfo2.title) {
        ctx.setFontSize(8);
        ctx.setFillStyle('#999999');
        ctx.setTextAlign('center');
        ctx.fillText(cardInfo2.title, width /2, height * 0.97);
      }
      if (codeSrc) {
        ctx.drawImage(codeSrc, width * 0.17, height * 0.67, 60, 60);
      }
    }).exec()
    setTimeout(function () {
      ctx.draw(); //这里有个需要注意就是，这个方法是在绘制完成之后在调用，不然容易其它被覆盖。
      wx.hideLoading();
    }, 1000)
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //滑动
  scroll(e) {
    let scrollLeft = e.detail.scrollLeft;
    if (scrollLeft >= 0 && scrollLeft < this.data.windowWidth * 0.3) {
      this.setData({
        canvasIndex: 0
      })
    } else if (scrollLeft >= this.data.windowWidth * 0.45 && scrollLeft <= this.data.windowWidth * 0.8) {
      this.setData({
        canvasIndex: 1
      })
    } else if (scrollLeft > this.data.windowWidth * 0.8 && scrollLeft <= this.data.windowWidth) {
      this.setData({
        canvasIndex: 2
      })
    }
  },
  //保存
  submit() {
    var that = this;
    wx.showLoading({
      title: '正在保存',
      mask: true
    })
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: that.data.canvas[that.data.canvasIndex].canvasId,
        success: function (res) {
          wx.hideLoading();
          console.log(res)
          var tempFilePath = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success: function (res1) {
              console.log(res1)
              wx.showToast({
                title: '赶紧晒一下吧~',
                duration: 2000
              })
            },
            fail: function (err1) { }
          })
        },
        fail: function (err) { }
      })
    }, 1000)
  }
})