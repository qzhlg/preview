<template>
    <view class="address">
        <p>
            <span>北京</span><input type="text" focus placeholder="面试地址">
        </p>
    </view>
</template>
<script>
export default {
    // data(){
        
    // }
}
</script>
<style  scoped>
    .address{
        width: 100%;
        height: 100%;
    }
    p{
        height: 40px;
        border-bottom: .5px #ccc solid;
        display: flex;
    }
    span{
        flex: 3;
        text-align: center;
        line-height: 40px;
        border-right: .5px #ccc solid;
    }
    input{
        display: inline-block;
        height: 100%;
        flex: 7;
    }
</style>