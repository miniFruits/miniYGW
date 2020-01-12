// component/Search/Search.js
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
    resultlist:'',
    list:[]
  },
  
  lifetimes: {
    attached: function () {
      wx.request({
        url: 'http://api.egu365.com/goods/hotWords?seat=109',
        success:(res)=> {
          this.setData({
            list:res.data.list
          })
        }
      })
    }
  },

  methods: {
    req(){    //请求数据
      wx.navigateTo({
        url: '/pages/searchresult/searchresult?key=' + this.data.resultlist
      })
    },
    cancel(){   //取消搜索
      wx.navigateBack({
        delta: 1
      })
    },
    feedin(e){    //监听输入
      this.data.resultlist = e.detail.value;
    },
    submitbutton(e){    //完成提交
      this.req()
    },
    hot(e){    //热门点击搜索
      this.setData({
        resultlist: e.currentTarget.dataset.valueitem 
      })
      this.req()
    }
  }
})
 