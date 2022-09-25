<template>
    <div class="iconList">
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-rili"></use>
            </svg>
            <span>每日推荐</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shouyinji"></use>
            </svg>
            <span>私人FM</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yinlegedan-"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shujupaihangbang"></use>
            </svg>
            <span>排行榜</span>
        </div>
    </div>
</template>

<style lang="less" scoped>
.iconList {
    width: 100%;
    height: 1.5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 0.2rem;
    .iconItem {
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
            width: 0.7rem;
            height: 0.7rem;
        }
    }
}
</style>
