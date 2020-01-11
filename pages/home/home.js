// pages/home/home.js
Component({

  /**
   * 页面的初始数据
   */
  data: {
     classify:[],
     swipper:[],
     selected:'依谷热卖',
     tid:'',
     fruits:[],
     bjImg:String,
     imgSrcs: Array,
     left:0,
     suoyin:0
     
  },
  lifetimes:{
    created() {
      wx.request({
        url: 'http://api.egu365.com/goods/classify',
        success: (result) => {
          console.log(result.data.list)
          this.setData({
            classify: result.data.list
          })
        }
      }),
        wx.request({
          url: 'http://api.egu365.com/news/adviseSeats?type=10',
          success: (result) => {

            this.setData({
              imgSrcs: result.data.list
            })
          }
        })
      
    }
  },
  methods:{
    handleSelect:function(e){
      console.log(e.currentTarget.dataset.i)
     this.setData({
       selected: e.currentTarget.dataset.type,
       tid: e.currentTarget.dataset.tid,
       bjImg: e.currentTarget.dataset.bgImg,
       suoyin: e.currentTarget.dataset.index
     })
      if (e.currentTarget.dataset.i <= 5 && e.currentTarget.dataset.i >= 0){
        console.log(e.currentTarget.dataset.i )
        this.setData({
          left: -(18 + ~~e.currentTarget.dataset.i * 82)
        })
      }
      if(e.currentTarget.dataset.i > 5 ){
        this.setData({
          left:-444
        })
      }
      if (e.currentTarget.dataset.i < 0){
        this.setData({
          left: 0
        })
      }
    
    }
     
  }
  /**
   * 生命周期函数--监听页面加载
   */


  /**
   * 生命周期函数--监听页面初次渲染完成
   */


  /**
   * 生命周期函数--监听页面显示
  

  /**
   * 生命周期函数--监听页面隐藏
   */
  
  /**
   * 生命周期函数--监听页面卸载

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  /**
   * 页面上拉触底事件的处理函数
   */

  /**
   * 用户点击右上角分享
   */
})