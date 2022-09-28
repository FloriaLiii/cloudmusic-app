<template>
    <div class="search">
        <div class="searchTop">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <input type="text" />
        </div>
        <div class="searchHistory">
            <div class="top">
                <div class="history">历史搜索</div>
                <div><span></span><span></span></div>
            </div>
            <div class="contentList"></div>
        </div>
    </div>
</template>

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
                    background-color: rgba(185, 169, 169, 0.5);
                    border-radius: 0.4rem;
                    margin: 0.4rem 0.2rem;
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
                align-items: center;
                position: relative;
                .icon {
                    position: absolute;
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
