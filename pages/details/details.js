Component({
  data: {
    background: [],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    youhui: "none",
    info: {},
    id: ""
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
          // id: this.data.id
          id: "6157c98c7fd8445a9992"
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
          // id: this.data.id
          id: "6157c98c7fd8445a9992"
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
    }
  },

  methods: {
    youhuiShow: function() {
      this.setData({
        youhui: "block"
      });
    },
    youhuiHidden: function() {
      this.setData({
        youhui: "none"
      });
    }
  }
});
