<<<<<<< HEAD
//app.js
App({
  globalData: {
    userInfo: null,
    code: {},
    getsuer: false,
    nickname: null,
    img: null,
    collect: null,
    edit:false,
    putdata:null,
    News:false,
    Put:"[]"
  },
  onLaunch: function () {
    this.Get_collect()
    this.Get_Put_id();
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.globalData.nickname = res.userInfo.nickName
              this.globalData.img = res.userInfo.avatarUrl
              console.log(this.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  Get_collect: function () {
    var token = wx.getStorageSync('token')
    var that = this
    if (token) {
      wx.request({
        url: 'https://market.sky31.com/php/collect_list.php',
        method: "POST",
        data: {
          token: token
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          if(res.data.code==0){
            that.globalData.collect = res.data
            that.globalData.News = res.data.News 
          }else {
            that.globalData.News = res.data.News 
          }
          console.log(that.globalData.News);
        }

      })
    }
  },
  /**
   * 获取自己正在出售的商品
   */
  Get_Put_id:function(){

    var token = wx.getStorageSync('token')
    var that = this
    if (token) {
      wx.request({
        url: 'https://market.sky31.com/php/getGoods.php',
        method: "POST",
        data: {
          token: token
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          if(res.data.code == 0){
            that.globalData.Put = res.data.message
          }
       
        }

      })
    }
  }
=======
//app.js
App({
  globalData: {
    userInfo: null,
    code: {},
    getsuer: false,
    nickname: null,
    img: null,
    collect: null
  },
  onLaunch: function () {
    this.Get_collect()
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res)
        this.globalData.code = res.code
        // console.log(this.globalData.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res.userInfo.avatarUrl)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.globalData.nickname = res.userInfo.nickName
              this.globalData.img = res.userInfo.avatarUrl
              console.log(this.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  Get_collect: function () {
    var token = wx.getStorageSync('token')
    var that = this
    if (token) {
      wx.request({
        url: 'https://www.woxihuannia.top/php/collect_list.php',
        method: "POST",
        data: {
          token: token
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          that.globalData.collect = res.data
          console.log(that.globalData.collect);
        }

      })
    }
  }
>>>>>>> cdc0ce316577159ed35d687fa319c2c274051267
})