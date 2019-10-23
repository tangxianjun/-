// pages/index/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visibility:"hidden",
    focus:"false",
    input_value:'',
    // history:[
    //   {
    //     id:"1",
    //     text:"afd"
    //   },
    //   {
    //     id: "2",
    //     text: "afdwf"
    //   },
    //   {
    //     id: "3",
    //     text: "affefd"
    //   }
    // ],
    display:"",
    hot:[
      {
        id:1,
        title:"普通话考试"
      },
      {
        id: 2,
        title: "六级词汇"
      },
      {
        id: 3,
        title: "四级词汇"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // try {
    //   wx.setStorageSync('history', this.data.history)
    // } catch (e) { }
    try {
      var value = wx.getStorageSync('history')
      if (value) {
        // Do something with return value
        this.setData({
          history:value,
          display:"block"
        })
        console.log("ok")

      }else{
        // console.log("aefja")
        this.setData({
          display:"none"
        })

      }
    } catch (e) {
      // Do something when catch error
      console.log("efha")
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
  search_input:function(){
    this.setData({
      visibility:'visible',
      focus:true
    })
  },
  input:function(e){
      console.log(e.detail.value)
      this.setData({
        input_value:e.detail.value
      })
  },
  search:function(){
    var data = this.data.input_value
    wx.navigateTo({
      url: "../../result/result?data=" + data
    })
  }
  
})