const api=require('../../config/api.js');
const util=require('../../utils/util.js');
const app = getApp();

Component({
  properties: {
    state:{
      type: Number,
      value:''
    },
    orderNumber:{
      type:String,
      value:''
    },
    index:{
      type:Number,
      value:''
    }
  },
  data: {

  },
  methods: {
    //取消
    cancel(e){
      console.log(e)
      let date=e.currentTarget.dataset,
          that=this;
      util.showModal('你确定要取消所选的订单吗?', true, '确定').then(res => {
        if(res){
          that.triggerEvent('cancel',date)
        }
      }).catch(err =>{
        console.log(err)
      })
    },
    //提醒发货
    shipments(e){
      console.log(e)
      let orderNumber=e.currentTarget.dataset.ordernumber;
       util.request(api, { orderNumber: orderNumber, user_id: app.globalData.loginState}).then(res=>{
         util.showModal('亲，已通知卖家尽快发货请您耐心等待', false, '知道了').then(res => {
          //  console.log(res)
         })
       })
    },
    //确认收货
    affirm(e){
      let orderNumber=e.currentTarget.dataset.ordernumber,
          index=e.currentTarget.dataset.index,
          that=this;
          util.showModal('您确定当前已收到货物了吗?',true,'确定').then(res=>{
            if(res){
              // console.log(res)
              util.request(api, { orderNumber: orderNumber, res: res, user_id: app.globalData.loginState,},"POST").then(msg=>{
              that.triggerEvent('affirm', orderNumber)
              })
            }
          }).catch(err=>{
            console.log(err)
          })      
    },
    //申请退款
    refund(e) {
      console.log(e)
      let orderNumber=e.currentTarget.dataset.ordernumber;
      wx.navigateTo({
        url: '/pages/refund/refund?orderNumber='+orderNumber,
      })
    },
    //申请退货
    salesReturn(e){
      console.log(e)
      let orderNumber = e.currentTarget.dataset.ordernumber,
        text = e.currentTarget.dataset.text;
      wx.navigateTo({
        url: '/pages/salesReturn/salesReturn?orderNumber='+orderNumber+'&text='+text,
      })
    },
    //查看物流
    look(e) {
      console.log(e)
      let orderNumber=e.currentTarget.dataset.ordernumber;
      wx.navigateTo({
        url: '/pages/logistics/logistics?orderNumber='+orderNumber,
      })
    },
    //评价
    evaluate(e){
      console.log(e)
      let orderNumber=e.currentTarget.dataset.ordernumber,
          text=e.currentTarget.dataset.text;
        wx:wx.navigateTo({
          url: '/pages/evaluate/evaluate?orderNumber='+orderNumber+'&text='+text
        })
    }
  } 
})
