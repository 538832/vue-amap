<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <h5>坐标转换</h5>
      <el-radio-group v-model="type" @change="setCoordinate">
        <el-radio class="input-text" label="gps">GPS 坐标转为高德坐标</el-radio>
        <el-radio class="input-text" label="mapbar">图吧坐标转为高德坐标</el-radio>
        <el-radio class="input-text" label="baidu">百度坐标转为高德坐标</el-radio>
      </el-radio-group>
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
        type: 'gps'
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
          center: [116.388904, 39.913423],
          zoom: 14
        });
        //初始化
        this.setCoordinate();
      },

      //地图转换
      convertFrom(path, type) {
        let that = this;
        // 坐标转换
        AMap.convertFrom(path, type, function (status, result) {
          if (result.info === 'ok') {
            let path2 = result.locations;
            let polyline2 = new AMap.Polyline({
              path: path2,
              borderWeight: 2, // 线条宽度，默认为 1
              strokeColor: 'blue', // 线条颜色
              lineJoin: 'round' // 折线拐点连接处样式
            });
            that.map.add(polyline2);
            let text = new AMap.Text({
              position: result.locations[0],
              text: '高德坐标',
              offset: new AMap.Pixel(-20, -20)
            })
            that.map.add(text);
          }
        });
      },

      //按钮
      setCoordinate() {
        //删除地图上所有的覆盖物
        this.map.clearMap();
        let that = this;

        let m1Text = "GPS 坐标";
        if (this.type == 'mapbar') {
          m1Text = '图吧坐标';
        } else if (this.type == 'baidu') {
          m1Text = '百度坐标';
        }

        // 创建包含4个节点的折线及文字标注
        that.path = [
          new AMap.LngLat(116.368904, 39.913423),
          new AMap.LngLat(116.398258, 39.904600)
        ];
        // 创建折线实例
        let polyline = new AMap.Polyline({
          path: this.path,
          borderWeight: 2, // 线条宽度，默认为 1
          strokeColor: 'red', // 线条颜色
          lineJoin: 'round' // 折线拐点连接处样式
        });
        // 将折线添加至地图实例
        this.map.add(polyline);

        let text = new AMap.Text({
          position: new AMap.LngLat(116.368904, 39.913423),
          text: m1Text,
          offset: new AMap.Pixel(-20, -20)
        })
        this.map.add(text);
        this.convertFrom(this.path, this.type);
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
    padding: 5px 20px 10px;
    right: 30px;
    bottom: 30px;
    width: 220px;
  }

  .input-item .input-text {
    display: block;
    padding: 10px 0;
  }
</style>
