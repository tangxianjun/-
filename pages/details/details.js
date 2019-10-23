// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      nickname: "Slight_",
      gread: "大三",
      dorm: "金翰林",
      attestation: "未认证",
      goods_picture: ["", "","","",""],
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
        let resData = res.data;
          let goods_picture = [];
        //   for(let i=0;i<=5;i++) {
        //       if (resData.pic1_path !== null) {

        //       }
        //   }
          goods_picture[0] = resData.pic1_path;
          goods_picture[1] = resData.pic2_path;
          goods_picture[2] = resData.pic3_path;
          goods_picture[3] = resData.pic4_path;
          goods_picture[4] = resData.pic5_path;
          goods_picture[5] = resData.pic6_path;
        that.setData({
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