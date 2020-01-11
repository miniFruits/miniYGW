
Component({
  //页面的初始数据
  data: {
    biglist:[],
    leftlist:[],
    titlelist:[],
    num:1,
    indexflag:0,
    titlexindex:0,
    contentlist:[],
    tid:'0200000000',
    allid:'0200000000',
    goodslist:[],
    noneflag:'none',
    timer:null
  },

  lifetimes:{
    attached:function(){
      wx.showTabBar({})
      this.loadfirst()      //加载首屏ID
      this.loadcontent()    //加载具体内容
      this.getgoodlist()    //获取本地的购物车数据
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
          console.log(result.data.list)
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
    },
    getgoodlist(){    //获取本地的购物车数据
      wx.getStorage({
        key: 'goodslist',
        success:(result)=>{
          this.setData({
            goodslist: result.data
          })
        },
      })
    },

    addcart(e){    //添加到购物车
      this.setData({
        timer:null
      })
      let newgoodslist = this.data.goodslist;   //拿到整体的购物车数据
      let flag=0;
      let sign=0;
      let id = e.currentTarget.dataset.tid;
      let name = e.currentTarget.dataset.name;
      let price = e.currentTarget.dataset.price;
      let img = e.currentTarget.dataset.img;
      let goodsstandard = e.currentTarget.dataset.goodsstandard;

      for(var i=0;i<newgoodslist.length;i++){   //去重循环比较
        if (id!=newgoodslist[i].id){
          flag++;   //没有重复则++
        }else{
          sign=i;   //找到重复的那个元素的下标
        }
      }

      if (flag === newgoodslist.length){    //判断比较次数，相等则没有重复
        let newgoods = {
          id: id,
          name: name,
          price: price,
          img: img,
          goodsstandard: goodsstandard,
          num:1,
        }
        newgoodslist.push(newgoods);
        this.setData({
          goodslist: newgoodslist
        })
        wx.setStorage({
          key: 'goodslist',
          data: newgoodslist
        })
      }else{
        newgoodslist[sign].num++;
        this.setData({
          goodslist: newgoodslist
        })
        wx.setStorage({
          key: 'goodslist',
          data: newgoodslist
        })
      }

      //轻提示
      this.setData({
        noneflag: 'flex'
      })
      //过渡动画效果
      let timer = this.data.timer;
      timer=setTimeout(()=>{
        this.setData({
          noneflag: 'none'
        })
      },3000)
    }
  }
})