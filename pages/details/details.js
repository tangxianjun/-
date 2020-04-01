// pages/details/details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalStr:"",
    phone:'',
    leave:'',
    tooLate:false,
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
    nickname: "",
    grade: "",
    dorm: "",
    goods_picture: ["", "","","",""],
    collect:0,
    personalIcon: "",
    priceNow: 150,
    pricePrv: 1599,
    time: "",
    goodsName: "",
    detail: "",

    linkWay:'显示线上联系方式',
    tmp:'',
    link:'',
    isnew:'',
    tradeWay:'',
    bargainable:'',
    Call:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    var token = wx.getStorageSync('token')
    if (token) {
      that.setData({
        token: token
      })
      var data = options.data
      wx.request({
        url: 'https://market.sky31.com/php/AddView.php',
        method: "POST",
        data: {
          goods_id: data
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          
        }
      })
    } else {
      wx.navigateTo({
        url: '../login/login?data=请先登录',
      })
    }
    that.setData({
      goods_id:parseInt(options.data)
    })
    
    if(app.globalData.collect){
      if (JSON.parse(app.globalData.collect.message).indexOf(that.data.goods_id) == -1) {
        
        that.setData({
          collect: 0
        })
      } else {
        
        that.setData({
          collect: 1
        })
      }

    }
    
    
    if (app.globalData.img) {
      this.setData({
        nickname: app.globalData.nickname,
        head_img: app.globalData.img
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
    this.getGoodsInfo(options.data);
  },
  getGoodsInfo:function(data){
    var that = this;
    wx.request({
      url: 'https://market.sky31.com/php/goodsinfo.php',
      method: "GET",
      data: {
        goods_id: data
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        let resData = res.data.data;
        let phone = res.data.data.phone
        // console.log(phone)
        let goods_picture = [];
        var i = 1;
        while (resData["pic" + i + "_path"]) {
          goods_picture[i - 1] = resData["pic" + i + "_path"];
          i++;
        }
        var linkWay;
        // console.log(resData.QQ);
        if(resData.QQ){
          linkWay = 'QQ:' + resData.QQ;
          var link = resData.QQ
        } else {
          linkWay = 'Wechat:' + resData.wechat;
          var link =  resData.wechat
        }
        console.log(linkWay);
        that.setData({
          dorm: resData.dorm,
          grade:resData.grade,
          phone:phone,
          leave_message: res.data.leave,
          nickname: resData.nick_name,
          personalIcon: resData.head_portrait,
          goods_picture: goods_picture,
          goodsName: resData.title,
          detail: resData.description,
          time: resData.insert_time,
          priceNow:resData.purchase_price,
          pricePrv:resData.price,
          tmp:linkWay,
          link:link,
          isnew: resData.new,
          tradeWay: resData.tradeWay,
          bargainable: resData.bargainable
        })
        console.log(that.data.grade)
      }
    })
  },
  toggleCollect:function(e){
    console.log(this.data.goods_id);
    var that = this;
    if(this.data.collect == 0){
      console.log("收藏");
      wx.request({
        url: 'https://market.sky31.com/php/collect.php',
        method: "POST",
        data: {
          token: that.data.token,
          goods_id: that.data.goods_id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          if (res.data.code == 2 || res.data.code == 4) {
            wx.navigateTo({
              url: '../login/login?data=请先登录'
            })
            wx.removeStorageSync('token')
            return;
          }
          
          console.log(res.data)
          that.setData({
            collect:1
          })
          wx.showToast({
            title: '收藏成功',
            icon: 'successe',
            duration: 1500,
            mask: true,
            
          })
          app.Get_collect();
        }
      })
    }
    else{
      console.log("取消收藏");
      wx.request({
        url: 'https://market.sky31.com/php/del_collect.php',
        method: "POST",
        data: {
          token: that.data.token,
          goods_id: that.data.goods_id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          if (res.data.code == 2 || res.data.code == 4) {
            wx.navigateTo({
              url: '../login/login?data=请先登录'
            })
            wx.removeStorageSync('token')
            return;
          }
          console.log(res.data)
          that.setData({
            collect: 0
          })
          app.Get_collect();
        }
      })
    }
    
  },
  CallTrue:function(){
    var that = this
    if(that.data.phone != ""){
      wx.makePhoneCall({
        phoneNumber: that.data.phone //仅为示例，并非真实的电话号码
      })
    }else{
      this.copy()
    }
    
    
  },
  call:function(){
    var that = this
    var hour = new Date().getHours();
    console.log(hour);
    if(that.data.phone != ""){
      if (hour >= 23 || hour < 6) {
        this.setData({
          tooLate: true
        })
        // setTimeout(function(){
        //   that.setData({
        //     tooLate:false
        //   })
        // },4000)
        return;
      } else {
        that.setData({
          Call: true
        })
        // wx.makePhoneCall({
        //   phoneNumber: that.data.phone //仅为示例，并非真实的电话号码
        // })
      }
    }else{
      that.setData({
        Call: true
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
  previewImage: function (e) {
    console.log(e)
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.goods_picture // 需要预览的图片http链接列表  
    })
  } ,

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
        jian_pan:true,
        leave:'none'
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
    if(that.data.reply==false){
      if(that.data.content==''){
        wx.showToast({
          title: '请输入留言',
          icon:'none'
        });
        return;
      } else if (content.indexOf("艹") != -1){
       
        return;
      }
      wx.request({
        url: 'https://market.sky31.com/php/leave_message.php',
        method: "POST",
        data: {
          token: that.data.token,
          goods_id: goods_id,
          content: content,
          nickname: app.globalData.nickname,
          head_img: app.globalData.img
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          if (res.data.code == 2 || res.data.code == 4) {
            wx.navigateTo({
              url: '../login/login?data=请先登录'
            })
            wx.removeStorageSync('token')
            return;
          }
          console.log(res.data);
          if(res.data.code ==0 ){
            that.setData({
              content: ''
            })
            that.getGoodsInfo(that.data.goods_id);
          }else if(res.data.code ==1){
            wx.showToast({
              title: '禁止发布敏感言论',
              icon: 'none'
            })
          }else{
            wx.showToast({
              title: '留言失败',
              icon: 'none'
            })
          }
        }

      })
    }else if(that.data.reply==true){
      wx.request({
        url: 'https://market.sky31.com/php/leave_message.php',
        method: "POST",
        data: {
          send_to_id: that.data.send_to_id,
          token: that.data.token,
          goods_id: goods_id,
          content: content,
          nickname: app.globalData.nickname,
          head_img: app.globalData.img
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          if (res.data.code == 2 || res.data.code == 4) {
            wx.navigateTo({
              url: '../login/login?data=请先登录'
            })
            wx.removeStorageSync('token')
            return;
          }
          console.log(res.data)
          if (res.data.code == 0) {
            that.setData({
              content: ''
            })
            that.getGoodsInfo(that.data.goods_id);
          } else if(res.data.code == 1){
            wx.showToast({
              title: '禁止发布敏感言论',
              icon: 'none'
            })
          } else {
            wx.showToast({
              title: '留言失败',
              icon: 'none'
            })
          }
        }

      })
    }

  },
  display:function(){
    if(this.data.liu_display=='block'){
      this.setData({
        leave:'block',
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
      liu_display:'block',
      leave:'none'
    })
  },
  showLinkWay:function(){
    var linkWay = this.data.tmp
    this.setData({
      linkWay:linkWay
    })
  },
  closeWindow:function(){
    this.setData({
      tooLate:false,
      Call:false
    })
  },
  copy:function(e){
    console.log(e)
    var that = this
    
    wx.setClipboardData({
      data: that.data.link,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
    
  },
  deleteMessage:function(e){
    if (JSON.parse(app.globalData.Put).indexOf(this.data.goods_id) == -1){
      return;
    }else{
      console.log(e)
      var id = e.currentTarget.dataset.id
      var token = wx.getStorageSync('token')
      var that = this
      wx.showActionSheet({
        itemList: ['删除留言'],
        itemColor: 'red',
        success(res) {
          wx.request({
            url: 'https://market.sky31.com/php/messageBoardDel.php',
            method: "POST",
            data: {
              token: token,
              messageId: id
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
              console.log(res.data)
              if (res.data.code == 14 || res.data.code == 6 || res.data.code == 10) {
                that.getGoodsInfo(that.data.goods_id);
                wx.showToast({
                  title: '删除成功！',
                })
              } else if (res.data.code == 5) {
                wx.showToast({
                  title: '不是你的商品留言',
                  icon: 'none'
                })
              }
            }

          })
        },
        fail(res) {
          console.log(res.errMsg)
        }
      })
    }

  }
})