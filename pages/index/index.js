//index.js
//获取应用实例
const app = getApp()
let lazyload;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //发布成功弹窗
    showWindow:false,
    // index:'',                      //当前商品id\\
    change:false,
    indicatorDots: true,
    autoplay: true,
    userInfo: {},
    hasUserInfo: false,
    bg:true,
    showModal:false,
    classify_top: [{
        title: "图书教材",
        url: "../images/book32_32.png"
      },
      {
        title: "数码产品",
        url: "../images/digital32_32.png"
      },
      {
        title: "衣物鞋帽",
        url: "../images/clothing32_32.png"
      }

    ],
    classify_foot: [{
        title: "生活用品",
        url: "../images/daily32_32.png"
      },
      {
        title: "家用电器",
        url: "../images/appliances32_32.png"
      },
      {
        title: "美妆日化",
        url: "../images/cosmetics32_32.png"
      }
    ],
    goods_left: [{
      pic1_path: "../images/width.jpg",
      title: "窝窝头",
      isNew: "全新",
      tag: "面交",
      price: "4",
      purchase_price: "0.25"
    }],
    goods_right: [{
      pic1_path: "../images/width.jpg",
      title: "窝窝头",
      isNew: "全新",
      tag: "面交",
      price: "4",
      purchase_price: "0.25"
    }],
    goods_left_temporary: [{
      pic1_path: "../images/width.jpg",
      title: "窝窝头",
      isNew: "全新",
      tag: "面交",
      price: "4",
      purchase_price: "0.25"
    }],
    goods_right_temporary: [{
      pic1_path: "../images/width.jpg",
      title: "窝窝头",
      isNew: "全新",
      tag: "面交",
      price: "4",
      purchase_price: "0.25"
    }],
    note: [],
    //  自制懒加载！
    // goodsNum:第一页显示的商品数量（也是后面显示的总商品数量）
    // goodsOnceAdd：每次滑到底后增加的商品数量
    // allGoodsNum:商品总量
    // allGoods:所有商品的json
    // leftNum:左边的商品数量
    // rightNum:右边的商品数量
    goodsNum: 5,
    goodsOnceAdd: 5,
    allGoodsNum: 0,
    allGoods: [],
    allGoods_temporary: [],
    goods_new:[],
    leftNum: 0,
    leftNum_temporary: 0,
    rightNum: 0,
    rightNum_temporary: 0,
    pageNow: 1,
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      this.getGoods()
    
  },
  /**
   * 加载下面的内容
   */
  toCollect:function(){
    wx.navigateTo({
      url: '../collect/collect',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getNextView: function() {

    

    /**
     * i:循环的中间变量
     * leftHeight：当前左边商品的高度
     * rightHeight:当前右边商品的高度
     * leftNumNow：左边的商品数量，这个数字在这个函数内递增，在最后丢到data里
     * rightNumNow：同上
     * needNum: 这次要加载的商品个数
     */
    let that = this;
    let leftHeight, rightHeight;
    let resLeft = that.data.goods_left,
      resRight = that.data.goods_right;
    let leftNumNow = that.data.leftNum,
      rightNumNow = that.data.rightNum;
    let i = leftNumNow + rightNumNow;
    let needNum;
    // 逻辑：获取到商品总量，然后根据商品总量修改resLeft和resRight的内容
    needNum = that.data.goodsNum;
    for(;i<=needNum-1;i++) {
      leftHeight = leftNumNow * 460.2;
      rightHeight = rightNumNow * 578.2;
      // 左边小于等于右边的时候，加载在左边
      if(leftHeight <= rightHeight) {
        resLeft[leftNumNow] = that.data.allGoods[i];
        leftNumNow++;
      } else {
        resRight[rightNumNow] = that.data.allGoods[i];
        rightNumNow++;
      }
    }
    that.setData({
      goods_left: resLeft,
      goods_right: resRight,
      leftNum: leftNumNow,
      rightNum: rightNumNow,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

    // wx.getSetting({
    //   success(res) {
    //     // console.log(res.authSetting)
    //     // console.log(!res.authSetting['scope.userInfo'])
    //     // res.authSetting = {
    //     //   "scope.userInfo": true,
    //     //   "scope.userLocation": true
    //     // }
    //     if (!res.authSetting['scope.userInfo']) {
    //       wx.authorize({
    //         scope: 'scope.userInfo',
    //         success() {
    //           wx.showToast({
    //             title: '授权成功！'
    //           })
    //         }
    //       })
    //     }
    //   }
    // });
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
  navigator: function() {

  },

  /**
   * 点击某视窗进入详情页
   */
  goods_detail: function(e) {
    console.log("打开了" + e.currentTarget.dataset['index'] + "号商品的详情页");
    var index = e.currentTarget.dataset['index'];
    // console.log(index);
    wx.getStorage({
      key: 'token',
      success(res) {
        // console.log(res.data)
        wx.navigateTo({
          url: '../details/details?data='+index,
        })
      },
      fail:(res)=>{
        wx.navigateTo({
          url: '../login/login',
        })
      }
    })
    
  },
  /**
   * 到底后往下滑继续加载
   */
  onReachBottom: function() {
    var that = this;
    let num;
    let isLoad = true;
    // 先判断还能不能加
    // 如果总数比现在数量+添加一次数量还多或者相等，自然是直接加载这么多
    if (that.data.allGoodsNum >= that.data.goodsNum + that.data.goodsOnceAdd) {
      num = that.data.goodsNum + that.data.goodsOnceAdd
    } else if (that.data.allGoodsNum > that.data.goodsNum) {
      // 如果不比加上一次的多，但是确实还没显示完，那就显示完
      num = that.data.allGoodsNum;
    } else {
      // 如果已经加载完了，那就不需要调用后面的函数了
      isLoad = false;
    }
    if(isLoad) {
      that.setData({
        goodsNum: num,
      })
      console.log(that.data.goodsNum);
      that.getNextView();
    }
  },
//   更换暂存和当前
    changeData: function () {
        let goods_left = this.data.goods_left;
        let goods_right = this.data.goods_right;
        let goods_left_temporary = this.data.goods_left_temporary;
        let goods_right_temporary = this.data.goods_right_temporary;
        let allGoods = this.data.allGoods;
        let allGoods_temporary = this.data.allGoods_temporary;
        let leftNum = this.data.leftNum;
        let leftNum_temporary = this.data.leftNum_temporary;
        let rightNum = this.data.rightNum;
        let rightNum_temporary = this.data.rightNum_temporary;
        this.setData({
            goods_left: goods_left_temporary,
            goods_right: goods_right_temporary,
            goods_left_temporary: goods_left,
            goods_right_temporary: goods_right,
            leftNum: leftNum_temporary,
            rightNum: rightNum_temporary,
            leftNum_temporary: leftNum,
            rightNum_temporary: rightNum,
            allGoods: allGoods_temporary,
            allGoods_temporary :allGoods,
        })
    },
    change1: function () {
        if (this.data.pageNow != 1) {
            this.setData({
                bg: true,
                pageNow: 1,
            })
            this.changeData();
        }

    },
    change2: function () {
        if (this.data.pageNow != 2) {
            this.setData({
                bg: false,
                pageNow: 2,
            })
            if (this.data.goods_new == '') {
                // console.log(this.data.goods_new)
                var that = this;
                wx.request({
                    url: 'https://www.woxihuannia.top/php/goodsinfo.php',
                    method: "GET",
                    data: {
                        status: '2'
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded' // 默认值
                    },
                    success: function (res) {
                        that.setData({

                            allGoods_temporary: res.data,
                        });
                        // console.log(that.data.allGoods_temporary);
                        that.changeData();
                        that.getNextView();
                    }

                })
            } else {

            }

            // this.getNextView();
        }

    },
  nav:function (e){
    console.log(e._relatedInfo)
    var data = e.currentTarget.dataset['index'];
    wx.navigateTo({
      url: "../category/category?data="+data
    })
  },
  toShowModal(e) {
    this.setData({
      showModal: true
    })
  },

  hideModal() {
    this.setData({
      showModal: false
    });
  },

  getGoods:function(){
    // 获取商品列表
    var that = this;
    wx.request({
      url: 'https://www.woxihuannia.top/php/goodsinfo.php',
      method: "GET",
      data: {
        status: '1'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        that.setData({
          allGoods: res.data,
          allGoodsNum: res.data.length,
        });
        that.getNextView();
      }

    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getGoods()
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 500);
  }

})