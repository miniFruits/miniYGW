//app.js
App({
  onLaunch:function () {
    // 展示本地存储能力
    wx.setTabBarStyle({
      selectedColor: "#fc0909",
      color: '#000',
      borderStyle: 'white'
    })
    wx.setTabBarBadge({
      index: 3,
      text: '0'
    })
  }
})