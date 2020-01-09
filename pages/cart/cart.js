// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     mask:"none",
     title:"购物车"
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
    wx.hideTabBar()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  },
  // 去逛逛
  handlepage(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  handleclassify() {
    wx.switchTab({
      url: '/pages/classify/classify',
    })
  },
  handlezhai() {
    wx.navigateTo({
      url: '/pages/homedelivery/homedelivery',
    })
  },
  handleprofile() {
    console.log(1)
    wx.switchTab({
      url: "/pages/user/user",
    })
  },
  handleshow(){
    this.setData({
      mask:"block",
    })
  },
  handlenone(){
    this.setData({
      mask: "none",
    })
  },

})