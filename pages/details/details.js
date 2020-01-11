Component({
  data: {
    background: [],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    youhui: "none",
    mask: "none",
    guige: "none",
    info: {},
    guigeList: [],
    id: "",
    num: 1,
    choosedIndex: 0,
    choosedValue: "",
    nav:"none"
  },

  lifetimes: {
    ready: function() {
      this.setData({
        id: this.options.tid
      });
      wx.setStorage({
        key: "id",
        data: this.options.tid
      });

      // 轮播图
      wx.request({
        url: "http://api.egu365.com/goods/imgs",
        data: {
          id: this.data.id
          // id: "6157c98c7fd8445a9992"
        },
        success: result => {
          this.setData({
            background: result.data.list
          });
        }
      });
      // 商品信息
      wx.request({
        url: "http://api.egu365.com/goods/publish",
        data: {
          id: this.data.id
          // id: "6157c98c7fd8445a9992"
        },
        success: result => {
          this.setData({
            info: {
              goodsName: result.data.obj.goodsName,
              param2: result.data.obj.bseGoodsEo.param2,
              mallPrice: result.data.obj.mallPrice,
              grossWeight: result.data.obj.bseGoodsEo.grossWeight,
              goodsUnit: result.data.obj.bseGoodsEo.goodsUnit
            }
          });
        }
      });
      // 商品规格
      wx.request({
        url: "http://api.egu365.com/goods/specs",
        data: {
          id: this.data.id
          // id: "cdb0e1b9738c4039985b"
        },
        success: result => {
          this.setData({
            guigeList: result.data.list,
            choosedValue: result.data.list[0].goodsStandard
          });
        }
      });
    }
  },

  methods: {
    youhuiShow: function() {
      this.setData({
        youhui: "block",
        mask: "block"
      });
    },
    // 点击遮罩全部隐藏
    youhuiHidden: function() {
      this.setData({
        youhui: "none",
        mask: "none",
        guige: "none",
        nav:"none"
      });
    },
    guigeShow: function() {
      this.setData({
        guige: "block",
        mask: "block"
      });
    },
    // 选择规格
    choose: function(e) {
      this.setData({
        choosedIndex: e.currentTarget.dataset.index,
        choosedValue: e.currentTarget.dataset.value
      });
    },
    minusNum: function() {
      if (this.data.num > 1) {
        this.setData({
          num: this.data.num - 1
        });
      }
    },
    addNum: function() {
      this.setData({
        num: this.data.num + 1
      });
    },
    back: function() {
      wx.navigateBack({
      
      })
    },
    navShow: function() {
      this.setData({
        nav:"block",
        mask:"block"
      })
    },
    toHome: function(){
      wx.switchTab({
        url: '/pages/home/home',
      })
    },
    toClassify: function () {
      wx.switchTab({
        url: '/pages/classify/classify',
      })
    },
    toCart: function () {
      wx.switchTab({
        url: '/pages/cart/cart',
      })
    }
  }
});
