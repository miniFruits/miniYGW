const themes = {
  smallBar: "smallBar"
};

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tid: {
      type: String,
      value: ""
    },
    items: {
      type: Array,
      value: ["商品介绍", "规格参数", "售后保障"],
      observer: function(newVal) {
        if (newVal && newVal.length < 5) {
          this.setData({
            itemWidth: 750 / newVal.length - 60
          });
        }
      }
    },
    height: {
      type: String,
      value: "77"
    },
    textColor: {
      type: String,
      value: "#666"
    },
    textSize: {
      type: String,
      value: "26"
    },
    selectColor: {
      type: String,
      value: "#f44"
    },
    selected: {
      type: String,
      value: "0",
      observer: function(newVal) {
        this.setData({
          mSelected: newVal
        });
      }
    },
    theme: {
      type: String,
      value: "smallBar",
      observer: function(newVal) {
        if (this.data.theme == themes.smallBar) {
          this.setData({
            bottom: this.data.height / 2 - this.data.textSize - 8,
            scrollStyle: ""
          });
        }
      }
    },
    dataCus: {
      type: Array,
      value: "",
      observer: function(newVal) {
        this.setData({
          mDataCus: newVal
        });
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    itemWidth: 128,
    isScroll: true,
    scrollStyle: "border-bottom: 1px solid #e5e5e5;",
    left: "0",
    right: "750",
    bottom: "0",
    mSelected: "0",
    lastIndex: 0,
    transition: "left 0.5s, right 0.2s",
    windowWidth: 375,
    domData: [],
    textDomData: [],
    mDataCus: [],
    index: 0,
    imgInfo:'',
    
  },

  externalClasses: ["cus"],

  /**
   * 组件的方法列表
   */
  methods: {
    barLeft: function(index, dom) {
      let that = this;
      this.setData({
        left: dom[index].left
      });
    },
    barRight: function(index, dom) {
      let that = this;
      this.setData({
        right: that.data.windowWidth - dom[index].right
      });
    },
    onItemTap: function(e) {

      const index = e.currentTarget.dataset.index;
      if(index == 1){
        wx.request({
          url: 'http://api.egu365.com/goods/desc',
          data:{
            id: this.data.tid
          },
          success :(res)=>{
            this.setData({
              imgInfo: res.data.obj.goodsDesc
              // imgInfo: res.data.obj.goodsDesc.slice(3).substring(0, res.data.obj.goodsDesc.slice(3).length-6).replace(/img/g,'image')
            })
            console.log(this.data.imgInfo)
          }
        })
      }
      let str =
        this.data.lastIndex < index
          ? "left 0.5s, right 0.2s"
          : "left 0.2s, right 0.5s";
      this.setData({
        transition: str,
        lastIndex: index,
        mSelected: index,
        index
      });
      if (this.data.theme == themes.smallBar) {
        this.barLeft(index, this.data.textDomData);
        this.barRight(index, this.data.textDomData);
      } else {
        this.barLeft(index, this.data.domData);
        this.barRight(index, this.data.domData);
      }
      this.triggerEvent("itemtap", e, { bubbles: true });
    }
  },

  lifetimes: {
    ready: function() {
      let that = this;
      const sysInfo = wx.getSystemInfoSync();
      this.setData({
        windowWidth: sysInfo.screenWidth
      });
      const query = this.createSelectorQuery();
      query
        .in(this)
        .selectAll(".item")
        .fields(
          {
            dataset: true,
            rect: true,
            size: true
          },
          function(res) {
            that.setData({
              domData: res
            });
            that.barLeft(that.data.mSelected, that.data.domData);
            that.barRight(that.data.mSelected, that.data.domData);
            // console.log(res)
          }
        )
        .exec();
      query
        .in(this)
        .selectAll(".text")
        .fields(
          {
            dataset: true,
            rect: true,
            size: true
          },
          function(res) {
            that.setData({
              textDomData: res
            });
            if (that.data.theme == themes.smallBar) {
              that.barLeft(that.data.mSelected, that.data.textDomData);
              that.barRight(that.data.mSelected, that.data.textDomData);
            }
          }
        )
        .exec();
    }
  }
});
