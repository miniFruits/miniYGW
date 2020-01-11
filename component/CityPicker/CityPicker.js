Component({
  data: {
    region: ["广东省", "广州市", "海珠区"],
    customItem: "请选择"
  },

  methods: {
    bindRegionChange: function(e) {
      console.log("picker发送选择改变，携带值为", e);
      this.setData({
        region: e.detail.value
      });
    }
  }
});
