// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agree:false,
    modalStr:"",
    success:false,
    username: '',
    password: '',
    nick_name: null,
    head_img: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    wx.getStorage({
      key: 'token',
      success(res) {
        console.log("efaf")
      },
      fail: (res) => {
        wx.switchTab({
          url: '../index/index',
        })
      }
    })

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  in_username: function(e) {
    console.log(e);
    this.setData({
      username: e.detail.value
    })
  },
  in_passwd: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  agree:function(){
    this.setData({
     agree:true
    })
  },
  bindGetUserInfo: function(e) {
    var that = this; 
    console.log(e.detail.userInfo)
    var data = e.detail.userInfo
    this.setData({
      nick_name: data.nickName,
      head_img: data.avatarUrl
    })
    app.globalData.img = this.data.head_img
    app.globalData.nickname = this.data.nick_name
    // console.log(app.globalData.nickname)

    //登录网络请求
    var nickname = this.data.nick_name;
    var img = this.data.head_img;
    var username = this.data.username;
    var password = this.data.password;
    if (username == "") {
      that.setData({
        modalStr: "请输入账号"
      })
      return;
    }
    else if (password == ""){
      that.setData({
        modalStr: "请输入密码"
      })
      return ;
    }
    else if (this.data.agree == false) {
      that.setData({
        modalStr: "请勾选许可使用协议"
      })
      return;
    }
    var code = app.globalData.code;
    wx.request({
      url: 'https://www.woxihuannia.top/php/login.php',
      method: "POST",
      data: {
        code: code,
        username: username,
        password: password,
        nick_name: nickname,
        head_portrait: img
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        console.log(res.data)
        
        if (res.data.code == 0) {
          that.setData({
            success: true,
            modalStr: ""
          })
          wx.setStorage({
            key: 'token',
            data: res.data.message,
          })
          setTimeout(function() {
            wx.switchTab({
              url: '../index/index',
            })
          }, 2000)
        }
        else if(res.data.code == 1) {
         that.setData({
           modalStr:"账号密码有误！"
         })
         return;
        }

      }

    })
  }
})