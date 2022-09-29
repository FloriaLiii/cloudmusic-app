<template>
    <div class="search">
        <!-- 搜索头部 -->
        <div class="searchTop">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <input type="text" v-model="searchKey" @keydown.enter="enterKey" />
        </div>
        <!-- 搜索历史 -->
        <div class="searchHistory">
            <div class="top">
                <div class="history">历史搜索</div>
                <div v-if="deleteShow">
                    <span @click="delAllHistory" class="deleteAll">全部清空</span>
                    <span @click="updateDeleteShow" style="font-weight: 700">完成</span>
                </div>
                <svg class="icon" aria-hidden="true" v-else @click="updateDeleteShow">
                    <use xlink:href="#icon-delete"></use>
                </svg>
            </div>
            <div class="contentList">
                <div class="content" v-for="item in keyWordList" :key="item">
                    <svg
                        class="icon"
                        aria-hidden="true"
                        v-if="deleteShow"
                        @click="delHistory(item)"
                    >
                        <use xlink:href="#icon-cuowu"></use>
                    </svg>
                    <span @click="searchHistory(item)">
                        {{ item }}
                    </span>
                </div>
            </div>
        </div>
        <div
            class="musicListContent"
            v-for="(song, index) in searchMusicList"
            :key="index"
            @click="playMusic(index)"
        >
            <div class="musicList">
                <div class="listLeft">
                    <span class="index">{{ index + 1 }}</span>
                    <div class="content">
                        <p>{{ song.name }}</p>
                        <span v-for="(ar, index) in song.ar"
                            >{{ ar.name }} <span v-if="index + 1 < song.ar.length">/ </span></span
                        >
                    </div>
                </div>
                <div class="listRight">
                    <svg class="icon" aria-hidden="true" v-if="song.mv">
                        <use xlink:href="#icon-shipinbofang"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xuanxiang"></use>
                    </svg>
                </div>
            </div>
        </div>
        <div class="block"></div>
    </div>
</template>

<script>
import { getSearchMusic } from '@/request/api/home.js'
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            keyWordList: [],
            searchKey: '',
            searchMusicList: [],
            deleteShow: false,
        }
    },
    methods: {
        ...mapMutations(['updatePlayList', 'updatePlayListIndex', 'updatePlayAll']),
        enterKey: async function () {
            if (!this.searchKey) return
            this.keyWordList.unshift(this.searchKey)
            //去重
            this.keyWordList = [...new Set(this.keyWordList)]
            //固定长度
            if (this.keyWordList.length > 4) {
                this.keyWordList.pop()
            }
            localStorage.setItem('keyWordList', JSON.stringify(this.keyWordList))
            let res = await getSearchMusic(this.searchKey)
            console.log(res)
            this.searchMusicList = res.data.result.songs
            console.log(this.searchMusicList)
            this.searchKey = ''
        },
        deleteAll() {
            localStorage.removeItem('keyWordList')
            this.keyWordList = []
        },
        //删除的显示
        updateDeleteShow() {
            this.deleteShow = !this.deleteShow
        },
        //删除全部历史记录
        delAllHistory() {
            localStorage.removeItem('keyWordList')
            this.keyWordList = []
        },
        //删除指定历史记录
        delHistory(name) {
            //查找元素在该数组的位置
            Array.prototype.seek = function (val) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] == val) return i
                }
                return -1
            }
            //删除数组中的指定元素
            Array.prototype.deleteVal = function (val) {
                var index = this.seek(val)
                if (index > -1) {
                    this.splice(index, 1)
                }
            }
            this.keyWordList.deleteVal(name)
            localStorage.setItem('keyWordList', JSON.stringify(this.keyWordList))
        },
        //搜索历史
        searchHistory: async function (item) {
            this.searchKey = item
            this.enterKey()
        },
        //播放歌曲
        playMusic(index) {
            this.updatePlayList(this.searchMusicList)
            this.updatePlayListIndex(index)
            this.updatePlayAll()
        },
    },
    mounted() {
        this.keyWordList = JSON.parse(localStorage.getItem('keyWordList')) || []
    },
}
</script>

<style lang="less" scoped>
.search {
    // width: 100%;
    // height: 100%;
    .searchTop {
        width: 100%;
        height: 1rem;
        padding: 0 0.2rem;
        display: flex;
        align-items: center;
        input {
            width: 90%;
            margin-left: 0.2rem;
            padding: 0.1rem;
            border: none;
            border-bottom: 0.04rem solid #cfcfcf;
        }
    }
    .searchHistory {
        width: 100%;
        .top {
            width: 100%;
            height: 0.6rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 0.2rem;
            margin-bottom: 0.2rem;
            .history {
                font-weight: 700;
            }
            .deleteAll {
                margin-right: 0.2rem;
            }
        }
        .contentList {
            width: 100%;
            .content {
                position: relative;
                display: inline-block;
                .icon {
                    position: absolute;
                    width: 0.3rem;
                    height: 0.3rem;
                    background-color: rgba(185, 169, 169, 0.5);
                    border-radius: 0.4rem;
                    right: 0.1rem;
                    top: -0.1rem;
                }
                span {
                    padding: 0.1rem 0.2rem;
                    background-color: rgb(104 103 103 / 50%);
                    border-radius: 0.4rem;
                    margin: 0.4rem 0.2rem;
                    color: #fff;
                }
            }
        }
    }
    .musicListContent {
        width: 100%;
        background: #fff;
        margin-top: 0.2rem;
        .musicList {
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
                justify-content: end;
                align-items: center;
                position: relative;
                .icon {
                    z-index: 2;
                    fill: #999;
                }
                .liebiao {
                    position: absolute;
                    right: 0;
                }
            }
        }
        .musicList:hover {
            background: #ddd;
        }
        .block {
            width: 100%;
            height: 1.4rem;
        }
    }
}
</style>
