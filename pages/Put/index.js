// pages/Put/index.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        /**
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
        isNew: false,
        title: "",
        describe: "",
        dormitory: "J",
        phone: "",
        linkWay: "",
        linkDetail: "",
        pricePrv: "",
        priceNow: "",
        bargaining: true,
        type: "图书教材",
        tip: "{{item.tip[0]}}",
        tradeWay: 0,
        picture: ["", "", "", "", "", ""],
        picNum: 0,
        picNow: 0,
        pic_url:["","","","","",""],
        // 所有标签
        allTip: [{
                title: "图书教材",
                tip: ["推荐", "教材", "考试", "文学", "畅销"],
            },
            {
                title: "美妆日化",
                tip: ["推荐", "护肤", "美妆", "洗护", "大牌"],
            }, 
            {
                title: "衣服鞋帽",
                tip: ["推荐", "上装", "裤装", "鞋履", "配饰"],
            },
            {
                title: "数码产品",
                tip: ["推荐", "手机", "电脑", "相机", "其它"],
            }, 
            {
                title: "生活日用",
                tip: ["推荐", "收纳", "雨伞", "洗晒", "清洁"],
            }, 
            {
                title: "家用电器",
                tip: ["推荐", "厨具", "电暖气", "电冷器", "照明"],
            },
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
    up: function (i){
      var token = wx.getStorageSync('token')
      var that = this

    },
    //上传图片
    up:function(i){
      var that = this
      var token = wx.getStorageSync('token')
      const promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
          wx.uploadFile({
            url: 'https://www.woxihuannia.top/php/faBuPic.php', //仅为示例，非真实的接口地址
            filePath: that.data.picture[i],
            name: 'upfile0',
            formData: {
              token: token
            },
            success(res) {
              // var data = res.data

              const data = JSON.parse(res.data)
              // return data.message
              // console.log(res)
              var url = "pic_url[" + i + "]"
              if (data.code == 0) {
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
    // 发布
    
    release: function() {
      var token = wx.getStorageSync('token')
      if(!token){
        wx.navigateTo({
          url: '../login/login',
        })
      }
      var i = 0
      const result = []
      console.log(this.data.linkWay)
      while(this.data.picture[i]){
        result.push(this.up(i))
        i++;
      }
      // var img = up(i)
    var k=0;
      Promise.all(result).then((res)=> {
        // console.log(res)
        // while(res[k].message){
        //   console.log(res[k].message)
        //   k++;
        // }
        // var p=0
        // while(this.data.pic_url[p]){
        //   console.log(this.data.pic_url[p])
        //   p++
        // }
        var that = this;
        
        if(that.data.linkWay=="QQ"){
          
          wx.request({
            url: 'https://www.woxihuannia.top/php/put.php',
            method: "POST",
            data: {
              qq: that.data.linkDetail,
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
              grade:"大一",
              pic0:that.data.pic_url[0],
              pic1: that.data.pic_url[1],
              pic2: that.data.pic_url[2],
              pic3: that.data.pic_url[3],
              pic4: that.data.pic_url[4],
              pic5: that.data.pic_url[5],
              bargaining: that.data.bargaining

            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
              
              // var res = JSON.parse(res.data)
              console.log(res.data)
              if (res.data.message =="数据插入成功"){
                wx.switchTab({
                  url: '../index/index',
                })
              }
            }

          })
        }
        if (this.data.linkWay =="WeChat"){
          wx.request({
            url: 'https://www.woxihuannia.top/php/put.php',
            method: "POST",
            data: {
              wechat: that.data.linkDetail,
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
              grade: "大一",
              pic0: that.data.pic_url[0],
              pic1: that.data.pic_url[1],
              pic2: that.data.pic_url[2],
              pic3: that.data.pic_url[3],
              pic4: that.data.pic_url[4],
              pic5: that.data.pic_url[5],
              bargaining: that.data.bargaining

            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
              console.log(res.data.data)
              
            }

          })
        }

        
        })
  
 
    },
    // 按紧图片
    movePic: function(e) {
        // 只进行一次setData
        if (this.data.isMove == 1) {
            let newSize = [0.8, 0.8, 0.8, 0.8, 0.8, 0.8];
            let newIndex = [1, 1, 1, 1, 1, 1];
            newSize[e.currentTarget.dataset['index']] = 1.1;
            newIndex[e.currentTarget.dataset['index']] = 10;
            this.setData({
                isMove: 0,
                picSize: newSize,
                zIndex: newIndex,
            })
        }

    },
    // 移动图片
    // moving: function(e) {
    //     // 这个过程主要是让那些图片让位
    //     let x = e.detail.x;
    //     let y = e.detail.y;
    //     x = this.pxTOrpx(x);
    //     y = this.pxTOrpx(y);
    //     // 获取到这是第几张图
    //     let num = e.currentTarget.dataset['index'];
    //     // 设定一下现在的总宽度和总高度
    //     // 把整个container分为六块
    //     let w = 650;
    //     let h = 430;
    //     // 让x和y自增每一个view的一半，这样就是从左上角到中间了
    //     x = x + 105;
    //     y = y + 105;
    //     // 获取横纵
    //     let xSide = parseInt(x / (w / 3));
    //     let ySide = parseInt(y / (h / 2));
    //     // console.log(xSide + " " + ySide);
    //     // newNum就是最终的位置
    //     let newNum = (3 * ySide) + (xSide+1);
    //     // console.log(newNum);
    //     let index = this.data.index;
    //     if(newNum > num) {
    //         // 现在摸着的这个被移动到后面去了
    //         // 前移部分方块
    //         for(let i=0;i<=5;i++) {
    //             if(index[i]>num && index[i]<=newNum) {
    //                 index[i]--;
    //             } else if(index[i] == num) {
    //                 index[i] = newNum;
    //             }
    //         }
    //         // console.log(index);
    //     } else if(newNum) {

    //     }
    // },
    // px转rpx
    pxTOrpx: function(px) {
        return 750 / wx.getSystemInfoSync().windowWidth * px;
    },
    // 移动结束
    moveOver: function() {
        this.setData({
            isMove: 1,
            picSize: [1, 1, 1, 1, 1, 1],
        })
    },
    // 删除图片
    deletePic: function(e) {
        let that = this;
        let picNum = e.currentTarget.dataset['index'];
        let pic = this.data.picture;
        console.log("删除图片" + this.data.picture[picNum]);
        pic[picNum] = "";
        this.setData({
            picture: pic,
            picNum: that.data.picNum - 1,
        })
        console.log("剩余图片" + that.data.picNum + "张");
        console.log("当前图片" + that.data.picture);
        // 前端排序
        let picPlace = e.currentTarget.dataset['place'];
        let index = that.data.index;
        for (let i = 0; i < 6; i++) {
            if (index[i] > picNum) {
                index[i]--;
            } else if (index[i] == picPlace) {
                index[i] = 5;
            }
        }
        that.setData({
            index: index,
        })
        console.log("重新排序为" + that.data.index);
        that.indexSort();
    },
    // 根据index进行前端的排序
    indexSort: function() {
        let prvX = [0, 220, 440, 0, 220, 440];
        let prvY = [0, 0, 0, 220, 220, 220];
        let index = this.data.index;
        let nowX = [],
            nowY = [];
        for (let i = 0; i <= 5; i++) {
            nowX[i] = prvX[index[i]];
            nowY[i] = prvY[index[i]];
        }
        this.setData({
            x: nowX,
            y: nowY,
        })
    },
    //   修改全新状态
    checkNew: function() {
        let that = this;

        if (that.data.isNew) {
            // 如果现在是勾选状态
            that.setData({
                isNew: false
            })
        } else {
            that.setData({
                isNew: true
            })
        }
        if (that.data.isNew) {
            console.log("商品状态切换为全新");
        } else {
            console.log("商品状态切换为非全新");
        }
    },
    // 填写宝贝标题
    setTitle: function(e) {
        this.setData({
            title: e.detail.value,
        })
        console.log("标题：" + this.data.title);
    },

    // 填写描述
    setDescribe: function(e) {
        this.setData({
            describe: e.detail.value,
        })
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
    setLinkDetail: function(e) {
        this.setData({
            linkDetail: e.detail.value,
        })
        console.log("联系的QQ或者微信号为" + this.data.linkDetail);
    },
    // 修改交易方式
    setTradeWay: function() {
        let that = this;
        if (that.data.tradeWay == 0) {
            that.setData({
                tradeWay: 1,
            })
        } else {
            that.setData({
                tradeWay: 0,
            })
        }
        if (that.data.tradeWay == 0) {
            console.log("交易方式切换为面交");
        } else {
            console.log("交易方式切换为可邮寄");
        }
    },
    // 设置分类
    setType: function(e) {
        // 计算标签的translate
        let tipY = e.currentTarget.dataset['num'] * 47;
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
        var that = this;
        wx.chooseImage({
            count: 6 - that.data.picNum, // 默认9  
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                let newPicture = res.tempFilePaths;
                let prvPicture = that.data.picture;
                let picNow = that.data.picNow;
                // 把图片逐张加入数组
                for (let i = 0; i < newPicture.length; i++) {
                    if (picNow > 5) {
                        // 如果picNow大于5了，就让它变成0
                    }
                    while (prvPicture[picNow] != "") {
                        console.log('a');
                        picNow++;
                    }
                    prvPicture[picNow] = newPicture[i];
                    picNow++;
                }
                that.setData({
                    picture: prvPicture,
                    picNum: that.data.picNum + newPicture.length,
                    picNow: picNow,
                })
                console.log("目前存好的图片为：" + that.data.picture);
                console.log("当前有" + that.data.picNum + "张图片");
            }

        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: "发布宝贝",
        })
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

    }
})