 // pages/collect/collect.js
 const app = getApp()
 Page({

   /**
    * 页面的初始数据
    */
   data: {
     title:'',
     status: '',
     display: 'block',
     bttdisplay: 'block',
     url: '',
     collect: [
     ],
     news: [
     ],
     img_none: 'block',
     imgurl: '',
     tex: '',
     list: [

     ],
     selectedOption: -1,
     selectedMessage: -1
   },
   toggleOption: function(e) {
     console.log(e.target.dataset.index);
     if (this.data.selectedOption == -1) {
       this.setData({
         selectedOption: e.target.dataset.index
       })
     } else {
       this.setData({
         selectedOption: -1
       })
     }
   },
   deleteCollect: function(e) {
     var that = this;
     var token = wx.getStorageSync('token')
     wx.request({
       url: 'https://www.woxihuannia.top/php/del_collect.php',
       method: "POST",
       data: {
         token: token,
         goods_id: e.target.dataset.goods_id
       },
       header: {
         'content-type': 'application/x-www-form-urlencoded' // 默认值
       },
       success: function (res) {
         var arr = that.data.collect;
         var result = [];
         var length = arr.length;
         arr[e.target.dataset.index] = ""
         for (var i = 0; i < length; i++) {
           if (arr[i] != "")
             result.push(arr[i]);
         }
         console.log(arr);
         wx.showToast({
           title: '删除成功！',
         })
         that.setData({
           collect: result,
           selectedOption: -1
         })
       }
     })
   },
   deleteMessage:function(e){
     var arr = this.data.news;
     var result = [];
     var length = arr.length;
     arr[e.target.dataset.index] = ""
     for (var i = 0; i < length; i++) {
       if (arr[i] != "")
         result.push(arr[i]);
     }
     console.log(arr);
     wx.showToast({
       title: '删除成功！',
     })
     this.setData({
       news: result,
       selectedMessage: -1
     })
   },
   // 置顶
   toggleMessage:function(e){
     if(this.data.selectedMessage!=e.target.dataset.index){
       this.setData({
         selectedMessage: e.target.dataset.index
       })
     }else{
       this.setData({
         selectedMessage: -1
       })
     }
     
   },
   onLoad: function(options) {
     // 图片加载、
     console.log(options);
     if (options.status == 'collect') {
       wx.setNavigationBarTitle({
         title: '我的收藏'
       })
       this.setData({
         title:'这是你喜欢的宝贝',
         tex2: '常来看看喔',
         imgurl:'../images/collect.png',
         tex: '啥都没有，都长猫了',
         url: 'https://www.woxihuannia.top/php/show_collection.php'
       })
     } else if (options.status == 'news') {
       wx.setNavigationBarTitle({
         title: '我的消息'
       })
       this.setData({
         title: '有人询问你的宝贝吗',
         tex2: '及时回复留言喔~',
         imgurl: '../images/news.png',
         tex:'555...你还没有收到过留言',
         url: 'https://www.woxihuannia.top/php/show_message.php'
       })
     }
     //测试部分
     if (this.data.collect.length != 0 && options.status == 'collect') {
       this.setData({
         img_none: 'none',
         tex2: '常来看看喔'
       })
     } else if (options.status == 'news' && this.data.news.length != 0) {
       this.setData({
         img_none: 'none',
         tex2: '及时回复留言喔~'
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
     try {
       var value = wx.getStorageSync('token')
       if (value) {
         // Do something with return value
         // console.log(value)
       }
     } catch (e) {
       // Do something when catch error
     }
     var that = this;
     //实际请求
     var token = wx.getStorageSync('token')
     var that = this;
     if (token) {
       wx.request({
         url: that.data.url,
         method: "POST",
         data: {
           token: token
         },
         header: {
           'content-type': 'application/x-www-form-urlencoded' // 默认值
         },
         success: function (res) {
           if (options.status == 'collect') {
             that.setData({
               collect: res.data.collection_list
             })
             console.log(that.data.list)
           } else {
             that.setData({
               news: res.data.message_list
             })
             console.log(that.data.collect)
           }
           if (that.data.collect.length != 0 && options.status == 'collect') {
             that.setData({
               img_none: 'none',
               tex2: '常来看看喔'
             })
           } else if (options.status == 'news' && that.data.news.length != 0) {
             that.setData({
               img_none: 'none',
               tex2: '及时回复留言喔~'
             })
           }
         }

       })
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
   onShow: function() {

   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function() {

   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function() {

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
   nav: function() {
     wx.switchTab({
       url: '../index/index',
     })
   }
 })