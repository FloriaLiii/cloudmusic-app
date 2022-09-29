import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item'
export default createStore({
    state: {
        playList: [
            //播放列表
            {
                al: {
                    id: 89090040,
                    name: 'Love Songs: Chart and Oldies Romance',
                    pic: 109951164967359150,
                    picUrl: 'http://p4.music.126.net/QQ1KpP1pbE_hZ0itDsEmlA==/109951164967359158.jpg',
                    pic_str: '109951164967359158',
                },
                name: 'Levitating',
                id: 1446218812,
                ar: [{ name: 'Dua Lipa' }],
            },
        ],
        playListIndex: 0, //默认播放歌曲下标
        isbtnShow: true, //暂停按钮的显示
        detailShow: false, //歌曲详情页的显示
        lyricList: {}, //歌词部分
        currentTime: 0, //当前播放时间
        duration: 96, //歌曲总时长
        playAll: true, //值发生改变时播放全部
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
        updateDetailShow: function (state) {
            state.detailShow = !state.detailShow
        },
        //改变歌词
        updateLyric(state, value) {
            state.lyricList = value
        },
        //改变当前播放时间
        updateCurrentTime(state, value) {
            state.currentTime = value
            // console.log(state.currentTime)
        },
        updatePlayAll(state) {
            state.playAll = !state.playAll
            // console.log(state.playAll)
        },
        updateDuration(state, value) {
            state.duration = value
        },
    },
    actions: {
        getLyric: async function (context, value) {
            let res = await getMusicLyric(value)
            context.commit('updateLyric', res.data.lrc)
            // console.log('Lyric', res)
        },
    },
    modules: {},
})
