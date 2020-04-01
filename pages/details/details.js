// pages/details/details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    send_to_id:null,
    button_display:'block',
    token:'',
    leave_message:'',
    content:'',
    goods_id:'',
    reply:false,
    jian_pan:false,
    liu_display:"none",
    head_img:'',
    nickname: "Slight_",
    gread: "大三",
    dorm: "金翰林",
    attestation: "未认证",
    goods_picture: ["", "","","",""],
    collect:0,
    personalIcon: "",
    priceNow: 150,
    pricePrv: 1599,
    time: "2019-09-12",
    goodsName: "至臻精品太后御用级窝窝头",
    detailTip: "全新",
    detail: "绝对正品，太后娘娘亲口测试，不好吃不要钱，咬过一口就不支持退款，谢谢太监们的支持了",
    tip: ["面交","全新","可讲价"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var token = wx.getStorageSync('token')
    if(token){
      that.setData({
        token: token
      })
    }
    that.setData({
      goods_id:parseInt(options.data)
    })
  
    if(JSON.parse(app.globalData.collect.message).indexOf(this.data.goods_id)==-1){
      this.setData({
        collect:0
      })
    }
    else{
      this.setData({
        collect: 1
      })
    }
    if (app.globalData.img) {
      this.setData({
        nickname: app.globalData.userInfo.nickName,
        head_img: app.globalData.userInfo.avatarUrl
      })
    } else {

      app.userInfoReadyCallback = data => {
        console.log(data);
        that.setData({
          head_img: data.userInfo.avatarUrl
        })
        // console.log(data.userInfo.nickName)
      }
    }
    console.log(options.data)
    wx.request({
      url: 'https://www.woxihuannia.top/php/goodsinfo.php',
      method: "GET",
      data: {
        goods_id: options.data
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        let resData = res.data.data;
        let goods_picture = [];
        var i = 1;
        while(resData["pic"+i+"_path"]){
           goods_picture[i-1] = resData["pic" + i + "_path"];
           i++;
        }
    
        that.setData({
            leave_message:res.data.leave,
            nickname: resData.nick_name,
            personalIcon: resData.head_portrait,
            goods_picture: goods_picture,
            goodsName: resData.title,
            detail: resData.description,
            time: resData.insert_time,
        })
      }

    })
  },
  toggleCollect:function(e){
    console.log(this.data.goods_id);
    var that = this;
    if(this.data.collect == 0){
      console.log("收藏");
      wx.request({
        url: 'https://www.woxihuannia.top/php/collect.php',
        method: "POST",
        data: {
          token: that.data.token,
          goods_id: that.data.goods_id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            collect:1
          })
        }
      })
    }
    else{
      console.log("取消收藏");
      wx.request({
        url: 'https://www.woxihuannia.top/php/del_collect.php',
        method: "POST",
        data: {
          token: that.data.token,
          goods_id: that.data.goods_id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            collect: 0
          })
        }
      })
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
  // up:function(e){
  //   console.log(e.detail)
  //   this.setData({
  //     bottom:e.detail.height
  //   })
  // },
  liu_yan:function(e){
    
    if(this.data.liu_display=='none'){
      this.setData({
        // bottom: e.detai,
        liu_display:'block',
        button_display:'none',
        reply:false,
        jian_pan:true
      })
    }
  },
  input:function(e){
    var content = e.detail.value
    console.log(e.detail.value)
      this.setData({
        content:content
      })
  },
  send:function(){
    var that = this
    var goods_id= this.data.goods_id
    // console.log(this.data.goods_id)
    var content = this.data.content
    // console.log(this.data.content)
    var token = this.data.token
    if(that.data.reply==false){
      wx.request({
        url: 'https://www.woxihuannia.top/php/leave_message.php',
        method: "POST",
        data: {
          token: token,
          goods_id: goods_id,
          content: content,
          nickname: app.globalData.nickname,
          head_img: app.globalData.img
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          console.log(res.data)
        }

      })
    }else if(that.data.reply==true){
      wx.request({
        url: 'https://www.woxihuannia.top/php/leave_message.php',
        method: "POST",
        data: {
          send_to_id: that.data.send_to_id,
          token: token,
          goods_id: goods_id,
          content: content,
          nickname: app.globalData.nickname,
          head_img: app.globalData.img
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          console.log(res.data)
        }

      })
    }

  },
  display:function(){
    if(this.data.liu_display=='block'){
      this.setData({
        
        liu_display: 'none',
        jian_pan: false,
        button_display: 'block'
      })
    }
  },
  reply:function(e){
    var send_to = e.currentTarget.dataset['index'];

    console.log(e.currentTarget.dataset['index'])
    this.setData({
      send_to_id:send_to,
      reply:true,
      button_display:'none',
      jian_pan:true,
      liu_display:'block'
    })
  }
})