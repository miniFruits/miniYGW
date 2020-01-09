
Component({

  /**
   * 页面的初始数据
   */
  data: {
    biglist:[],
    leftlist:[],
    titlelist:[],
    num:1,
    indexflag:0,
    titlexindex:0,
    contentlist:[],
    tid:'0200000000',
    allid:'0200000000'
  },

  lifetimes:{
    attached:function(){
      this.loadfirst()
      this.loadcontent()
      wx.showTabBar()
    }
  },


  methods:{
    loadfirst(){  //加载首屏ID
      wx.request({
        url: 'http://api.egu365.com/goods/classify',
        success: (result) => {
          this.setData({
            biglist: result.data.list
          })
          // console.log(this.data.biglist)
          this.leftfilter()
          this.titlefilter()
        }
      })
    },
    loadcontent(){  //加载具体内容
      let newid = this.data.tid;
      let num=this.data.num;
      wx.request({
        url: `http://api.egu365.com/goods/list?sorts=hits+asc&tid=${newid}&pageNo=${num}`,
        success:(result)=>{
          this.setData({
            contentlist:result.data.list
          })
        }
      })
    },
    leftfilter(){   //左边列表过滤
      let list = this.data.biglist
      let result=[]
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
    titlefilter(){    //头部过滤
      let list = this.data.biglist
      let title = list[this.data.indexflag].bcProductTypeEos
      let result = []
      let obj = { tname: "全部", tid:this.data.allid}
      result.push(obj)
      if (title) {
        for (var i = 0; i < title.length; i++) {
          let obj = {}
          obj.tname = title[i].tname
          obj.tid = title[i].tid
          result.push(obj)
        }
        this.setData({
          titlelist: result
        })
      }
    },

    leftclick(e){   //左边列表单击事件
      this.setData({
        indexflag: e.currentTarget.dataset.indexs,
        tid: e.currentTarget.dataset.tid,
        allid: e.currentTarget.dataset.tid,
        titlexindex: 0,
        num:1
      })
      this.titlefilter()
      this.loadcontent() //点击重新渲染内容
    },

    titleclick(e){    //头部单击事件
      this.setData({
        titlexindex:e.currentTarget.dataset.indexs,
        tid: e.currentTarget.dataset.tid,
        num:1
      })
      this.loadcontent() //点击重新渲染内容
    },
    clicktodetails(e){    //点击跳转到详情页事件
      wx.navigateTo({
        url: '/pages/details/details?tid=' + e.currentTarget.dataset.tid
      })
    },
    lowdata(){      //加载更多数据
      let newnum = this.data.num+1;
      let newid = this.data.tid;
      this.setData({
        num: newnum
      })
      wx.request({
        url: `http://api.egu365.com/goods/list?sorts=hits+asc&tid=${newid}&pageNo=${newnum}`,
        success: (result) => {
          console.log(result)
          this.setData({
            contentlist:[...this.data.contentlist,...result.data.list]
          })
        }
      })
    },
    tosearch(){     //跳转到搜索页
      wx.navigateTo({
        url: '/component/Search/Search'
      })

    }
  }
})