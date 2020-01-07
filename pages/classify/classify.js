
Component({

  /**
   * 页面的初始数据
   */
  data: {
    biglist:[],
    leftlist:[],
    titlelist:[],
    indexflag:0
  },

  lifetimes:{
    attached:function(){
      wx.request({
        url: 'http://api.egu365.com/goods/classify',
        success: (result) => {
          this.setData({
            biglist:result.data.list
          })
          console.log(this.data.biglist)
          this.leftfilter()
          this.titlefilter()
        }
      })
      
    }
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
  methods:{
    leftfilter(){
      let list = this.data.biglist;
      let result=[];
      if (list){
        for (var i = 0; i < list.length; i++){
          let obj={};
          obj.tname=list[i].tname;
          obj.tid=list[i].tid;
          result.push(obj);
        }
        this.setData({
          leftlist:result
        })
      }
    },
    titlefilter(){
      let list = this.data.biglist;
      let title = list[this.data.indexflag].bcProductTypeEos;
      let result = [];
      if (title) {
        for (var i = 0; i < title.length; i++) {
          let obj = {};
          obj.tname = title[i].tname;
          obj.tid = title[i].tid;
          result.push(obj);
        }
        this.setData({
          titlelist: result
        })

      }
    },

    checkoutclick(e){
      this.setData({
        indexflag: e.target.dataset.indexs
      })
      this.titlefilter()
    }
  }
})