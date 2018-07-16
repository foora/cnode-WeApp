const host = 'https://cnodejs.org/api/v1'; // api路径

exports.api = {
    getTabContent: host + '/topics',
    getTopicContent: host + '/topic',
};

exports.tabs = [
    {
        name: '全部',
        code: 'all'
    },
    {
        name: '精华',
        code: 'good'
    },
    {
        name: '分享',
        code: 'share'
    },
    {
        name: '问答',
        code: 'ask'
    },
    {
        name: '招聘',
        code: 'job'
    }
]
