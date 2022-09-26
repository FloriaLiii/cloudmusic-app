<template>
    <div class="itemMusicList">
        <!-- 歌单头部 -->
        <div class="itemListTop">
            <!-- 头部左边 -->
            <div class="listLeft" @click="playMusic">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang1"></use>
                </svg>
                <span
                    >播放全部<span>(共{{ songsList.length }}首歌)</span></span
                >
            </div>
            <!-- 头部右边 -->
            <div class="listRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiahao1"></use>
                </svg>
                <span>收藏({{ subscribedCount }})</span>
            </div>
        </div>
        <!-- 歌曲详情信息 -->
        <div class="itemListContent">
            <!-- 每首歌样式 -->
            <div class="itemList" v-for="(song, i) in songsList" :key="i">
                <!-- 每首歌左边 -->
                <div class="listLeft" @click="playMusic(i)">
                    <span class="index">{{ i + 1 }}</span>
                    <div class="content">
                        <p>{{ song.name }}</p>
                        <span v-for="(ar, index) in song.ar" :key="index">
                            {{ ar.name }}
                            <span v-if="index + 1 < song.ar.length">/ </span>
                        </span>
                        <span> - {{ song.al.name }}</span>
                    </div>
                </div>
                <!-- 每首歌右边 -->
                <div class="listRight">
                    <svg class="icon" aria-hidden="true" v-if="song.mv">
                        <use xlink:href="#icon-shipinbofang"></use>
                    </svg>

                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xuanxiang"></use>
                    </svg>
                </div>
            </div>
            <div class="block"></div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    props: ['songsList', 'subscribedCount'],
    methods: {
        playMusic: function (i) {
            this.updatePlayList(this.songsList)
            this.updatePlayListIndex(i)
        },
        ...mapMutations(['updatePlayList', 'updatePlayListIndex']),
    },
}
</script>

<style lang="less" scoped>
.itemMusicList {
    width: 100%;
    height: 11rem;
    background: #fff;

    border-radius: 0.4rem 0.4rem 0 0;
    .itemListTop {
        width: 100%;
        height: 1.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.2rem;
        padding-top: 0.2rem;
        .listLeft {
            width: 3rem;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .icon {
                width: 0.55rem;
                height: 0.55rem;
                stroke: #333333;
                stroke-width: 20;
            }
            span {
                font-weight: 700;
                span {
                    font-weight: 400;
                    font-size: 0.24rem;
                    color: #999;
                }
            }
        }
        .listRight {
            display: flex;
            align-items: center;
            background: red;
            padding: 0.1rem;
            border-radius: 0.4rem;
            color: #fff;
            .icon {
                width: 0.5rem;
                height: 0.5rem;
                margin-right: 0.1rem;
                fill: white;
            }
        }
    }
    .itemListContent {
        width: 100%;
        background: #fff;
        .itemList {
            width: 100%;
            height: 1.4rem;
            padding: 0 0.2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .listLeft {
                width: 80%;
                height: 100%;
                display: flex;
                align-items: center;
                .index {
                    display: inline-block;
                    width: 0.2rem;
                    text-align: center;
                }
                .content {
                    p {
                        width: 4.54rem;
                        height: 0.4rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-weight: 700;
                    }
                    span {
                        font-weight: 400;
                        font-size: 0.24rem;
                        color: #999;
                    }
                    margin-left: 0.3rem;
                }
            }
            .listRight {
                width: 20%;
                height: 100%;
                display: flex;
                align-items: center;
                position: relative;
                justify-content: end;
                .icon {
                    position: relative;
                    z-index: 2;
                    fill: #999;
                }
                .liebiao {
                    position: absolute;
                    right: 0;
                }
            }
        }
        .itemList:hover {
            background: #ddd;
        }
    }
    .block {
        width: 100%;
        height: 1.4rem;
    }
}
</style>
