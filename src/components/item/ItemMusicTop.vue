<template>
    <div class="itemMusicTop">
        <img :src="playList.coverImgUrl" alt="" class="bgImg" />
        <div class="itemLeft">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <span>歌单</span>
        </div>

        <div class="itemRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-chazhao-copy"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-31liebiao"></use>
            </svg>
        </div>
    </div>

    <div class="itemTopContent">
        <div class="contentLeft">
            <img :src="playList.coverImgUrl" alt="" />
            <span class="playCount">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-erji2-copy"></use>
                </svg>
                <span> {{ changeCount(playList.playCount) }}</span>
            </span>
        </div>

        <div class="contentRight">
            <p class="rightP_one"></p>
            <div class="right_img">
                <img :src="playList.creator.avatarUrl" alt="" />
                <span>{{ playList.creator.nickname }}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-right"></use>
                </svg>
            </div>
            <div class="rightP_two">
                <p>{{ playList.description }}</p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-right"></use>
                </svg>
            </div>
        </div>
    </div>

    <div class="itemTopNav">
        <div class="navItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiaoxi1"></use>
            </svg>
            <span>{{ playList.commentCount }}</span>
        </div>
        <div class="navItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
            <span>{{ playList.shareCount }}</span>
        </div>
        <div class="navItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiazai1"></use>
            </svg>
            <span>下载</span>
        </div>
        <div class="navItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-duoxuan"></use>
            </svg>
            <span>多选</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['playList'],

    setup(props) {
        // props.playList.creator = ''
        console.log(props, 111)
        if ((props.playList.creator = '')) {
            props.playList.creator = JSON.parse(sessionStorage.getItem().playList).creator
        }
        function changeCount(num) {
            if (num >= 100000000) {
                return (num / 100000000).toFixed(1) + '亿'
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万'
            }
        }
        return {
            changeCount,
        }
    },
}
</script>

<style lang="less" scoped>
.itemMusicTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .itemLeft,
    .itemRight {
        width: 25%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 0.2rem;
        span {
            font-size: 0.4rem;
            color: #fff;
        }
        .icon {
            fill: #fff; //填充颜色
        }
    }
    .bgImg {
        width: 100%;
        position: absolute;
        top: 0;
        z-index: -1;
        filter: blur(30px);
    }
}

.itemTopContent {
    width: 100%;
    height: 3rem;
    padding: 0.2rem;
    margin-top: 0.4rem;
    display: flex;
    justify-content: space-between;
    .contentLeft {
        width: 2.6rem;
        height: 2.6rem;
        position: relative;
        margin-right: 0.2rem;
        img {
            width: 2.6rem;
            height: 2.6rem;
            border-radius: 0.4rem;
        }
        .playCount {
            position: absolute;
            padding: 0.1rem;
            right: 0;
            bottom: 0;
            z-index: 99;
            color: #fff;
            font-size: 0.2rem;
            background: #666;
            border-radius: 0.4rem;
            .icon {
                width: 0.2rem;
                height: 0.2rem;
                margin-right: 0.04rem;
                vertical-align: middle;
            }
            span {
                vertical-align: middle;
            }
        }
    }
    .contentRight {
        width: 60%;
        height: 2.6rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .rightP_one {
            font-size: 0.3rem;
            font-weight: 900;
            color: #fff;
        }
        .right_img,
        .rightP_two {
            width: 100%;
            color: #eee;
            .icon {
                fill: #eee;
            }
        }
        .right_img {
            height: 0.6rem;
            img {
                width: 0.6rem;
                height: 0.6rem;
                border-radius: 50%;
                vertical-align: middle;
            }
            span {
                padding: 0.1rem;
            }
            .icon {
                width: 0.26rem;
                height: 0.26rem;
                margin-top: -0.08rem;
                vertical-align: middle;
            }
        }
        .rightP_two {
            height: 0.6rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            p {
                display: block;
                width: 95%;
                height: 100%;
                font-size: 0.24rem;
                overflow: hidden;
            }
            .icon {
                width: 0.24rem;
                height: 0.24rem;
            }
        }
    }
}

.itemTopNav {
    width: 100%;
    height: 1.4rem;
    display: flex;
    justify-content: space-around;
    margin-top: 0.2rem;
    .navItem {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
        .icon {
            height: 45%;
            fill: #fff;
        }
        span {
            display: block;
            height: 0.4rem;
            margin-top: 0.1rem;
        }
    }
}
</style>
