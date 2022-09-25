<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>

        <div class="musicContent">
            <van-swipe :loop="false" :width="130" class="my-swipe" :show-indicators="false">
                <van-swipe-item v-for="(item, index) in state.musicList" :key="item">
                    <img :src="item.picUrl" alt="" />
                    <span class="playCount">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-erji2-copy"></use>
                        </svg>
                        <span>{{ changeCount(item.playCount) }}</span>
                    </span>
                    <span class="name">{{ item.name }}</span>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
import { getMusicList } from '@/request/api/home.js'
import { reactive, onMounted } from 'vue'
export default {
    setup() {
        const state = reactive({
            musicList: [],
        })

        onMounted(async () => {
            const res = await getMusicList()
            // console.log(res.data.result)
            state.musicList = res.data.result
        })

        function changeCount(num) {
            if (num > 100000000) {
                return (num / 100000000).toFixed(1) + '亿'
            } else if (num > 10000) {
                return (num / 10000).toFixed(1) + '万'
            }
        }

        return { state, changeCount }
    },
}
</script>

<style lang="less" scoped>
.musicList {
    width: 100%;
    height: 5rem;
    padding: 0.2rem;
    .musicTop {
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.2rem;
        .title {
            font-size: 0.4rem;
            font-weight: 900;
        }
        .more {
            border: 1px solid #ccc;
            text-align: center;
            line-height: 0.6rem;
            padding: 0 0.2rem;
            border-radius: 0.4rem;
        }
    }
    .musicContent {
        width: 100%;
        height: 4rem;
        .van-swipe-item {
            padding-right: 10px;
            height: 250px;
            box-sizing: border-box;
            position: relative;
            img {
                width: 100%;
                height: 2.4rem;
                border-radius: 20px;
            }
            .playCount {
                position: absolute;
                padding: 5px;
                right: 0.2rem;
                z-index: 99;
                color: #fff;
                font-size: 10px;
                background: #66636382;
                border-radius: 20px;
                .icon {
                    width: 0.3rem;
                    height: 0.3rem;
                    margin-right: 2px;
                    vertical-align: middle;
                }
                span {
                    vertical-align: middle;
                }
            }
            .name {
                display: block;
                width: 120px;
                height: 40px;
                line-height: 20px;
                font-size: 15px;
                text-align: left;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                word-wrap: break-word;
                word-break: break-all;
                white-space: normal;
            }
        }
    }
}
</style>
