<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class='info'>输入或点击地图获取经纬度。</div>
    <div class="input-card">
      <label style='color:grey'>逆地理编码，根据经纬度获取地址信息</label>
      <div class="input-item">
        <el-input placeholder="请输入内容" size="mini" @keydown.enter.native="regeo" v-model="lnglat">
          <template slot="prepend">经纬度</template>
        </el-input>
      </div>
      <div class="input-item">
        <el-input placeholder="请输入内容" disabled size="mini" v-model="address">
          <template slot="prepend">地址</template>
        </el-input>
      </div>
      <div class="btn">
        <el-button round size="mini" @click="regeoCode">经纬度 -> 地址</el-button>
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
        address: '',
        lnglat: '116.39,39.9'
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

        that.map.on('click', function (e) {
          //console.log(e.lnglat)
          that.lnglat = e.lnglat.lng+ ',' + e.lnglat.lat;
          that.regeoCode();
        })
      },

      regeo(e) {
        //e.keyCode是回车 这里也可以省去判断 因为上面的 @keydown.enter.native 已经判断了
        if (e.keyCode === 13) {
          this.regeoCode();
          return false;
        }
        return true;
      },

      regeoCode() {
        let that = this;
        that.map.clearMap();
        let lnglat = that.lnglat.split(',');
        let marker = new AMap.Marker();
        let geocoder = new AMap.Geocoder({
          city: "010", //城市设为北京，默认：“全国”
          radius: 1000 //范围，默认：500
        });
        that.map.add(marker);
        marker.setPosition(lnglat);

        geocoder.getAddress(lnglat, function (status, result) {
          if (status === 'complete' && result.regeocode) {
            that.address = result.regeocode.formattedAddress;
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
    position: absolute;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    bottom: 30px;
    right: 30px;
    padding: 10px;
  }

  .info {
    position: absolute;
    background-color: white;
    top: 30px;
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
