// component/Head/Head.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '',
      observer: function(newVal) {
        this.setData({
          Title: newVal
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: 'none',
    Title: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    Tab: function() {
      this.setData({
        show: 'block',
      })
    },
    hide: function() {
      this.setData({
        show: 'none',
      })
    },
    Back: function() {
      wx.reLaunch({
        url: '/pages/home/home'
      })
    }
  }
})