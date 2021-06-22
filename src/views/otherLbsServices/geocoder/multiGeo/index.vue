<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-card">
      <label style='color:grey'>地址：</label>
      <div class="input-item">
        <el-input @keydown.enter.native="geo" type="textarea" :rows="5" placeholder="请输入内容"
                  v-model="address"></el-input>
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
        address: '朝阳区阜荣街10号\n' +
          '朝阳区广顺南大街13号\n' +
          '朝阳区阜通西大街17号',
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
        this.map = new AMap.Map("container", {
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
        var geocoder = new AMap.Geocoder({
          city: "010", //城市设为北京，默认：“全国”
        });

        var markers = [];
        that.map.remove(markers);
        markers = [];

        var addresses = that.address.trim().split('\n');
        geocoder.getLocation(addresses, function (status, result) {
          if (status === 'complete' && result.geocodes.length) {
            for (var i = 0; i < result.geocodes.length; i += 1) {
              var marker = new AMap.Marker({
                position: result.geocodes[i].location
              });
              markers.push(marker);
            }
            that.map.add(markers);
            that.map.setFitView(markers);
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
