//index.js
const app = getApp(); // 获取到小程序全局唯一的app实例
const fetch = require("../../utils/request/request"); // 引入封装的请求API
const asyncfc = require("../../utils/async/async"); // 引入异步同步请求封装，https://github.com/caolan/async
const notification = require("../../utils/notification/notification"); // 引入通知广播，https://github.com/icindy/WxNotificationCenter
const toast = require("../../utils/requesttoast/requesttoast"); // 引入现实消息提示

Page({
  data: {
    motto: '网易云音乐',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    diaogshow: false,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 网易云音乐文字按钮
  tabclick(event) {
    this.setData({
      diaogshow: true,
    });
    console.log('网易云音乐文字按钮', event);
  },
  // dialog组件按钮点击事件
  tabclicks(item) {
    this.setData({
      diaogshow: false,
    });
    console.log('dialog组件按钮点击事件', item);
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
