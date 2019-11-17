// pages/my_sell/sell.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // me:'me_kong',     控制是否有背景色
    tex:"",
    url:'',
    status:'',
    me:"me_kong",
    text:"text_kong",
    display:"none",
    head_img:null,
    nickname:null,
    img_none:"block",
    
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var status = options.status
    this.setData({
      status:status
    })
    if(status=='sell'){
      this.setData({
        tex:"收获满满了吗？"
      })
      wx.setNavigationBarTitle({
        title: '我的卖出'
      })
    }else{
      this.setData({
        tex:"快把你的闲置放进来！"
      })
      wx.setNavigationBarTitle({
        title: '我的发布'
      })
    }
    //  异步请求需要优化
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

  // if(this.data.list==''){
  //   console.log("ejfoa")
  //   this.setData({
  //     me:"me_kong",
  //     text:"text_kong",
  //     display:"none"
  //   })
  // }else{
  //   this.setData({
  //     me:"me",
  //     text:"text",
  //     display:"block",
  //     img_none:"none"
  //   })
  // }
  
  try {
    var value = wx.getStorageSync('token')
    if (value) {
        // Do something with return value
      console.log(value)
    }
  } catch (e) {
      // Do something when catch error
  }
  if(status=='sell'){
      this.setData({
        url:'https://www.woxihuannia.top/php/show_sale.php'
      })
  }else{
    this.setData({
      url:'https://www.woxihuannia.top/php/show_publish.php'
    })
  }
  var that = this;
    wx.request({
      url: that.data.url,
      method: "POST",
      data: {
        token: value
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (status == 'sell'){
          that.setData({
            list: res.data.sale_list
          })
        }else{
          that.setData({
            list: res.data.publish_list
          })
        }
        console.log(that.data.list);
        // that.setData({
        //   list: res.data
        // })
        // console.log(that.data.list)
        if(that.data.list==''){
          // console.log("ejfoa")
          that.setData({
            me:"me_kong",
            text:"text_kong",
            display:"none"
          })
        }else{
          that.setData({
            me:"me",
            text:"text",
            display:"block",
            img_none:"none"
          })
        }
      }

    })

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
  nav:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  nav_detail:function(e){
    var index = e.currentTarget.dataset['index'];
    wx.navigateTo({
      url: '../details/details?data=' + index,
    })
  }
})