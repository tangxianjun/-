// pages/result/result.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        code: 0,
        searchWord: "",
        goods_left: [],
        goods_right: [],
        //  自制懒加载！
        // goodsNum:第一页显示的商品数量（也是后面显示的总商品数量）
        // goodsOnceAdd：每次滑到底后增加的商品数量
        // allGoods:所有商品的json
        // leftNum:左边的商品数量
        // rightNum:右边的商品数量
        goodsNum: 0,
        goodsOnceAdd: 5,
        allGoods: [],
        leftNum: 0,
        rightNum: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
          searchWord:options.data
        })
        var that = this;
        var data = options.data
        wx.request({
          url: 'https://market.sky31.com/php/goodsinfo.php',
            method: "GET",
            data: {
                search: data
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
                console.log(res.data);
                if(res.data.code != 1) {
                    // 获取到了商品
                    that.setData({
                        code: res.data.code,
                        allGoods: res.data.message,
                    })
                    // 加载
                    var num;
                    let isLoad = true;
                    console.log(that.data);
                    // 先判断还能不能加
                    // 如果总数比现在数量+添加一次数量还多或者相等，自然是直接加载这么多
                    if (that.data.allGoods.length >= that.data.goodsNum + that.data.goodsOnceAdd) {
                        num = that.data.goodsNum + that.data.goodsOnceAdd
                    } else if (that.data.allGoods.length > that.data.goodsNum) {
                        // 如果不比加上一次的多，但是确实还没显示完，那就显示完
                        num = that.data.allGoods.length;
                    } else {
                        // 如果已经加载完了，那就不需要调用后面的函数了
                        isLoad = false;
                    }
                    console.log(num);
                    if (isLoad) {
                        that.setData({
                            goodsNum: num,
                        })
                        console.log(that.data.goodsNum);
                        that.getNextView();
                    }
                } else {
                    // 没有商品
                    that.setData({
                        code: res.data.code,
                    })
                }
                
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

    },
    // 懒加载/分left和right
    getNextView: function () {
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
        for (; i <= needNum - 1; i++) {
            leftHeight = leftNumNow * 460.2;
            rightHeight = rightNumNow * 578.2;
            // 左边小于等于右边的时候，加载在左边
            if (leftHeight <= rightHeight) {
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
    // 到底往下滑
    onReachBottom: function () {
        var that = this;
        let num;
        let isLoad = true;
        // 先判断还能不能加
        // 如果总数比现在数量+添加一次数量还多或者相等，自然是直接加载这么多
        if (that.data.allGoods.length >= that.data.goodsNum + that.data.goodsOnceAdd) {
            num = that.data.goodsNum + that.data.goodsOnceAdd
        } else if (that.data.allGoods.length > that.data.goodsNum) {
            // 如果不比加上一次的多，但是确实还没显示完，那就显示完
            num = that.data.allGoodsNum;
        } else {
            // 如果已经加载完了，那就不需要调用后面的函数了
            isLoad = false;
        }
        // console.log(that.data.allGoodsNum + " " + that.data.goodsNum + " " + that.data.goodsOnceAdd);
        if (isLoad) {
            that.setData({
                goodsNum: num,
            })
            console.log(that.data.goodsNum);
            that.getNextView();
        }
    },
    /**
  * 点击某视窗进入详情页
  */
    goods_detail: function (e) {
        console.log("打开了" + e.currentTarget.dataset['index'] + "号商品的详情页");
        var index = e.currentTarget.dataset['index'];
        console.log(index);
        wx.getStorage({
            key: 'token',
            success(res) {
                // console.log(res.data)
                wx.navigateTo({
                    url: '../details/details?data=' + index,
                })
            },
            fail: (res) => {
                wx.navigateTo({
                    url: '../login/login?data=请先登录',
                })
            }
        })

    },

})