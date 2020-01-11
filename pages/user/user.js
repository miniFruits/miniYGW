Component({

  data: {
    Opacity: 0,
    iconOpac: 1,
    iconColor: '#fff',
  },

  methods: {
    scroll(e) {
      // console.log(e.detail.scrollTop)
      if (e.detail.scrollTop <= 99) {
        this.setData({
          Opacity: ((e.detail.scrollTop / 99) >= 1) ? 1 : (e.detail.scrollTop / 99),
          iconOpac: ((e.detail.scrollTop / 99) >= 1) ? 1 : (e.detail.scrollTop / 99),
          iconColor: '#000',
        })
      } else if (e.detail.scrollTop == 0) {
        this.setData({
          Opacity: 0,
          iconOpac: 1,
          iconColor: '#fff',
        })
      }
    },

    handleTap: function() {
      console.log(0)
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  }

})