// pages/Put/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        /**
         * putFlag 已经点击了发布
         * isNew 是否为全新
         * title 宝贝标题
         * describe 宝贝描述
         * dormitory 宿舍，J是金翰林，Q是琴湖，B是北苑，N是南苑，X是兴湘，Z是租房
         * phone 手机号码
         * linkWay 联系方式，QQ或WeChat
         * linkDetail QQ号或微信号
         * pricePrv 原价
         * priceNow 现价
         * bargaining 议价 true为可讲价，false为一口价
         * type 分类
         * tip 标签
         * tradeWay 交易方式，0是面交，1是可邮寄
         * picture 图片
         */
      Sure:false,
        id:"",
        nickName:'',
        token:'',
        putFlag:false,
        grade:'大一',
        color: '#3F3F3F;',
        Dcolor: '#3F3F3F;',
        success:false,
        modalStr:"",
        font_count:0,
        Dfont_count:0,
        none:[0,0,0,0,0,0],
        isNew: 1,
        title: "",
        describe: "",
        dormitory: "J",
        phone: "",
        linkWay: "",
        linkDetailQ: "",
        linkDetailW:"",
        pricePrv: "",
        priceNow: "",
        bargaining: true,
      type: "学习相关",
        tip: "",
        tradeWay: "面交",
        picture: ["", "", "", "", "", ""],
        picNum: 0,
        picNow: 0,
        pic_url:["","","","","",""],
        // 所有标签
         allTip: [{
            title: "学习相关",
            tip: ["教辅", "文具", "课外", "其它"],
          },
          {
            title: "生活用品",
            tip: [ "寝室", "电器", "娱乐", "其它"],
          },
          {
            title: "数码产品",
            tip: [ "设备", "配件", "外设", "其它"],
          },
          {
            title: "美妆日化",
            tip: [ "美妆", "洗护", "大牌", "其它"],
          },
           {
             title: "衣物鞋帽",
             tip: [ "衣物", "鞋帽", "饰品", "其它"],
           },
          {
            title: "大杂烩",
            tip: [ "动植物", "租借", "零食", "其它"],
          }

        ],
        // dom操作
        options_height: "47rpx",
        options_opacity: "1",
        price_options_opacity: "0",
        price_options_height: "0",
        linkDetail_height: "53.816rpx",
        linkDetail_height_inner: "0",
        linkDetail_height_container: "0",
        linkWay_text_height: "30rpx",
        tipY: "0",

        // 关于图片拖动
        mainPic_num: 1, //默认第一张图是主图
        // 图片的位置
        x: [0, 220, 440, 0, 220, 440],
        y: [0, 0, 0, 220, 220, 220],
        positionX: [0, 220, 440, 0, 220, 440],
        positionY: [0, 0, 0, 220, 220, 220],
        // 图片的data-place
        index: [0, 1, 2, 3, 4, 5],
        // 右上角标签缩放(同时作为移动中的基准)
        isMove: 1,
        // 图片缩放
        picSize: [1, 1, 1, 1, 1, 1],
        // 层叠
        zIndex: [1, 1, 1, 1, 1, 1],
    },
    //重置数据
    reset:function(){
      this.setData({
        id:"",
        options_height: "47rpx",
        options_opacity: "1",
        price_options_opacity: "0",
        price_options_height: "0",
        linkDetail_height: "53.816rpx",
        linkDetail_height_inner: "0",
        linkDetail_height_container: "0",
        linkWay_text_height: "30rpx",
        tipY: "0",
        success: false,
        modal: false,
        modalStr: "",
        none: [0, 0, 0, 0, 0, 0],
        isNew: 1,
        title: "",
        describe: "",
        dormitory: "J",
        phone: "",
        linkWay: "",
        linkDetailQ: "",
        linkDetailW:'',
        pricePrv: "",
        priceNow: "",
        grade:'大一',
        bargaining: true,
        type: "图书教材",
        tip: "{{item.tip[0]}}",
        tradeWay: "面交",
        picture: ["", "", "", "", "", ""],
        picNum: 0,
        picNow: 0,
        pic_url: ["", "", "", "", "", ""],
      })
    },
    //上传图片
    up:function(i){
      var that = this
      var token = wx.getStorageSync('token')
      const promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
          wx.uploadFile({
            url: 'https://market.sky31.com/php/faBuPic.php', //仅为示例，非真实的接口地址
            filePath: that.data.picture[i],
            name: 'upfile0',
            formData: {
              token: token,
              nickName: that.data.nickName,
            },
            success(res) {
              // var data = res.data
            console.log(res)
              const data = JSON.parse(res.data)
              if(data.code == 2){
                wx.navigateTo({
                  url: '../login/login?data=请先登录'
                })
                wx.removeStorageSync('token')
                return;
              }
              // return data.message
              console.log(data)
              var url = "pic_url[" + i + "]"
              if (data.code == 0) {
                console.log(data.message)
                that.setData({
                  [url]: data.message
                })
                resolve(data)
                //   // console.log(that1.data.pic_url[0])
              }

              //do something
            },
            fail: () => {
              reject(false)
            }
          })
       
        }, 300)
      })
      return promise
    },
    //长按选择商品
    selectItem: function (e) {
       var arr = [0,0,0,0,0,0];
       console.log(e);
       for(var i=0;i<6;i++){
         if(i == e.target.dataset.index){
           arr[i] = 1;
         }
       }
       this.setData({
         none:arr
       })
    },
    // 短按恢复
    resetSelected:function (){
      var arr = [0, 0, 0, 0, 0, 0];
      this.setData({
        none: arr
      })
    },
    // 删除发布品
    deleteItem:function (e){

      var picNum = this.data.picNum - 1;
      var picNow = this.data.picNow - 1;
      var none = [0,0,0,0,0,0];
      var arr = this.data.picture;
      for (var i = e.target.dataset.index; i < 5; i++) {
        if (i == e.target.dataset.index){
          arr[i] = ""
        }
        else
          arr[i-1] = arr[i];
      }
      console.log(arr);
      this.setData({
        picture: arr,
        none:none,
        picNum:picNum,
        picNow:picNow
      })
    },
    // 置顶
    toTopItem:function(e){
      var picNum = this.data.picNum;
      var none = [0, 0, 0, 0, 0, 0];
      var arr = this.data.picture;
      var pic = arr[e.target.dataset.index];
      for (var i = e.target.dataset.index; i > 0; i--) {
        arr[i] = arr[i-1];
      }
      arr[0] = pic;
      console.log(arr);
      this.setData({
        picture: arr,
        none: none,
      })
    },
    //避免重复点击
    avoidClickAgain:function(){
      var that = this;
      //避免重复点击
      if (that.data.putFlag == false) {
        
        that.setData({
          putFlag: true
        })
        return true;
      } else {
        return false;
      }
      
    },
    // 发布
    release: function() {
      var that = this;

      var i = 0
      const result = []
      console.log(this.data.linkWay)
      while(this.data.picture[i]){
        if (this.data.picture[i].indexOf("https://mar") != -1){
          var url = "pic_url[" + i + "]"
          
            
            that.setData({
              [url]: this.data.picture[i]
            })
            
            //   // console.log(that1.data.pic_url[0])
          
        }else{
          result.push(this.up(i))
          
        }
        i++;
      }
      var k=0;

  

      Promise.all(result).then((res)=> {
        var that = this;
        var token = wx.getStorageSync('token')
        if (that.data.linkWay == "QQ"){
          if(that.avoidClickAgain() == false){
            return;
          }
          console.log(that.data.pic_url)
          wx.request({
            url: 'https://market.sky31.com/php/put.php',
            method: "POST",
            data: {
              qq: that.data.linkDetailQ,
              token:token,
              title:that.data.title,
              describ: that.data.describe,
              tag:that.data.type,
              mark:that.data.tip,
              isNew:that.data.isNew,
              price:that.data.pricePrv,
              dormitory:that.data.dormitory,
              purchase_price:that.data.priceNow,
              phone:that.data.phone,
              grade:that.data.grade,
              pic0: that.data.pic_url[0],
              pic1: that.data.pic_url[1],
              pic2: that.data.pic_url[2],
              pic3: that.data.pic_url[3],
              pic4: that.data.pic_url[4],
              pic5: that.data.pic_url[5],
              bargaining: that.data.bargaining,
              tradeWay:that.data.tradeWay,
              id:that.data.id
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
              wx.hideLoading()
              // var res = JSON.parse(res.data)
              console.log(res.data)
              if(res.data.code == 103){
                that.setData({
                  putFlag: false,
                  modalStr: "含有敏感信息"
                })
                setTimeout(function () {
                  that.setData({
                    modalStr: ''
                  })
                }, 2000)
                return
              }
              if (res.data.code == 2 || res.data.code == 4) {
                wx.navigateTo({
                  url: '../login/login?data=请先登录'
                })
                wx.removeStorageSync('token')
                return;
              }
              if (res.data.message =="数据插入成功"){
                  that.setData({
                    success: true,
                    modalStr: '',
                    putFlag: false,
                  })
                 app.globalData.putdata = null,
                 app.globalData.edit = false
                  setTimeout(function(){
                    
                    that.reset();
                    wx.navigateTo({
                      url: '../my_sell/sell',
                    })
                  },2000)
                  
              }else{
                that.setData({
                  putFlag: false,
                  modalStr:"发布失败"
                })
                setTimeout(function(){
                  that.setData({
                    modalStr:''
                  })
                },2000)
              }
              
            }

          })
        }
        else if (that.data.linkWay == "WeChat" ){
          if (that.avoidClickAgain() == false) {
            return;
          }
          wx.request({
            url: 'https://market.sky31.com/php/put.php',
            method: "POST",
            data: {
              wechat: that.data.linkDetailW,
              token: token,
              title: that.data.title,
              describ: that.data.describe,
              tag: that.data.type,
              mark:that.data.tip,
              isNew: that.data.isNew,
              price: that.data.pricePrv,
              dormitory: that.data.dormitory,
              purchase_price: that.data.priceNow,
              phone: that.data.phone,
              grade: that.data.grade,
              pic0: that.data.pic_url[0],
              pic1: that.data.pic_url[1],
              pic2: that.data.pic_url[2],
              pic3: that.data.pic_url[3],
              pic4: that.data.pic_url[4],
              pic5: that.data.pic_url[5],
              bargaining: that.data.bargaining,
              tradeWay: that.data.tradeWay,
              id:that.data.id

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
              wx.hideLoading()
              console.log(res.data)
              if (res.data.code == 103) {
                that.setData({
                  putFlag: false,
                  modalStr: "含有敏感信息"
                })
                setTimeout(function () {
                  that.setData({
                    modalStr: ''
                  })
                }, 2000)
                return
              }
              if (res.data.message == "数据插入成功") {
                that.setData({
                  success: true,
                  modalStr:'',
                  putFlag:false
                })
                setTimeout(function () {
                  that.reset();
                  wx.navigateTo({
                    url: '../my_sell/sell',
                  })
                }, 1000)

              }
            }

          })
        }
        })
  
    },
  
  

    //   修改全新状态
    checkNew: function() {
        let that = this;
        if (that.data.isNew == 0) {
            // 如果现在是勾选状态
            that.setData({
                isNew: 1
            })
        } else {
            that.setData({
                isNew: 0
            })
        }
        if (that.data.isNew==0) {
            console.log("商品状态切换为全新");
        } else {
            console.log("商品状态切换为非全新");
        }
    },
    // 填写宝贝标题
    setTitle: function(e) {
      console.log(e.detail.value.length)
        this.setData({
            title: e.detail.value,
            font_count: e.detail.value.length
        })
      if (e.detail.value.length == 20){
        this.setData({
          color:'red'
        })
      }else{
        this.setData({
          color: '#3F3F3F'
        })
      }
        console.log("标题：" + this.data.title);
    },

    // 填写描述
    setDescribe: function(e) {
      console.log(e)
        this.setData({
            describe: e.detail.value,
          Dfont_count: e.detail.value.length
        })
      if (e.detail.value.length == 120){
        this.setData({
          Dcolor:'red'
        })
      }else{
        Dcolor: '#3F3F3F'
      }
        console.log("描述：" + this.data.describe);
    },
    // 选择宿舍
    setDormitory: function(e) {
        this.setData({
            dormitory: e.currentTarget.dataset['index'],
        })
        console.log("宿舍切换到" + this.data.dormitory);
    },
    // 填写电话号码
    setPhone: function(e) {
        this.setData({
            phone: e.detail.value,
        })
        console.log("电话号码设置为" + this.data.phone);
    },
    // 设置原价和现价下面的dom操作
    setPriceButton: function() {
        let that = this;
        // console.log(this.data.pricePrv + " " + this.data.priceNow);
        if (this.data.pricePrv != "" && this.data.priceNow != "") {
            that.setData({
                price_options_opacity: that.data.options_opacity,
                price_options_height: that.data.options_height,
            })
            console.log("展开下面的按钮");
        } else {
            that.setData({
                price_options_opacity: "0",
                price_options_height: "0",
            })
            console.log("关闭下面的按钮");

        }
    },
    // 设置原价
    setPricePrv: function(e) {
        this.setData({
            pricePrv: e.detail.value
        })
        console.log("原价设置为" + this.data.pricePrv);
        this.setPriceButton();
    },
    // 设置现价
    setPriceNow: function(e) {
      console.log(e)
        this.setData({
            priceNow: e.detail.value,
        })
        console.log("现价设置为" + this.data.priceNow);
        this.setPriceButton();
    },
    // 设置是否可讲价
    setBargaining: function() {
        let that = this;
        if (that.data.bargaining) {
            that.setData({
                bargaining: false,
            })
        } else {
            that.setData({
                bargaining: true,
            })
        }
        if (that.data.bargaining) {
            console.log("商品状态切换为可讲价");
        } else {
            console.log("商品状态切换为一口价");
        }
    },
    // 设置联系方式
    setLinkWay: function(e) {
        this.setData({
            linkWay: e.currentTarget.dataset['index'],
        })
        console.log("联系方式切换为" + this.data.linkWay);
        this.setLinkDetailInput();
    },
    // 设置联系方式后下面的内容(dom操作)
    setLinkDetailInput: function() {
        let that = this;
        if (that.data.linkWay == "WeChat") {
            that.setData({
                linkDetail_height_container: that.data.linkDetail_height,
                linkDetail_height_inner: "0",
                linkWay_text_height: "0",
            })
        } else {
            that.setData({
                linkDetail_height_container: that.data.linkDetail_height,
                linkDetail_height_inner: that.data.linkDetail_height,
                linkWay_text_height: "0",
            })
        }
    },
    // 设置QQ或微信号
    setLinkDetailQ: function(e) {
        this.setData({
            linkDetailQ: e.detail.value,
        })
        console.log("联系的QQ为" + this.data.linkDetail);
    },
  setLinkDetailW: function (e) {
    this.setData({
      linkDetailW: e.detail.value,
    })
    console.log("联系的微信号为" + this.data.linkDetail);
  },
    // 修改交易方式
    setTradeWay: function() {
        let that = this;
        if (that.data.tradeWay == "面交") {
            that.setData({
                tradeWay: "可邮寄",
            })
        } else {
            that.setData({
                tradeWay: "面交",
            })
        }
        if (that.data.tradeWay == "面交") {
            console.log("交易方式切换为面交");
        } else {
            console.log("交易方式切换为可邮寄");
        }
    },
    // 设置分类
    setType: function(e) {
        // 计算标签的translate
      console.log(e.currentTarget.dataset['num'])
        let tipY = e.currentTarget.dataset['num'] * 76.2;
        this.setData({
            type: e.currentTarget.dataset['index'],
            tipY: tipY,
        })
        console.log("种类已更改为" + this.data.type);
    },
    // 设置标签
    setTip: function(e) {
        this.setData({
            tip: e.currentTarget.dataset['index'],
        })
        console.log("标签已更改为" + this.data.tip);
    },
    // 选择图片
    chooseImg: function() {
      if(this.data.picNum == 5)
      {
        wx.showToast({
          title: '一次最多上传5张图片哦',
        })
        return;
      }
        var that = this;
        wx.chooseImage({
            count: 5 - that.data.picNum, // 默认9  
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilesSize = res.tempFiles
                let newPicture = res.tempFilePaths;
                console.log(newPicture);
                let prvPicture = that.data.picture;
              // console.log(prvPicture)
                let picNow = that.data.picNow;
                var length = 0;
                // 把图片逐张加入数组
                for (let i = 0; i < newPicture.length; i++) {
                    if (picNow > 5) {
                        // 如果picNow大于5了，就让它变成0
                    }
   
                  if (tempFilesSize[i].size <= 8000000){
                    prvPicture[picNow] = newPicture[i];
                    picNow++;
                    length++;
                  }else{
                    wx.showToast({
                      title: '上传图片不能大于8M!',  //标题
                      icon: 'none'       //图标 none不使用图标，详情看官方文档
                    })
                  }
                    
                }
                console.log(picNow);
                that.setData({
                    picture: prvPicture,
                    picNum: that.data.picNum + length,
                    picNow: picNow,
                })
              console.log(that.data.picture)
                console.log("目前存好的图片为：" + that.data.picture);
                console.log("当前有" + that.data.picNum + "张图片");
            }

        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      // console.log(options.data)
      var that = this
      var token = wx.getStorageSync('token')
      if (token) {
        that.setData({
          token:token
        })
        
      }else{
        wx.navigateTo({
          url: '../login/login?data=请先登录',
        })
        return;
      }
        wx.setNavigationBarTitle({
            title: "发布宝贝",
        })
      if (app.globalData.img) {
        that.setData({
          nickName: app.globalData.nickname,
          
        })
      } else {

        app.userInfoReadyCallback = data => {
          console.log(data);
          that.setData({
            nickName: data.userInfo.nickName,
          })

        }
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
      // 编辑是edit为true
      
      console.log(app.globalData.putdata)
      
      if(app.globalData.edit){
        var data = app.globalData.putdata
        var ty=[]
        ty['学习相关'] = 0;
        ty['生活用品'] = 1 * 76.2;
        ty['数码产品'] = 2 * 76.2;
        ty['美妆日化'] = 3 * 76.2;
        ty["衣物鞋帽"] = 4 * 76.2;
        ty['大杂烩'] = 5 * 76.2;
        console.log(data[0])
        /**
         * 图片
         */
        var i = 6;
        var n = 0;
        var pic = ["","","","","",""]
        while(data[i] && i<=11){
          
          pic[n] = data[i];
          i++;
          n++
        }
        if(data[20]){
          
          this.setData({
            linkWay:'WeChat',
            linkDetailW: data[20],
            linkDetail_height_container: this.data.linkDetail_height,
            linkDetail_height_inner: "0",
            linkWay_text_height: "0",
          })
        }else{
          this.setData({
            linkDetail_height_container: this.data.linkDetail_height,
            linkDetail_height_inner: this.data.linkDetail_height,
            linkWay_text_height: "0",
            linkWay: 'QQ',
            linkDetailQ: data[21],
          })
        }
        this.setData({
          title:data[4],
          describe:data[5],
          grade:data[15],
          pricePrv:data[13],
          priceNow:data[14],
          type:data[1],
          tradeWay:data[24],
          dormitory:data[22],
          phone:data[19],
          tip:data[2],
          picture:pic,
          pic_url:pic,
          picNow:n,
          picNum:n,
          tipY:ty[data[1]],
          id:data[0]
        })
        console.log(this.data.pic_url)
        app.globalData.edit = false;
      }
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
  setClass:function(e){
    this.setData({
      grade: e.currentTarget.dataset['index'],
    })
    console.log("宿舍切换到" + this.data.grade);
  },
  Sure:function(){
    var str = "";
    var flag = 1;
    var that = this;

    
    if (this.data.title == "") {

      flag = 0;
      str = "请填写标题"
    } else if (that.data.describe == "") {
      flag = 0;
      str = "请填写商品信息"
    } else if (that.data.picNum == 0 && !that.data.pic_url) {
      flag = 0;
      str = "请至少上传一张图片"
    }else if(that.data.phone == ''){
          var str = "请输入电话号码";
          var   flag = 0;
    } else if (!(/^((13[0-9])|(14[0-9])|(16[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(that.data.phone))) {
      var flag = 0;
      var str = "请输入正确的手机号码"
    } else if (that.data.linkWay == "") {
      flag = 0;
      str = "请选择线上联系的方式"
      
    } else if (that.data.linkDetailQ == "" && that.data.linkDetailW == '') {
      flag = 0;
      str = "请填写微信/QQ号"
    } else if (that.data.pricePrv == "") {
      flag = 0;
      str = "请填写商品原价"
    } else if (that.data.priceNow == "") {
      flag = 0;
      str = "请填写商品现价"
    } else if (that.data.tip == "") {
      flag = 0;
      str = "请选择标签"
    } else if (parseInt(that.data.pricePrv) < parseInt(that.data.priceNow) ){
      flag = 0;
      str = "现价不能大于原价"
    }


    if (flag == 0) {
      this.setData({
        modalStr: str
      })
      setTimeout(function () {
        that.setData({
          modalStr: ""
        })
      }, 2000)
    }else{
      this.setData({
        Sure: true
      })
    }
    return
  
  },
  True:function(){
    this.setData({

      Sure: false
    })
    wx.showLoading({
      title: '正在发布中',
    })
    this.release();
  },
  closeWindow:function(){
    this.setData({
      phone: '',
      Sure:false
    })
    wx.showLoading({
      title: '正在发布中',
    })
    this.release()
  }
})