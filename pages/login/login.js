// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:false,
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
    console.log(options.data)
    var that = this
    if(options.data=='请先登录'){
      this.setData({
        modalStr:options.data
      })
      setTimeout(function(){
        that.setData({
          modalStr:''
        })
      },2000)
    }
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
  checked:function(){
    if(this.data.username!=""&&this.data.password!=""&&this.data.agree==true){
      this.setData({
        flag:true
      })
    }else{
      this.setData({
        flag: false
      })
    }
    
  },
  in_username: function(e) {
    console.log(e);
    
    this.setData({
      username: e.detail.value
    })
    this.checked();
  },
  in_passwd: function(e) {
    this.setData({
      password: e.detail.value
    })
    this.checked();
  },
  agree:function(){
    this.setData({
     agree:true
    })
    this.checked();
  },
  bindGetUserInfo: function(e) {
    var that = this; 
    console.log(e.detail.userInfo)

    // console.log(app.globalData.nickname)

    //登录网络请求
    var username = this.data.username;
    var password = this.data.password;
    if(this.data.flag == false){
      return;
    }
    // console.log("!!!");
    if (username == "") {
      that.setData({
        modalStr: "请输入账号"
      })
      setTimeout(function () {
        that.setData({
          modalStr: ""
        })
      }, 2000)
      return;
    }
    else if (password == ""){
      that.setData({
        modalStr: "请输入密码"
      })
      setTimeout(function () {
        that.setData({
          modalStr: ""
        })
      }, 2000)
      return ;
    }
    else if (this.data.agree == false) {
      that.setData({
        modalStr: "请勾选许可使用协议"
      })
      setTimeout(function () {
        that.setData({
          modalStr: ""
        })
      }, 2000)
      return;
    }
    wx.showLoading({
      title: '登录中',
      mask: true
    })
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          var data = e.detail.userInfo
          console.log(data)
          var nickname = data.nickName;
          var img = data.avatarUrl;
          app.globalData.img = img
          app.globalData.nickname = nickname
          
          wx.login({
            success: res => {
              
              var code = res.code
              wx.request({
                url: 'https://market.sky31.com/php/login.php',
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
                success: function (res) {
                  console.log(res.data)

                  if (res.data.code == 0) {
                    wx.hideLoading()
                    that.setData({
                      success: true,
                      modalStr: ""
                    })
                    
                    wx.setStorage({
                      key: 'token',
                      data: res.data.message,
                    })
                    setTimeout(function () {
                      wx.switchTab({
                        url: '../index/index',
                      })
                    }, 3000)
                  }else if (res.data.code == 1) {
                    wx.hideLoading()
                    that.setData({
                      modalStr: "账号密码有误！"
                    })
                    setTimeout(function () {
                      that.setData({
                        modalStr: ""
                      })
                    }, 2000);
                    return;
                  }else{
                    wx.hideLoading()
                    that.setData({
                      modalStr: "服务器故障请稍后再试"
                    })
                    setTimeout(function () {
                      that.setData({
                        modalStr: ""
                      })
                    }, 2000);
                  }

                }

              })
            }
          })

        }else{
          wx.showToast({
            title: '请先授权',
            icon:'none'
          })
        }
      }
    })

  },
  aple:function(){
    wx.navigateTo({
      url: '../notic/notic',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})