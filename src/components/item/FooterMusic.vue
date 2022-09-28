<template>
    <div class="footerMusic">
        <!-- 底部左边 -->
        <div class="footerLeft" @click="updateDetailShow">
            <img :src="playList[playListIndex].al.picUrl" alt="" />
            <div>
                <p>{{ playList[playListIndex].name }}</p>
                <span>横滑可以切换上下首噢</span>
            </div>
        </div>
        <!-- 底部右边 -->
        <div class="footerRight">
            <svg class="icon" aria-hidden="true" @click="play" v-if="isbtnShow">
                <use xlink:href="#icon-bofang"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="play" v-else>
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofanggedan"></use>
            </svg>
        </div>
        <!-- 获取音乐播放资源 -->
        <audio
            ref="audio"
            @timeupdate="updateTime"
            :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
        ></audio>
        <van-popup
            v-model:show="detailShow"
            position="bottom"
            :style="{ height: '100%', width: '100%' }"
        >
            <music-detail
                :musicPlaying="playList[playListIndex]"
                :play="play"
                :isbtnShow="isbtnShow"
                :addDuration="addDuration"
                :sliderValue="sliderValue"
                :audioStart="audioStart"
                :audioEnd="audioEnd"
                @child-event="updateAudio"
                :updateAudio="updateAudio"
            ></music-detail>
        </van-popup>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import MusicDetail from '@/components/item/MusicDetail.vue'
export default {
    components: {
        MusicDetail,
    },
    computed: {
        ...mapState(['playList', 'playListIndex', 'isbtnShow', 'detailShow', 'playAll']),
    },
    data() {
        return {
            interVal: 0,
            sliderValue: 0,
            audioStart: '00:00',
            audioEnd: '03:36',
        }
    },
    methods: {
        play: function (e) {
            if (this.$refs.audio.paused) {
                this.$refs.audio.play()
                this.updateIsbtnShow(false)
                this.updateTime(e)
            } else {
                this.$refs.audio.pause()
                this.updateIsbtnShow(true)
                clearInterval(this.interVal)
            }
        },
        updateTime: function (e) {
            this.interVal = setInterval(() => {
                this.updateCurrentTime(this.$refs.audio.currentTime)
            }, 200)
            this.updateTimeData(e)
        },
        addDuration() {
            this.updateDuration(this.$refs.audio.duration)
        },
        //计算歌曲总时长
        transTime(value) {
            var time = ''
            var h = parseInt(value / 3600)
            value %= 3600
            var m = parseInt(value / 60)
            m = m < 10 ? '0' + m : m
            var s = parseInt(value % 60)
            s = s < 10 ? '0' + s : s
            time = m + ':' + s
            return time
        },
        updateTimeData(e) {
            //更新进度条、当前播放时间和歌曲总时间
            var value = e.target.currentTime / e.target.duration
            // console.log(value)
            this.sliderValue = value * 100
            this.audioStart = this.transTime(e.target.currentTime)
            // console.log(e.target.duration)
            if (isNaN(e.target.duration)) return
            this.audioEnd = this.transTime(e.target.duration)
        },
        updateAudio(value) {
            // console.log('父组件',value)
            this.$refs.audio.currentTime = value
        },
        ...mapMutations([
            'updateIsbtnShow',
            'updateDetailShow',
            'updateCurrentTime',
            'updateDuration',
        ]),
    },
    watch: {
        playListIndex: function () {
            //监听到index发生变化的话，自动播放
            this.$refs.audio.autoplay = true
            this.updateIsbtnShow(false)
        },
        playList: function () {
            this.$refs.audio.autoplay = true
            this.updateIsbtnShow(false)
        },
        playAll() {
            setTimeout(() => {
                this.$refs.audio.autoplay = true
                // console.log("playAll")
                this.playMusic()
            }, 200)
        },
    },
    mounted() {
        this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
        // this.updateTime()
    },
    updated() {
        this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
        this.addDuration()
    },
}
</script>
<style lang="less" scoped>
.footerMusic {
    width: 100%;
    height: 1.4rem;
    position: fixed;
    z-index: 99;
    bottom: 0;
    background: #fff;
    border-top: 1px solid #999;
    display: flex;
    padding: 0.2rem;
    justify-content: space-between;
    .footerLeft {
        width: 65%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            //指定动画循环
            animation: rotation 8s linear infinite;
            //暂停动画
            animation-play-state: paused;
        }
        img.active {
            //运行动画
            animation-play-state: running;
        }
        @keyframes rotation {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        p {
            width: 3rem;
            font-weight: 700;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        span {
            color: #999;
            font-size: 0.24rem;
        }
    }
    .footerRight {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon {
            width: 0.6rem;
            height: 0.6rem;
        }
    }
    audio {
        position: absolute;
        z-index: 99;
    }
}
</style>
