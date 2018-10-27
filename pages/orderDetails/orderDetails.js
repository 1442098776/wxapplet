const api = require('../../config/api.js');
const util = require('../../utils/util.js');
const app = getApp()
Page({
  data: {
    state:1,
    list:{
      time:'12:24',
      orderNumber:2022222222,
      orderTime:'2020-06-08 16:24:36',      //下单时间
      paymentTime:'2020-06-08 16:24:36',    //付款时间
      shipmentsTime:'2020-06-08 16:24:00',  //发货时间  
      logistics:{
        address:'快件已从天津中转部出发，准备发往上海线',
        time:'2020-06-08 16:24:36'
      },
      address:{
        name:'王林',
        tel:15638176238,
        address:'广东省深圳市光明新区公明镇李松蓢社区深圳今日电器有限公司'
      },
      goods:[
        {
          id: 0,
          img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          name: 'VAV-808',
          price: 120,
          describe: '迷你小巧、便携式、刘海内扣、不伤发',
          num: 2,
          debris: 5,                                  //碎片抵扣
          ticket: 10,                                 //优惠券
          freight: 0                                  //运费 
        },
      ],
      total:228.8                                      //实付总价
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },
})