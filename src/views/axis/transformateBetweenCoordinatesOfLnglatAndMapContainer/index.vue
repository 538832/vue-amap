<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <span>请输入或点击地图获取经纬度：(经度,纬度)</span>
      <div class="input-item-prepend">
        <el-input size="small" placeholder="请输入内容" v-model="lnglat">
          <template slot="prepend">经 纬 度</template>
        </el-input>
      </div>
      <span>请输入容器像素坐标：(x,y)</span>
      <div class="input-item-prepend">
        <el-input size="small" placeholder="请输入内容" v-model="pixel">
          <template slot="prepend">容器坐标</template>
        </el-input>
      </div>
      <div class="input-item-btn">
        <el-button size="small" round @click="lnglat2container">经纬度 -> 容器像素坐标</el-button>
        <el-button size="small" round @click="container2lnglat">容器像素坐标 -> 经纬度</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        map: null,
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        lnglat: '116.611279,40.113257',
        pixel: '',
      }
    },
    mounted() {
      // 当浏览器被重置大小时执行
      window.onresize = () => {
        return (() => {
          this.windowHeight = document.documentElement.clientHeight;
        })()
      };
      //调用地图初始化方法
      this.initAMap()
    },
    methods: {
      initAMap() {
        let that = this;
        that.map = new AMap.Map('container', {
          zoom: 11,
        });
        that.map.on('click', function (e) {
          that.lnglat = e.lnglat.toString();
        });
        that.lnglat2container();
      },

      // 经纬度坐标转成容器像素坐标
      lnglat2container() {
        if (this.lnglat == '') return
        let inputVal = this.lnglat.split(',');
        let lnglat = new AMap.LngLat(inputVal[0], inputVal[1]);
        let pixel = this.map.lngLatToContainer(lnglat);
        this.pixel = pixel.round().toString();
      },

      // 容器像素坐标转成经纬度坐标
      container2lnglat() {
        if (this.pixel == '') return
        let inputVal = this.pixel.split(',');
        let pixel = new AMap.Pixel(inputVal[0], inputVal[1]);
        let lnglat = this.map.containerToLngLat(pixel);
        this.lnglat = lnglat.toString();
      }
    }
  }
</script>

<style scoped>
  #app-container {
    width: 100%;
    position: relative
  }

  #container {
    width: 100%;
    height: 100%;
  }

  .input-item {
    position: absolute;
    background: white;
    padding: 20px 20px;
    right: 30px;
    bottom: 30px;
  }

  .input-item .input-item-prepend {
    padding: 10px 0;

  }

  .input-item .input-item-btn {
    width: 200px;
    height: 50px;
    margin: 10px auto;
  }

  .input-item .input-item-btn .el-button {
    display: block;
    margin: 10px 0;
  }
</style>
