<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-card">
      <label style='color:grey'>地理编码，根据地址获取经纬度坐标</label>
      <div class="input-item">
        <el-input placeholder="请输入内容" size="mini" @keydown.enter.native="geo" v-model="address">
          <template slot="prepend">地址</template>
        </el-input>
      </div>
      <div class="input-item">
        <el-input placeholder="请输入内容" disabled size="mini" v-model="lnglat">
          <template slot="prepend">经纬度</template>
        </el-input>
      </div>
      <div class="btn">
        <el-button round size="mini" @click="geoCode">地址 -> 经纬度</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        map: null,
        geocoder: null,
        address: '北京市朝阳区阜荣街10号',
        lnglat: ''
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
        that.map = new AMap.Map("container", {
          resizeEnable: true
        });
      },

      geo(e) {
        //e.keyCode是回车 这里也可以省去判断 因为上面的 @keydown.enter.native 已经判断了
        if (e.keyCode === 13) {
          this.geoCode();
          return false;
        }
        return true;
      },

      geoCode() {
        let that = this;
        let geocoder = new AMap.Geocoder({
          city: "010", //城市设为北京，默认：“全国”
        });
        var marker = new AMap.Marker();
        geocoder.getLocation(that.address, function (status, result) {
          if (status === 'complete' && result.geocodes.length) {
            var lnglat = result.geocodes[0].location
            that.lnglat = lnglat.lng + ',' + lnglat.lat;
            marker.setPosition(lnglat);
            that.map.add(marker);
            that.map.setFitView(marker);
          } else {
            that.$message.error('根据地址查询位置失败');
          }
        });
      }
    }
  }
</script>

<style scoped>
  #app-container {
    width: 100%;
    position: relative;
  }

  #container {
    width: 100%;
    height: 100%;
  }

  .input-card {
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    bottom: 30px;
    right: 30px;
    padding: 10px;
  }

  .input-card .input-item {
    margin: 10px;
  }

  .input-card .btn {
    text-align: center;
  }
</style>
