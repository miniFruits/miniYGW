// component/GussetLike.js
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
   list:[],
   pageNo:1,
   pageall:99,
   scrollHeight:2512,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //   该方法绑定了页面滑动到底部的事件
    bindDownLoad: function (options) {
      let that = this;
      wx.startPullDownRefresh({
        success() {
          console.log(that)
          if(that.data.pageNo<that.data.pageall){
          wx.request({
            url: `http://api.egu365.com/goods/list?sorts=hits+asc&pageNo=${that.data.pageNo}`,
            success(res) {
              console.log(res.data.list)
              that.setData({
                pageNo:that.data.pageNo+1,
                list: [
                  ...that.data.list,
                  ...res.data.list
                ]
              })
            },
            fail(){
              wx.showToast({
                title: '没有更多数据',
                icon: 'success',
                duration: 2000
              })
            }
          })
          }
        }
      })
      // 当停止下拉是提示是否加载成功
      wx.stopPullDownRefresh({
        success() {
          wx.showToast({
            title: '数据加载成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail(){
          wx.showToast({
            title: '数据加载失败',
            icon: 'success',
            duration: 2000
          })
        }
      })
    },
    //   该方法绑定了页面滚动时的事件
    scroll: function (event) {
      this.setData({
        scrollTop: event.detail.scrollTop
      });
    },
    handledetails(){
      wx.navigateTo({
        url: '/pages/details/details?tid=' 
      })

    },
    handlecarts(){
      console.log(1)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  attached: function (options){
    let that=this
    wx.request({
      url: `http://api.egu365.com/goods/list?sorts=hits+asc&pageNo=${that.data.pageNo}`,
    success (res) {
      console.log(res.data.list)
      that.setData({
       pageNo:2,
       list: res.data.list
     })
   }
  })
  },
  
})
