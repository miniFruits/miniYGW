// component/recomend/recomend.js
Component({
  /**
   * 组件的属性列表
   */

  relations: {
    '../recomendBox/recomendBox': {
      type: 'parent'
    }
  },
  // properties: {
  //   fruits:Array,
  //   imgsrc:String
  // },
  properties: {
    fruits: {
      type: Array,
      value:[],
      observer: function (newVal) {
     
      }
    },
    imgsrc: String
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
    clicktodetails(e) {
      wx.navigateTo({
        url: '/pages/details/details?tid=' + e.currentTarget.dataset.tid
      })
    }
  },
 
  lifetimes: {
    attached: function () {
    
    },
    ready: function () {
     
    }
  }
})
