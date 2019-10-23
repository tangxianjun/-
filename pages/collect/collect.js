// pages/collect/collect.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:'',
    display:'block',
    bttdisplay:'block',
    url:'',
    collect:[],
    news:[],
    img_none:'block',
    imgurl:'',
    tex:'',
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 图片加载
    if(options.status=='collect'){
      this.setData({
        tex:'啥都没有 都长猫了',
        imgurl:'../images/collect.png',
        url:'https://www.woxihuannia.top/php/show_collection.php'
      })
    }else{
      this.setData({
        url:'https://www.woxihuannia.top/php/show_message.php',
        imgurl:'../images/news.png',
        bttdisplay:'none',
        tex:'555..你还没有收到过留言'
      })
    }
    //  异步请求需要优化
    if (app.globalData.img) {
      this.setData({
        nickname: app.globalData.userInfo.nickName,
        head_img: app.globalData.userInfo.avatarUrl
      })
    } else {

      app.userInfoReadyCallback = data => {
        console.log(data);
        this.setData({
          nickname: data.userInfo.nickName,
          head_img: data.userInfo.avatarUrl
        })
        // console.log(data.userInfo.nickName)
      }
    }
    // if (this.data.collect == '' && this.data.news=='') {
    //   // console.log("ejfoa")
    //   this.setData({
    //     img_none:'block'
    //   })
    // } else{
    //   this.setData({
    //     img_none: "none"
    //   })
    // }
    try {
      var value = wx.getStorageSync('token')
      if (value) {
        // Do something with return value
        // console.log(value)
      }
    } catch (e) {
      // Do something when catch error
    }

  console.log(this.data.url)
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
        
        if(options.status=='collect'){
          that.setData({
            list: res.data.collection_list
          })
          console.log(that.data.list)
        }else{
          that.setData({
            collect: res.data.message_list
          })
          console.log(that.data.collect)
        }
        if(that.data.list!=[]&&that.data.collect!=[]){
          // console.log("afeafafr")
          that.setData({
            img_none:'none'
          })
        }
        if(that.data.collect!=[]&&options.status=='collect'){
          that.setData({
            img_none:'none',
            tex2: '常来看看喔'
          })
        }else if(options.status=='news'&&that.data.news!=[]){
          that.setData({
            img_none:'none',
            tex2:'及时回复留言喔~'
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

  }
})