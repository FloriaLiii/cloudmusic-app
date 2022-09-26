import { createStore } from 'vuex'

export default createStore({
    state: {
        playList: [
            //播放列表
            {
                al: {
                    id: 35829532,
                    name: 'Havana',
                    pic: 18425615858527510,
                    picUrl: 'http://p4.music.126.net/zUp6BqKPn1lmZINHsVDoew==/18425615858527510.jpg',
                    pic_str: '18425615858527510',
                },
                id: 494865824,
            },
        ],
        playListIndex: 0, //默认播放歌曲下标
        isbtnShow: true, //暂停按钮的显示
    },
    getters: {},
    mutations: {
        updateIsbtnShow: function (state, value) {
            state.isbtnShow = value
        },
        updatePlayList: function (state, value) {
            state.playList = value
        },
        updatePlayListIndex: function (state, value) {
            state.playListIndex = value
        },
    },
    actions: {},
    modules: {},
})
