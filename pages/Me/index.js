const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:'',
    head_img:''
  },
  onTabItemTap(item) {

    // tab 点击时执行
    var that = this
    wx.getStorage({
      key: 'token',
      success(res) {
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
        // console.log(res.data)
        // wx.navigateTo({
        //   url: '../details/details',

        // console.log("efaf")
        // })
      },
      fail: (res) => {
        wx.navigateTo({
          url: '../login/login',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'token',
      success(res) {
        console.log(res.data)
        // wx.navigateTo({
        //   url: '../details/details',
        // })
      },
      fail: (res) => {
        wx.navigateTo({
          url: '../login/login',
        })
      }
    })
    app.globalData.getsuer = true
    console.log(app.globalData.userInfo)
    if(app.globalData.img){
      this.setData({
        nickname:app.globalData.userInfo.nickName,
        head_img:app.globalData.userInfo.avatarUrl
      })
    }else{

      app.userInfoReadyCallback = data => {
      console.log(data);
      this.setData({
        nickname: data.userInfo.nickName,
        head_img: data.userInfo.avatarUrl
        })
        // console.log(data.userInfo.nickName)
      }
    }
    // const app = getApp()

  
    // this.setData({
    //   nickname:app.globalData.nickName
    // })
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
  }
})