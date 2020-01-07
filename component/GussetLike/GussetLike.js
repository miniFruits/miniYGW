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
   pageNo: 1,
    pages:99,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(options) {
      // 页面初次加载，请求第一页数据
      this.fetchArticleList(1)
    },
    onReachBottom() {
      // 下拉触底，先判断是否有请求正在进行中
      // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
      if (!this.loading && this.data.page < this.data.pages) {
        this.fetchArticleList(this.data.pageNo + 1)
      }
    },

    fetchArticleList(pageNo) {
      this.loading = true

      // 向后端请求指定页码的数据
      return getArticles(pageNo).then(res => {
        const articles = res.items
        this.setData({
          pageNo: pageNo,     //当前的页号
          pages: res.pages,  //总页数
          articles: this.data.articles.concat(articles)
        })
      }).catch(err => {
        console.log("==> [ERROR]", err)
      }).then(() => {
        this.loading = false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  attached: function (options){
    let that=this
    wx.request({
      url: `http://api.egu365.com/goods/list?sorts=hits+asc&pageNo=${this.data.pageNo}`,
   success (res) {
    console.log(res.data.list)
     that.setData({
       list: res.data.list
     })
  }
  })
  
  },
  
})
