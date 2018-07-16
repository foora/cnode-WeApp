const config = require('../../config.js');
const util = require('../../utils/util.js');
const app = getApp();

Page({
    data: {
        tabsArray: config.tabs, // tab列表
        currentTab: 'all', // 目前的tab
        activeTipsLeft: 250, // tab下的选中标示位置
        listData: [], // 当前数据列表
        page: 0, // 数据取到第几页
        limit: 20, // 每次取数据的条数
        isPullDown: false, // 是否处于下拉刷新状态
        currentReq: null // 当前的请求,用于瞬间切换多个tab时中断前面的请求
    },
    onLoad: function () {
        // 初始加载完后获取一次数据
        this.getListData();
    },
    onPullDownRefresh: function () {
        // 下拉刷新先去掉所有数据重新取一次数据
        this.setData({
            listData: [],
            page: 0,
            isPullDown: true
        });
        wx.stopPullDownRefresh(); // 让页面停止下拉刷新，页面回弹
        this.getListData();
    },
    onReachBottom: function () {
        if (this.data.isPullDown) return; // 下拉刷新的时候页面会回弹，不做限制可能会触发这个触底回调，导致同一时间获取两次数据，如果触底的先返回，会出现乱序问题
        this.getListData();
    },
    navTap(e) {
        // 导航栏监听事件
        let kind = e.target.dataset.kind;
        if (kind === 'menu') {
            // 打开侧边栏菜单
            console.log('openMenu');
        } else if (kind != null && this.data.currentTab !== kind) {
            // 切换tab，去掉所有数据，取一次新tab的数据
            this.setData({
                currentTab: kind,
                activeTipsLeft: e.target.offsetLeft * 2,
                listData: [],
                page: 0
            });
            this.getListData();
        }
    },
    getListData() {
        // 每次请求数据都请求当前页数的下一页数据
        let data = {
            page: this.data.page + 1,
            limit: this.data.limit,
            tab: this.data.currentTab
        };

        let options = {
            url: config.api.getTabContent,
            method: 'GET',
            data: data,
            success: (res) => {
                wx.hideLoading();
                if (res.statusCode === 200 && res.data.success === true) {
                    // 获取到数据后加到原本的数据数据listData中
                    let newListData = this.data.listData.concat(res.data.data.map((value) => {
                        value.last_reply_at = util.formatTopicsDate(value.last_reply_at);
                        return value;
                    }));
                    this.setData({ listData: newListData, isPullDown: false, page: this.data.page + 1 });
                }
            },
            complete: () => {
                this.setData({ currentReq: null });
            }
        }
        wx.showLoading({
            title: 'Loading',
        })
        if (this.data.currentReq) {
            this.data.currentReq.abort();
        }
        return this.setData({ currentReq: wx.request(options) });
    }
})
