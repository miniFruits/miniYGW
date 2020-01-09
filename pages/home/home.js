// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     classify:[],
     swipper:[],
     navTop:[],
     problemList:[],
     activeList:[],
     mouth_img:'',
     cxjList:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showTabBar(),
     wx.request({
       url: 'http://api.egu365.com/goods/classify',
       success:(result)=>{
         console.log(result.data.list)
          this.setData({
            classify: result.data.list
          })
       }
     })
    wx.request({
      url: 'http://api.egu365.com/news/adviseImg?seat=90',
      success: (result) => {
        console.log(result.data.list)
        this.setData({
          swipper: result.data.list
        })
      }
    }),
      wx.request({
      url: 'http://api.egu365.com/news/adviseImg?seat=91',
        success: (result) => {
          console.log(result.data.list)
          this.setData({
            navTop: result.data.list
          })
        }
      })
    wx.request({
      url: 'http://api.egu365.com/news/adviseImg?seat=92',
      success: (result) => {
        console.log(result.data.list)
        this.setData({
          problemList: result.data.list
        })
      }
    }),
      wx.request({
      url: 'http://api.egu365.com/news/adviseImg?seat=93',
        success: (result) => {
          console.log(result.data.list)
          this.setData({
            activeList: result.data.list
          })
        }
      }),
      wx.request({
      url: 'http://api.egu365.com/news/recomImg?seat=122&expiry=true',
        success: (result) => {
          console.log(result.data.list[0])
          this.setData({
            mouth_img: result.data.list[0].img
          })
        }
      }),
      wx.request({
      url: 'http://api.egu365.com/news/adviseAll?id=94&pageSize=4',
        success: (result) => {
          console.log(result.data.obj)
          this.setData({
            cxjList: result.data.obj
          })
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
    // console.log(getCurrentPages())
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
   handleSelect() {
    console.log(4)
  }
})