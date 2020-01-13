// pages/cart/cart.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
     mask:"none",
     title:"购物车",
     display:"block",
     displaysingle:"block",
     totalPrice:"0.00",
     goodList:[
       {
       id:1,
       img:"http://oss.egu365.com/upload/6acc7e790a4a49ab882795337b9f3c5d.jpg",
       title:"SWEET番茄350g*4礼盒装",
       price:79.00,
       count:5,
       check:true,
       num:2,
     },{
         id:2,
         img: "http://oss.egu365.com/upload/f755ea55b02b40499ed366c1beb5ef11.jpg",
         title: "精选紫番茄1kg",
         price: 19.80,
         count:2,
         check: true,
         num: 1,
     },{
         id:3,
         img: "http://oss.egu365.com/upload/c3bee7a25fcc456ca5cb51f29eb06184.jpg",
         title: "空运南京红颜草莓300g（礼盒）",
         price: 48.00,
         count:8,
         check: true,
         num:1,
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
  onLoad(){
    this.calculateTotal()  },
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
    let arr=[];
    for (var i=0; i < this.data.goodList.length;i++){
      this.data.goodList[i].check=true;
    }
    console.log(this.data.goodList)
      if (this.data.display == "none") {
        this.setData({
          display: "block",
          goodList: this.data.goodList
        })
      }
      else if (this.data.display == "block") {
        for (var i = 0; i < this.data.goodList.length; i++) {
          console.log(this.data.goodList[i].check)
          this.data.goodList[i].check = false;
        }
        this.setData({
          display: "none",
          goodList: this.data.goodList
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
    let st =[];
    for (var i = 0; i < this.data.goodList.length; i++){
      if (this.data.goodList[i].check){
        st.push(this.data.goodList[i].check)
      }
      if (st.length==this.data.goodList.length) {
        this.setData({
          display: "block",
        })
      } else{
        this.setData({
          display: "none"
        })
      }
    }
    this.calculateTotal()
  },
  // 点击添加
  handleadd(e){
    let index = e.target.dataset.index
    var count = this.data.goodList[index].count;
    let num = this.data.goodList[index].num; 

    if (this.data.goodList[index].num<count){
      this.data.goodList[index].num++;
      this.setData({
        goodList: this.data.goodList
      })
    }
    this.calculateTotal()
  },
  // 点击减少
  handlesub(e){
    let index = e.target.dataset.index
    var count = this.data.goodList[index].count;
    let num = this.data.goodList[index].num;

    if (this.data.goodList[index].num >1) {
      this.data.goodList[index].num--;
      this.setData({
        goodList: this.data.goodList
      })
    }
    this.calculateTotal()
  },
  // 删除条目
  handledelete(e){
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    this.data.goodList.splice(index,1) 
    this.setData(
      { goodList: this.data.goodList}
    )
    this.calculateTotal()
  },
  // 计算总价
  calculateTotal: function () {
    var goodList = this.data.goodList;
    var totalCount = 0;
    var totalPrice = 0;
    var Price=[];
    var TPrice= 0.00;
    if(this.data.display=="block"){
    for (var i = 0; i < goodList.length; i++) {
      if (goodList[i].check){
        Price.push(goodList[i].num * goodList[i].price) 
      }
    }
     TPrice= Price.reduce(function getSum(total, num) {
        return total + num;
      },0)
    }else{
      for (var i = 0; i < goodList.length; i++) {
        if (goodList[i].check) {
          Price.push(goodList[i].num * goodList[i].price)
        }
      }
      TPrice = Price.reduce(function getSum(total, num) {
        return total + num;
      }, 0)
    }
    this.setData({
      totalPrice: TPrice
    })
  },

})