const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    News:false,
    nickname:'',
    head_img:'',
    token:'',
    once:true
  },
  onTabItemTap(item) {

    // tab 点击时执行
    if (this.data.once){
      var token = wx.getStorageSync('token')
      if (token) {
        this.setData({
          nickname: app.globalData.nickname,
          head_img: app.globalData.img,
          token: token
        })
      } else {
        wx.navigateTo({
          url: '../login/login?data=请先登录',
        })
        return;
      }
    }
    // wx.getStorage({
    //   key: 'token',
    //   success(res) {
    //     if (app.globalData.img) {
    //       that.setData({
    //         nickname: app.globalData.nickname,
    //         head_img: app.globalData.img
    //       })
    //     } else {

    //       app.userInfoReadyCallback = data => {
    //         console.log(data);
    //         that.setData({
    //           nickname: data.userInfo.nickName,
    //           head_img: data.userInfo.avatarUrl
    //         })
          
    //       }
    //     }
    //   },
    //   fail: (res) => {
    //     wx.navigateTo({
    //       url: '../login/login',
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // const app = getApp()

  
    this.setData({
      News:app.globalData.News
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    // app.globalData.getsuer = true
    // console.log(app.globalData.userInfo)
    if (app.globalData.img) {
      that.setData({
        nickname: app.globalData.nickname,
        head_img: app.globalData.img
      })
    } else {

      app.userInfoReadyCallback = data => {
        console.log(data);
        that.setData({
          nickname: data.userInfo.nickName,
          head_img: data.userInfo.avatarUrl
        })
        // console.log(data.userInfo.nickName)
      }
    }
    
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
      this.setData({
        once:true
      })
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
  nav1:function(){
    wx.navigateTo({
      url: '../my_sell/sell?status=put',
      
    })
  },
  sell:function (){
    wx.navigateTo({
      url: '../my_sell/sell?status=sell',
    })

  },
  collect:function(){
    wx.navigateTo({
      url: '../collect/collect?status=collect',
    })
  },
  news:function(){
    wx.navigateTo({
      url: '../collect/collect?status=news',
    })
    this.setData({
      News:false
    })
  },
  /**
   * 退出清除token
   */
  quit:function(){
    wx.removeStorage({
      key: 'token',
      success(res) {
        console.log(res)
        wx.navigateTo({
          url: '../login/login',
        })
      }
    })
  },
  connect:function(){
    wx.navigateTo({
      url: '../connect/connect',
    })
  }
})