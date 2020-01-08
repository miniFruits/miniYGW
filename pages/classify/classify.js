
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
    contentlist:[]
  },

  lifetimes:{
    attached:function(){
      this.loadfirst()
      this.loadcontent()
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
    loadcontent(tid){  //加载具体内容
      let newid = tid ||'0200000000';
      wx.request({
        url: `http://api.egu365.com/goods/list?sorts=hits+asc&tid=${newid}&pageNo=${this.data.num}`,
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
      let obj = { tname: "全部", tid:"0200000000"}
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
        titlexindex: 0
      })
      this.titlefilter()
      this.loadcontent(e.currentTarget.dataset.tid) //点击重新渲染内容
    },
    titleclick(e){    //头部单击事件
      this.setData({
        titlexindex:e.currentTarget.dataset.indexs
      })
      this.loadcontent(e.currentTarget.dataset.tid) //点击重新渲染内容
    },
    clicktodetails(e){    //点击跳转到详情页事件
      wx.navigateTo({
        url: '/pages/details/details?tid=' + e.currentTarget.dataset.tid
      })
    }
  }
})