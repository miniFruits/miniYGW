// pages/cart/cart.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
     mask:"none",
     title:"购物车",
     num:1,
     display:"block",
     displaysingle:"block",
    totalPrice:"0.00",
     goodList:[
       {
       id:1,
       img:"http://oss.egu365.com/upload/6acc7e790a4a49ab882795337b9f3c5d.jpg",
       title:"SWEET番茄350g*4礼盒装",
       price:"79.00",
       count:5,
       check:true,
       num:2,
     },{
         id:2,
         img: "http://oss.egu365.com/upload/f755ea55b02b40499ed366c1beb5ef11.jpg",
         title: "精选紫番茄1kg",
         price: "19.80",
         count:2,
         check: true,
         num: 3,
     },{
         id:3,
         img: "http://oss.egu365.com/upload/c3bee7a25fcc456ca5cb51f29eb06184.jpg",
         title: "空运南京红颜草莓300g（礼盒）",
         price: "48.00",
         count:8,
         check: true,
         num: 2,
     }
     ],
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    wx.hideTabBar(),
    wx.getStorage({
      key:1,
      success(res) {
        console.log(res.data.id)
      }
    })
  },
  // 去逛逛
  handlepage(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  handleshow() {
    console.log(this.data.goodList[0].img)
    this.setData({
      mask: "block",
    })
  },
  handlenone(){
    this.setData({
      mask: "none",
    })
  },
  // 点击全选
  handleAllselect(){
    console.log(this.data.goodList)
    if (this.data.display=="none"){
      this.setData({
     display:"block",
      })
    } 
    else if (this.data.display=="block"){
      this.setData({
        display: "none"
      })
   }
    this.calculateTotal()
  },
  // 点击选择单选框
  handlesingle(e){
    const index = e.currentTarget.dataset.index;
    let selected = this.data.goodList[index].check; 
    this.data.goodList[index].check=!selected
    this.setData({
          goodList: this.data.goodList
    })
    for (var i = 0; i < this.data.goodList.length; i++) {
      console.log(this.data.goodList[i].check)
      if (this.data.goodList[i].check) {
        this.setData({
          display: "block",
        })
      } else {
        this.setData({
          display: "none"
        })
      }
    }
  },
  // 点击添加
  handleadd(e){
    console.log(e.target)
    for (var i = 0; i < this.data.goodList.length; i++){
      if (e.currentTarget.dataset.id == this.data.goodList[i].id){
        var count = this.data.goodList[i].count;
        console.log(count)
      } 
    }
    if (this.data.num<count){
      this.setData({
        num: this.data.num + 1,
      })
    }
    this.calculateTotal()
  },
  // 点击减少
  handlesub(){
    if(this.data.num>1){
    this.setData({
      num: this.data.num - 1,
    })
    }
    this.calculateTotal()
  },
  // 计算总价
  calculateTotal: function () {
    var goodList = this.data.goodList;
    var totalCount = 0;
    var totalPrice = 0;
    for (var i = 0; i < goodList.length; i++) {
      var good = goodList[i];
      if (this.data.display == "block") {
        totalCount=this.data.num,
        totalPrice = goodList[i].price
      }
    }
    var TPrice = totalCount * totalPrice ;
    this.setData({
      totalPrice: TPrice
    })
  },

})