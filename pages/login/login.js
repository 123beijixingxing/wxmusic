// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remind: '加载中',
    loginshow: false,
    loginInfo: {
      title: '微信授权',
      content: '获得您的公开信息(昵称、头像等)',
      logName: '草莓冰淇淋',
      logImage: '../../images/user/user.jpg',
    },
    buttonsinfo: [{text: '取消'}, {text: '确认'}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loginshow: true,
    })
    console.log('生命周期函数--监听页面加载', 1);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('生命周期函数--监听页面初次渲染完成', 2);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('生命周期函数--监听页面显示', 3);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('生命周期函数--监听页面隐藏', 4);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('生命周期函数--监听页面卸载', 5);
  },
  /**
   * 授权弹窗确认取消按钮事件
   */
  logcancom(e) {
    if (e.detail.index !== 0) {
      this.setData({
        loginshow: false,
      });
      wx.switchTab({
        url: '../me/index'
      });
    } else {
      this.setData({
        loginshow: false,
      });
      wx.switchTab({
        url: '../home/home'
      });
    }
    console.log('授权弹窗确认取消按钮事件', e);
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})