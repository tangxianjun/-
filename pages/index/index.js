//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true, 
    autoplay:true,
    userInfo:{},
    hasUserInfo:false,
    classify_top:[
      {
        title:"图书教材",
        url:"../images/教材书籍@32_32.png"
      },
      {
        title: "数码产品",
        url: "../images/数码产品@32_32.png"
      },
      {
        title: "衣物鞋帽",
        url: "../images/衣物鞋帽@32_32.png"
      }
      
    ],
    classify_foot:[
      {
        title: "生活用品",
        url: "../images/生活用品@32_32.png"
      },
      {
        title: "家用电器",
        url: "../images/家用电器@32_32.png"
      },
      {
        title: "美妆日化",
        url: "../images/美妆日化@32_32.png"
      }
    ],
    note:[],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
    // 获取商品列表
    
    var that = this;
    wx.request({
      url: 'http://127.0.0.1/php/goodsinfo.php', //仅为示例，并非真实的接口地址
      method:"POST",
      data: {
        status:'1'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success:function(res){
        // console.log(res.data);
        that.setData({
          note:res.data
        });
        // console.log(that.data.note);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    wx.getSetting({
      success(res) {
        console.log(res.authSetting)
        console.log(!res.authSetting['scope.userInfo'])
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              wx.showToast({
                title: '授权成功！'
              })
            }
          })
        }
      }
    })
    
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
  navigator:function(){
   
  }

})
