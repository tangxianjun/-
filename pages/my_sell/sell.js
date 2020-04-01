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
    selected:999,
    list: [
      {
        pic1_path: '../images/shoucang@2x.png',
        title: '这是一件我收藏的商品，这是一件我收藏的商品',
        description: '这是一件测试用的收藏商品，如果有实际数据返回了，请把这一组数据删掉',
        purchase_price:588,
        status:'已上架'
      },
      {
        pic1_path: '../images/noneput.svg',
        title: '这是二件我收藏的商品，这是二件我收藏的商品',
        description: '这是一件测试用的收藏商品，如果有实际数据返回了，请把这一组数据删掉',
        purchase_price: 588,
        status: '已上架'
      },
      {
        pic1_path: '../images/news.png',
        title: '这是三件我收藏的商品，这是三件我收藏的商品',
        description: '这是一件测试用的收藏商品，如果有实际数据返回了，请把这一组数据删掉',
        purchase_price: 588,
        status: '已下架'
      },]
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
  deleteSell:function(e){
    var item = e.target.dataset.item;
    var arr = this.data.list;
    var result = [];
    var length = arr.length;
    arr[e.target.dataset.item] = ""
    for (var i = 0; i < length; i++) {
      if (arr[i] != "")
        result.push(arr[i]);
    }
    console.log(arr);
    wx.showToast({
      title: '删除成功！',
    })
    this.setData({
      list: result,
      selected:999
    })

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