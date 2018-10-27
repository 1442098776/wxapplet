const util=require('../../utils/util.js');
const api=require('../../config/api.js');
const app = getApp()

Page({
  data: {
    hidden:true,
    addressList: [{
      id: 0,
      name: '黄展强', //联系人
      tel: '15638176238', //联系号码
      Province: ['广东省','肇庆市','鼎湖区'],
      address: '今日电器工业园', //地址
      setAddress: true
    },
    {
      id: 1,
      name: '王林', //联系人
      tel: '15638176238', //联系号码
      Province: ['湖南省', '长沙市', '天心区'],
      address: '今日电器工业园', //地址
      setAddress: false
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.loginState == '') {
      app.loginModal()
    }
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
  //是否设为默认
  setAddress(e) {
    let index = e.currentTarget.dataset.index,
      i = 0;
    for (i = 0; i < this.data.addressList.length; i++) {
      if (i == index) {
        this.data.addressList[index].setAddress = true
      } else {
        this.data.addressList[i].setAddress = false
      }
    }
    this.setData({
      addressList: this.data.addressList
    })
  },
  //删除
  remove(e) {
    var index = e.currentTarget.dataset.index,
        id=e.currentTarget.dataset.id,
      arr = this.data.addressList,
      that = this;
    wx.showModal({
      content: '您确定要删除所选的地址吗？',
      success: function (res) {
        if (res.confirm) {
          util.request(api,{id:id},"POST").then(msg=>{
            arr.splice(index, 1)
          })
        }
        that.setData({
          addressList: that.data.addressList
        })
      }
    })
  },
  //添加地址
  Address(){
    this.setData({
      hidden:false
    })
  },
  //使用微地址api接口添加
  addAddress1(){
    let that=this;
    wx.chooseAddress({
      success:function(res){
        console.log(res)
        util.request(api, { res: res, setAddress:false},"POST").then(res=>{

        })
        that.Data()
      },
      fail:function(err){
        console.log(err)
        that.Data()
      }
    })
  },
  //手动添加地址
  addAddress2(e){
    wx.navigateTo({
      url: '/pages/addAddress/addAddress',
    })
    this.Data()
  },
  //取消
  cancel(){
    this.Data()
  },
  Data(){
    this.setData({
      hidden: true
    })
  }
})