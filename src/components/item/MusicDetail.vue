<template>
    <div class="musicDetail">
        <img :src="musicPlaying.al.picUrl" alt="" class="bgImg" />
        <!-- 歌曲详情头部 -->
        <div class="detailTop">
            <div class="left">
                <svg class="icon" aria-hidden="true" @click="updateDetailShow">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
            </div>
            <div class="center">
                <Vue3Marquee>
                    {{ musicPlaying.name }}
                </Vue3Marquee>
                <span v-for="(ar, index) in musicPlaying.ar" :key="index">
                    {{ ar.name }} &nbsp</span
                >
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-right"></use>
                </svg>
            </div>
            <div class="right">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-share"></use>
                </svg>
            </div>
        </div>
        <!-- 歌曲详情中间 -->
        <div class="detailCenter" v-show="isImageShow" @click="isImageShow = !isImageShow">
            <img
                src="@/assets/needle-ab.png"
                alt=""
                class="img_needle"
                :class="{ img_needle_active: !isbtnShow }"
            />
            <img src="@/assets/circle.png" alt="" class="img_circle" />
            <img
                :src="musicPlaying.al.picUrl"
                alt=""
                class="img_ar"
                :class="{ img_ar_active: !isbtnShow, img_ar_paused: isbtnShow }"
            />
            <div class="imgLyric">
                <p></p>
            </div>
        </div>
        <!-- 歌词 -->
        <div
            class="musicLyric"
            ref="Lyric"
            v-show="!isImageShow"
            @click="isImageShow = !isImageShow"
        >
            <p
                v-for="(item, index) in lyric"
                :key="index"
                :class="{
                    active_2: currentTime * 1000 >= item.time && currentTime * 1000 < item.after,
                }"
            >
                {{ item.lrc }}
            </p>
        </div>
        <!-- 歌曲详情底部 -->
        <div class="detailBottom">
            <div class="top">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-like"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai1"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yinlechangpian"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-message_light"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xuanxiang"></use>
                </svg>
            </div>
            <div class="center">
                <span class="timers">{{ audioStart }}</span>
                <van-slider
                    class="slider"
                    v-model="sliderValue"
                    ref="slider"
                    @click="clickSlider"
                    button-size="8px"
                    active-color="#fff"
                    inactive-color="#cfcfcf"
                />
                <!-- <input type="range" min="0" max="100" step="0.05" v-model="sliderValue" @change="clickSlider"> -->
                <span class="timers">{{ audioEnd }}</span>
            </div>
            <div class="bottom">
                <svg class="icon normalSize" aria-hidden="true">
                    <use xlink:href="#icon-shuaxin"></use>
                </svg>
                <svg class="icon normalSize" aria-hidden="true" @click="updateMusic(-1)">
                    <use xlink:href="#icon-icon-1"></use>
                </svg>
                <svg class="icon play" aria-hidden="true" @click="play" v-if="isbtnShow">
                    <use xlink:href="#icon-bofang2"></use>
                </svg>
                <svg class="icon play" aria-hidden="true" @click="play" v-else>
                    <use xlink:href="#icon-zanting2-copy"></use>
                </svg>
                <svg class="icon normalSize" aria-hidden="true" @click="updateMusic(+1)">
                    <use xlink:href="#icon-icon-"></use>
                </svg>
                <svg class="icon normalSize" aria-hidden="true">
                    <use xlink:href="#icon-musiclist"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations, mapState } from 'vuex'
import { ref } from 'vue'
export default {
    props: [
        'musicPlaying',
        'play',
        'isbtnShow',
        'sliderValue',
        'audioStart',
        'audioEnd',
        'addDuration',
    ],
    components: {
        Vue3Marquee,
    },
    setup(props, context) {
        let isImageShow = ref(true)
        let totalTime = ref(96)
        return {
            isImageShow,
            totalTime,
        }
    },
    methods: {
        ...mapMutations(['updateDetailShow', 'updatePlayListIndex']),
        //切换歌曲(上一首/下一首)
        updateMusic(num) {
            let index = this.playListIndex + num
            if (index < 0) {
                index = this.playList.length - 1
            } else if (index == this.playList.length) {
                index = 0
            }
            this.updatePlayListIndex(index)
            this.play()
        },
        //改变歌曲总时间
        dateTotalTime(audioEnd) {
            let min = audioEnd.slice(0, 2)
            let sec = audioEnd.slice(3, 6)
            this.totalTime = parseInt(min) * 60 + parseInt(sec)
            // console.log(this)
        },
        //改变歌曲进度
        clickSlider() {
            // console.log([this.$refs.slider])
            // console.log('end', this.audioEnd)
            // console.log('dur', this.totalTime)
            var num = (this.sliderValue / 100) * this.totalTime
            if (isNaN(num)) return

            this.$emit('child-event', num)
        },
    },
    computed: {
        ...mapState(['lyricList', 'currentTime', 'playListIndex', 'playList', 'duration']),
        lyric() {
            let arr
            if (this.lyricList.lyric) {
                arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
                    let min = item.slice(item.indexOf('[') + 1, item.indexOf(':'))
                    let sec = item.slice(item.indexOf(':') + 1, item.indexOf('.'))
                    let mill = item.slice(item.indexOf('.') + 1, item.indexOf(']'))
                    let lrc = item.slice(item.indexOf(']') + 1, item.length).trim()
                    let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
                    return { min, sec, mill, lrc, time }
                })
                // if (isNaN(Number(mill))) {
                //     mill = item.slice(7, 9)
                //     lrc = item.slice(10, item.length)
                //     time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
                // }
                arr.forEach((item, i) => {
                    if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
                        item.after = 100000000
                    } else {
                        item.after = arr[i + 1].time
                    }
                })
            }
            // console.log(arr)
            return arr
        },
    },
    watch: {
        currentTime(newValue) {
            // let p_1 = document.querySelector('p.active_1')
            let p_2 = document.querySelector('p.active_2')
            // console.log([p_2])
            //正在唱的那一句歌词的位置
            // if (p_1) {
            //     if (p_1.offsetTop > this.$refs.imgLyric.clientHeight / 2) {
            //         this.$refs.imgLyric.scrollTop =
            //             p_1.offsetTop - this.$refs.imgLyric.clientHeight / 2.4
            //     }
            // }
            if (p_2) {
                if (p_2.offsetTop > this.$refs.Lyric.clientHeight / 2) {
                    this.$refs.Lyric.scrollTop = p_2.offsetTop - this.$refs.Lyric.clientHeight / 1.4
                }
            }
            // console.log([this.$refs.Lyric.clientHeight])
            //循环播放
            if (newValue === this.duration) {
                this.updateMusic(1)
                if (this.playListIndex === this.playList.length - 1) {
                    this.updatePlayListIndex(0)
                    this.play()
                } else {
                    this.updatePlayListIndex(this.playListIndex + 1)
                }
            }
            this.dateTotalTime(this.audioEnd)
        },
    },
    mounted() {
        this.addDuration()
    },
}
</script>

<style lang="less" scoped>
.musicDetail {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .bgImg {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
        filter: blur(50px);
    }
    .detailTop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.2rem 0.2rem 0.2rem;
        color: #fff;
        margin-top: 5%;
        height: 10%;
        .icon {
            width: 0.6rem;
            height: 0.6rem;
            fill: #fff;
        }
        .center {
            width: 67%;
            .vue3-marquee {
                width: 2rem;
                font-size: 0.36rem;
            }
            span {
                font-size: 0.28rem;
            }
            .icon {
                width: 0.2rem;
                height: 0.2rem;
                fill: #fff;
            }
        }
    }
    .detailCenter {
        width: 100%;
        height: 66%;
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: center;
        .img_needle {
            width: 2rem;
            height: 3rem;
            position: absolute;
            left: 46%;
            transform-origin: 0 0;
            transform: rotate(-13deg);
            transition: all 2s;
            z-index: 1;
        }
        .img_needle_active {
            width: 2rem;
            height: 3rem;
            position: absolute;
            left: 46%;
            transform-origin: 0 0;
            transform: rotate(0deg);
            transition: all 2s;
            z-index: 1;
        }
        .img_circle {
            width: 5rem;
            height: 5rem;
            position: absolute;
            bottom: 2.3rem;
            z-index: -1;
        }

        .img_ar {
            width: 3.2rem;
            height: 3.2rem;
            border-radius: 50%;
            position: absolute;
            bottom: 3.14rem;
            animation: rotate_ar 12s linear infinite;
        }

        .img_ar_active {
            animation-play-state: running;
        }

        .img_ar_paused {
            animation-play-state: paused;
        }

        @keyframes rotate_ar {
            from {
                transform: rotateZ(0deg);
            }
            to {
                transform: rotateZ(360deg);
            }
        }
        .imgLyric {
            width: 100%;
            height: 30%;
            overflow: scroll;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: absolute;
            bottom: 0;
            p {
                text-align: center;
                color: #cfcec7;
                margin-bottom: 0.3rem;
                transition: color 0.5s linear;
            }
            p.active_1 {
                color: rgb(244, 163, 49);
                font-size: 0.4rem;
            }
            //隐藏滚动条
            scrollbar-width: none; /* firefox */
            -ms-overflow-style: none; /* IE 10+ */
        }
        //隐藏滚动条
        .imgLyric::-webkit-scrollbar {
            display: none; /* Chrome Safari */
        }
    }
    .musicLyric {
        width: 100%;
        height: 60%;
        margin-top: 0.3rem;
        overflow: scroll;
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
            text-align: center;
            color: #cfcece;
            margin-bottom: 0.3rem;
            transition: color 0.5s linear;
        }
        p.active_2 {
            color: #fff;
            font-size: 0.4rem;
        }
        //隐藏滚动条
        scrollbar-width: none; /* firefox */
        -ms-overflow-style: none; /* IE 10+ */
    }
    //隐藏滚动条
    .Lyric::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }
    .detailBottom {
        width: 100%;
        height: 22%;
        margin-bottom: 5%;
        bottom: 0;
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .icon {
            fill: #fff;
        }
        .top,
        .bottom {
            width: 100%;
            height: 40%;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        .top {
            .xin,
            .cd,
            .genduo {
                width: 0.56rem;
                height: 0.56rem;
            }
        }
        .center {
            width: 100%;
            height: 20%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .slider {
                width: 70%;
            }
            // input{
            //     width: 70%;
            // }
            .timers {
                width: 10%;
                color: #fff;
                font-size: 0.2rem;
            }
        }
        .center > * {
            transition: none !important;
        }
        .bottom {
            .normalSize {
                width: 0.56rem;
                height: 0.56rem;
            }
            .play {
                width: 1rem;
                height: 1rem;
            }
        }
    }
}
</style>
