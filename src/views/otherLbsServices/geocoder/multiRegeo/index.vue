<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-card">
      <div class="input-item">
        <!--使用动态表单-->
        <div style="margin: 5px 0;"
             v-for="(domain, index) in domains"
             :label="'lnglat' + index"
             :key="domain.key">
          <el-input size="mini" style="width: 180px;" v-model="domain.lnglat"></el-input>
          <el-input size="mini" style="width: 220px;" v-model="domain.address"></el-input>
        </div>

        <div style="margin: 5px 0;">
          <el-input size="mini" style="width: 180px;" v-model="msg"></el-input>
          <el-input size="mini" style="width: 220px;" disabled></el-input>
        </div>
      </div>
      <div class="btn">
        <el-button round size="mini" @click="regeoCode">经纬度 -> 地址</el-button>
        <el-button round size="mini" @click="clear">清除</el-button>
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
        markers: [],
        //动态表单
        domains: [],
        msg: '点击地图添加经纬度'
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
          if (that.domains.length < 10) {
            that.domains.push({
              lnglat: e.lnglat.lng + ',' + e.lnglat.lat,  //文本框坐标显示
              lnglats: e.lnglat,  //坐标转地址
              address: '' //文本框地址
            });
            let index = that.domains.length;
            let marker = new AMap.Marker({
              icon: new AMap.Icon({
                image: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                size: new AMap.Size(25, 34),  //图标所处区域大小
                imageSize: new AMap.Size(25, 34)//图标大小
              }),
              position: e.lnglat,
              label: {
                content: that.domains.length,
                direction: top
              },
              offset: new AMap.Pixel(-13, -30)
            });
            that.markers.push(marker);
            that.map.add(marker);
          } else {
            that.$message({
              message: '最多添加10个点标记',
              type: 'warning'
            });
          }
        })
      },

      //经纬度 -> 地址
      regeoCode() {
        let that = this;
        let geocoder;
        if (!geocoder) {
          geocoder = new AMap.Geocoder({
            city: "010", //城市设为北京，默认：“全国”
            radius: 1000 //范围，默认：500
          });
        }
        let lnglats = []
        for (let i = 0; i < this.domains.length; i++) {
          lnglats.push(this.domains[i].lnglats)
        }
        geocoder.getAddress(lnglats, function (status, result) {
          if (status === 'complete' && result.regeocodes.length) {
            for (let i = 0; i < result.regeocodes.length; i += 1) {
              that.domains[i].address = result.regeocodes[i].formattedAddress
            }
          } else {
            //alert(JSON.stringify(result))
            that.$message('请先点击地图添加经纬度');
          }
        });
      },

      //清除
      clear() {
        this.map.remove(this.markers);
        this.markers = [];
        this.domains = [];
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
