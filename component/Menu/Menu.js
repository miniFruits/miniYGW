// component/Menu/Menu.js
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
    Goto: function(e) {
      wx.reLaunch({
        url: '/pages/' + e.currentTarget.dataset.to
      })
    }
  }
})