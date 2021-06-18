<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
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
        infoWindow: null
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
        let lnglat = new AMap.LngLat(116.397, 39.918);

        // 创建地图实例
        let map = new AMap.Map("container", {
          zoom: 14,
          center: lnglat,
          resizeEnable: true
        });

        // infowidnow 的 innerHTML
        let infoWindowContent =
          "<div style=\"border-radius: 30px; padding: 10px\" className=\"custom-infowindow input-card\">\n" +
          "      <label style=\"color:grey\">故宫博物院</label>\n" +
          "      <div class=\"input-item\">\n" +
          "        <div class=\"input-item-prepend\">\n" +
          "          <span class=\" input-item-text\">经纬度</span>\n" +
          "          <input id=\"lnglat\" type=\"text\"/>\n" +
          "        </div>\n" +
          "      </div>\n" +
          "      <input id=\"lnglat2container\" type=\"button\" class=\"btn\" value=\"获取该位置经纬度\"/>\n" +
          "    </div>";
        // 创建一个自定义内容的 infowindow 实例
        let infoWindow = new AMap.InfoWindow({
          position: lnglat,
          offset: new AMap.Pixel(0, -30),
          content: infoWindowContent
        });

        infoWindow.open(map);

        let marker = new AMap.Marker({position: lnglat, map});

        marker.on('click', function () {
          infoWindow.open(map);
        });

        //不知道发生什么奇怪的事情, 自动调用了
        let lnglat2container = document.getElementById('lnglat2container');
        lnglat2container.onclick = this.getLngLat()
      },

      // 将当前经纬度展示在 infowindow 的 input 中
      getLngLat() {
        let lnglat = new AMap.LngLat(116.397, 39.918);
        let lnglatInput = document.getElementById('lnglat');
        lnglatInput.setAttribute('value', lnglat.toString());
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
</style>
