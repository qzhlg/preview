<template>
    <div class="clock">
        <smap class="map"></smap>
        <button class="clock_btn">打卡</button>
    </div>
</template>
<script>
import smap from '../../components/smap'
export default {
    name:'smap' ,
    components:{
        smap
    },
    data(){
        return{
            
        }
    },
   
    onShow(){
        console.log(this)
    }
}
</script>
<style scoped>
.clock{
    width: 100%;
    height: 100%;
}
.map{
    width: 100%;
    height: 100%;
}
.clock_btn{
    width: 100%;
    background: #000;
    color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
}
</style>