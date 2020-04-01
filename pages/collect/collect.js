 // pages/collect/collect.js
 const app = getApp()
 Page({

   /**
    * 页面的初始数据
    */
   data: {
     
     token:'',
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
     
     wx.request({
       url: 'https://market.sky31.com/php/del_collect.php',
       method: "POST",
       data: {
         token: that.data.token,
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
           title: '取消收藏成功！',
         })
         app.Get_collect()
         that.setData({
           collect: result,
           selectedOption: -1
         }); 
         
       }
     })
   },
   deleteMessage:function(e){
     console.log(e.target.dataset.index)
     var id = e.target.dataset.id
     var that = this
     wx.request({
       url: 'https://market.sky31.com/php/messageBoardDel.php',
       method: "POST",
       data: {
         token: that.data.token,
         messageId:id
       },
       header: {
         'content-type': 'application/x-www-form-urlencoded' // 默认值
       },
       success: function (res) {
         console.log(res.data)
         if (res.data.code == 14 || res.data.code == 6 || res.data.code == 10 ) {
           var arr = that.data.news;
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
             news: result,
             selectedMessage: -1
           })
         }else if(res.data.code == 5){
            wx.showToast({
              title: '不是你的商品留言',
              icon:'none'
            })
         }
       }

     })


    
   },
   // 置顶
   toggleMessage:function(e){
     if(this.data.selectedMessage!=e.target.dataset.index){
       this.setData({
         selectedMessage: e.target.dataset.index,
        
        
       })
       
     }else{
       this.setData({
         selectedMessage: -1,
         
         
       })
     }
     console.log(this.data.selectedMessage)
     
   },
   onLoad: function(options) {
     var that = this;
     var token = wx.getStorageSync('token')
     if(token){
       that.setData({
         token:token
       })
     }else{
       wx.navigateTo({
         url: '../login/login?data=请先登录',
       })
     }
     
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
         url: 'https://market.sky31.com/php/show_collection.php',
         status: options.status
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
         url: 'https://market.sky31.com/php/show_message.php'
       })
     }

     if (app.globalData.img) {
       this.setData({
         nickname: app.globalData.nickname,
         head_img: app.globalData.img
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
           if (options.status == 'collect') {
             that.setData({
               collect: res.data.collection_list
             })
             console.log(that.data.collect)
           } else {
             that.setData({
               news: res.data.message_list
             })
             console.log(res.data)
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
             that.news_change();
           }
         }

       })
     
   },
   replyMessage:function(e){

   },
   //changeNewsstatus
   news_change: function () {
     var token = wx.getStorageSync('token')
     var that = this
     if (token) {
       wx.request({
         url: 'https://market.sky31.com/php/messageBoardStatus.php',
         method: "POST",
         data: {
           token: that.data.token
         },
         header: {
           'content-type': 'application/x-www-form-urlencoded' // 默认值
         },
         success: function (res) {
           console.log(res.data)
           if (res.data.code == 14) {
             console.log('already read');
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
   toindex: function() {
     wx.switchTab({
       url: '../index/index',
     })
   },
   nav:function(e){
     console.log(e)
     let index = e.currentTarget.dataset['data']
     wx.navigateTo({
       url: '../details/details?data=' + index,
       success: function(res) {},
       fail: function(res) {},
       complete: function(res) {},
     })
   },
   reply:function(e){
     if(this.data.selectedMessage !=-1){
       this.setData({
         selectedMessage: -1
       })
       return;
     }
    
    
     var index = e.currentTarget.dataset['goodsid']
    console.log(index)
     if(index == '' || index == undefined){
       
       return
     }
     wx.navigateTo({
       url: '../details/details?data=' + index,
     })
   }
 })