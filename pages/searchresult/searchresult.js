// pages/searchresult/searchresult.js
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
    num:1,
    list:[]
  },

  lifetimes:{
    ready: function () {
      let num=this.data.num;
      wx.request({
        url: 'http://api.egu365.com/goods/list?sorts=goods_name+asc&key=' + encodeURI(this.options.key) +`&pageNo=${num}`,
      })
      console.log()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
