
Component({
 
  data: {
    background:[],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
  },

  lifetimes:{
    attached:function(){
      // 轮播图
      wx.request({
        url: 'http://api.egu365.com/goods/imgs?id=QV5gRRV4bxD80336ovH3',
        success:(result)=>{
          console.log(result.data.list)
          this.setData({
            background:result.data.list
          })
        }
      })
    }
  }
})
