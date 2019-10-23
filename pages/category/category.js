// pages/category/category.js
Page({

    /**
     * 页面的初始数据
     * type: 当前选择的类目
     * typeList: 所有类目的名字
     * typeImgUrl: 所有类目的顶部banner
     * typeCategory: 类目的分类
     */
    data: {
        data: '',
        type: "未选择",
        typeNum: -1,
        typeList: ["图书教材", "数码产品", "衣物鞋帽", "生活用品", "家用电器", "美妆日化"],
        typeImgUrl: ["image/kano.jpg", "image/kano.jpg", "image/kano.jpg", "image/kano.jpg", "image/kano.jpg", "image/kano.jpg"],
        typeCategory: [{
                title: "图书教材",
                category: ["全部", "教材", "考试", "畅销书", "经典"],
            },
            {
                title: "数码产品",
                category: ["全部", "护肤", "美妆", "洗护", "大牌"],
            },
            {
                title: "衣物鞋帽",
                category: ["全部", "上装", "裤装", "鞋履", "配饰"],
            },
            {
                title: "生活用品",
                category: ["全部", "手机", "电脑", "相机", "其它"],
            },
            {
                title: "家用电器",
                category: ["全部", "收纳", "雨伞", "洗晒", "清洁"],
            },
            {
                title: "美妆日化",
                category: ["全部", "厨具", "电暖气", "电冷器", "照明"],
            }
        ],
        allGoods: [],
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
        // 搜索框
        searchText: "",
        searchTextDisplay: "flex",
        searchClearDisplay: "none",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options.data);
        var that = this;
        let i;
        let typeList = this.data.typeList;
        for (i = 0; i < typeList.length; i++) {
            if (typeList[i] === options.data) {
                break;
            }
        }
        this.setData({
            type: options.data,
            typeNum: i,
        })
        //获取本地的token数据
        wx.request({
            url: 'https://www.woxihuannia.top/php/goodsinfo.php',
            method: "GET",
            data: {
                category: options.data
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function(res) {
                console.log(res.data)
                that.setData({
                    allGoods: res.data.message,
                })
                // 加载
                var num;
                let isLoad = true;
                // 先判断还能不能加
                // 如果总数比现在数量+添加一次数量还多或者相等，自然是直接加载这么多
                if (that.data.allGoods.length >= that.data.goodsNum + that.data.goodsOnceAdd) {
                    num = that.data.allGoods.length + that.data.goodsOnceAdd
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
            }

        })
        

    },
    // 懒加载/分left和right
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
                    url: '../details/details?data' + index,
                })
            },
            fail: (res) => {
                wx.navigateTo({
                    url: '../login/login',
                })
            }
        })

    },
    // 到底往下滑
    onReachBottom: function () {
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
        if (isLoad) {
            that.setData({
                goodsNum: num,
            })
            console.log(that.data.goodsNum);
            that.getNextView();
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
    /**
     * 清除输入框内容
     */
    searchClear: function() {
        this.setData({
            searchText: "",
            searchTextDisplay: "flex",
            searchClearDisplay: "none",
        })
    },
    /**
     * 输入框输入内容
     */
    searchDetail: function(e) {
        this.setData({
            searchText: e.detail.value
        })
        // 如果输入后框内有文字，就去掉那个提示文字
        if (e.detail.value !== "") {
            this.setData({
                searchTextDisplay: "none",
                searchClearDisplay: "block",
            })
        } else {
            this.setData({
                searchTextDisplay: "flex",
                searchClearDisplay: "none",
            })
        }
    }
})