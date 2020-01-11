// component/otherBar/otherBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tid:String,
    seat:Number,
    bjImg:String,
    imgSrcs:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    fruits: Array,
     pageNo : 1
   
  },
  
  lifetimes: {
    attached: function () {
      console.log(this.data.tid)
      wx.request({
        url:`http://api.egu365.com/goods/list?tid=${this.data.tid}&sorts=hits+asc&seat=${this.data.seat}&pageNo=1`,
        success: (result) => {
          console.log(result.data.list)
          this.setData({
            fruits: result.data.list
          })
        }
      })

    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
   lower:function(){
    
     this.setData({
       pageNo:this.data.pageNo + 1
     })
     wx.request({
       url: `http://api.egu365.com/goods/list?tid=${this.data.tid}&sorts=hits+asc&seat=${this.data.seat}&pageNo=${this.data.pageNo}`,
       success: (result) => {
         this.setData({
           fruits:[ 
             ...this.data.fruits,
             ...result.data.list
             ]
         })
       }
     })
   },
    clicktodetails(e) {
      wx.navigateTo({
        url: '/pages/details/details?tid=' + e.currentTarget.dataset.tid
      })
    }
  }

})
