/**
 * 用户相关服务
 */

const util=require('../utils/util.js');
const api=require('../config/api.js');

 /**
  * 调用微信登录
  */
function loginByWeixin(){
     var code =null;
    return new Promise(function(resolve,reject){
        return util.login().then((res)=>{
          code =res.code;
          return util.getUserInfo();
        }).then((userInfo)=>{
          util.request(api.login, { code: code,rawData:userInfo.rawData,signature:userInfo.signature,iv:userInfo.iv,encryptedData:userInfo.encryptedData},'POST').then(res =>{
            console.log(res)
                if(res.errno==0){
                    let userInfo=res.data;
                    //存储用户信息
                    wx.setStorageSync('userInfo',userInfo);
                  wx.setStorageSync('loginState', res.data.user_id)
                    resolve(res);
                }else{
                    reject(res);
                }
            }).catch((err)=>{
                reject(err);
            });
        }).catch((err)=>{
            reject(err);
        })
    });
}


 /**
  * 判断用户是否登录
  */
function checkLogin(){
    return new Promise(function(resolve,reject){
      if (wx.getStorageSync('userInfo') && wx.getStorageSync('loginState')){
            util.checkSession().then(()=>{
                resolve(true);
            }).catch(()=>{
                reject(false);
            })
        }else{
            reject(false);
        }
    })
}
module.exports={
    loginByWeixin,
    checkLogin
}
