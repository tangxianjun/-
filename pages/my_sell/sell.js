// pages/my_sell/sell.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // me:'me_kong',     控制是否有背景色
    noneTex:'',
    selled:true,
    tex:"",
    tex2:"",
    url:'',
    status:'',
    me:"me_kong",
    text:"text_kong",
    display:"none",
    head_img:null,
    nickname:null,
    img_none:"block",
    selected:999,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var token = wx.getStorageSync('token')
    if (token) {
      that.setData({
        token: token
      })
    } else {
      wx.navigateTo({
        url: '../login/login?data=请先登录',
      })
    }
    var status = options.status
    this.setData({
      status:status
    })
    if(status=='sell'){
      this.setData({
        tex:"收获满满了吗？",
        tex2: '这是你卖出的商品',
        noneTex:'你还没有卖出一件宝贝喔~'
      })
      wx.setNavigationBarTitle({
        title: '我的卖出'
      })
    }else{
      this.setData({
        tex:"快把你的闲置放进来",
        tex2:'这是你发布的商品',
        noneTex: '这里空空的，快去发一个吧~'
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

  
  if(status=='sell'){
      this.setData({
        url:'https://market.sky31.com/php/show_sale.php'
      })
  }else{
    this.setData({
      url:'https://market.sky31.com/php/show_publish.php'
    })
  }
    wx.request({
      url: that.data.url,
      method: "POST",
      data: {
        token: that.data.token
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
        
        if (status == 'sell'){
          var resData = res.data.sale_list;
          for (var i = 0; i < resData.length; i++) {
            switch (resData[i].status) {
              case 1:
                resData[i].status = '正出售';
                break;
              case 0:
                resData[i].status = '已下架';
                break;
              case 2:
                resData[i].status = '已卖出';
                break;
              case 3:
                resData[i].status = '删除';
                break;
            }
          }
          that.setData({
            list: resData
          })
        }else{
          var resData = res.data.publish_list;
          for(var i = 0;i<resData.length;i++){
            switch (resData[i].status) {
              case 1:
                resData[i].status = '正出售';
                break;
              case 0:
                resData[i].status = '已下架';
                break;
              case 2:
                resData[i].status = '已卖出';
                break;
              case 3:
                resData[i].status = '删除';
                break;
            }
          }
          that.setData({
            list: resData
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
  deleteSell:function(e){
    console.log(e)
    var item = e.target.dataset.item;
    var id = e.currentTarget.dataset['index']
    var arr = this.data.list;
    var result = [];
    var length = arr.length;
    arr[e.target.dataset.item] = ""
    for (var i = 0; i < length; i++) {
      if (arr[i] != "")
        result.push(arr[i]);
    }
    console.log(id);
    if(this.chang(id,4)){
      wx.showToast({
        title: '删除成功！',
      })
      this.setData({
        list: result,
        selected: 999
      })
    }

  },
  toggleItem:function(e){
    console.log(e);
    if (e.target.dataset.item != this.data.selected)
    {
      if(e.target.dataset.up)
        var status = 'none'
        this.setData({
          selected: e.target.dataset.item
      })
      console.log(this.data.selected)
    }
    else 
    {
      this.setData({
        selected: 999
      })
    }
    console.log(this.data.selected);
  },
  cancelSelect:function(){
    this.setData({
      selected: 999
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
    if(this.data.status=='sell'){
      wx.switchTab({
        url: '../index/index',
      })
    }else{
      wx.switchTab({
        url: '../Put/index',
      })
    }
  },
  nav_detail:function(e){
    var index = e.currentTarget.dataset['index'];
    wx.navigateTo({
      url: '../details/details?data=' + index,
    })
    return;
  },
  chang:function(e,status){
    var that = this
    wx.request({
      url: 'https://market.sky31.com/php/statusChange.php',
      method: "POST",
      data: {
        token:that.data.token,
        goodsId:e,
        status: status
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
       console.log(res.data)
       
      }

    })
    return true
  },
  selled:function(e){
    console.log(e)
    var item = e.target.dataset.item;
    var id = e.currentTarget.dataset['index']
    var arr = this.data.list;
    var result = [];
    var length = arr.length;
    arr[e.currentTarget.dataset.item] = ""
    for (var i = 0; i < length; i++) {
      if (arr[i] != "")
        result.push(arr[i]);
    }
    console.log(id);
    if (this.chang(id, 0)) {
      wx.showToast({
        title: '已卖出！',
      })
      this.setData({
        list: result,
        selected: 999
      })
    }

  },
  delete:function(e){
    console.log(e)
    var item = e.target.dataset.item;
    var id = e.currentTarget.dataset['index']
    var arr = this.data.list;
    var result = [];
    var length = arr.length;
    arr[e.currentTarget.dataset.item] = ""
    for (var i = 0; i < length; i++) {
      if (arr[i] != "")
        result.push(arr[i]);
    }
    console.log(id);
    if (this.chang(id, 4)) {
      wx.showToast({
        title: '已删除！',
      })
      this.setData({
        list: result,
        selected: 999
      })
    }
  },
  edit:function(e){
    var that = this
    var id = e.currentTarget.dataset['index']
    wx.request({
      url: 'https://market.sky31.com/php/editGoods.php',
      method: "POST",
      data: {
        token: that.data.token,
        goodsId:id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        // console.log(res.data)
         wx.switchTab({
           url: '../Put/index?data',
         })
        app.globalData.putdata = res.data
        app.globalData.edit = true
      }

    })

  }
})