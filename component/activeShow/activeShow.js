// component/activeShow/activeShow.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    subtitle:String,
    cxjList:Object,
    imgSrc:String
   
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
    clicktodetails(e){
      
      wx.navigateTo({
        url: '/pages/details/details?tid=' + e.currentTarget.dataset.tid
      })
    }
  },
  lifetimes:{
    attached:function(){
      
    }
  }
})
