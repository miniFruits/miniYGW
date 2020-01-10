// component/Sidenav/Sidenav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlepage() {
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
  }
})
