<template>
    <div class="footerMusic">
        <!-- 底部左边 -->
        <div class="footerLeft">
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
            :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
        ></audio>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    computed: {
        ...mapState(['playList', 'playListIndex', 'isbtnShow']),
    },
    methods: {
        play: function () {
            if (this.$refs.audio.paused) {
                this.$refs.audio.play()
                this.updateIsbtnShow(false)
            } else {
                this.$refs.audio.pause()
                this.updateIsbtnShow(true)
            }
        },
        ...mapMutations(['updateIsbtnShow']),
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
