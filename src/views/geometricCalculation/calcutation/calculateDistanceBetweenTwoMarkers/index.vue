<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info">
      可拖动Marker调整位置
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
        text: null,
        line: null,
        m1: null,
        m2: null
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
        //初始化地图对象，加载地图
        let map = new AMap.Map("container", {
          resizeEnable: true,
          zoom: 13
        });
        this.m1 = new AMap.Marker({
          map: map,
          draggable: true,
          position: new AMap.LngLat(116.368904, 39.923423)
        });
        this.m2 = new AMap.Marker({
          map: map,
          draggable: true,
          position: new AMap.LngLat(116.387271, 39.922501)
        });
        map.setFitView();

        this.line = new AMap.Polyline({
          strokeColor: '#80d8ff',
          isOutline: true,
          outlineColor: 'white'
        });
        this.line.setMap(map);
        this.text = new AMap.Text({
          text: '',
          style: {
            'background-color': '#29b6f6',
            'border-color': '#e1f5fe',
            'font-size': '12px'
          }
        });
        this.text.setMap(map)

        this.computeDis();
        this.m1.on('dragging', this.computeDis)
        this.m2.on('dragging', this.computeDis)
      },

      computeDis() {
        let p1 = this.m1.getPosition();
        let p2 = this.m2.getPosition();
        let textPos = p1.divideBy(2).add(p2.divideBy(2));
        let distance = Math.round(p1.distance(p2));
        let path = [p1, p2];
        this.line.setPath(path);
        this.text.setText('两点相距' + distance + '米')
        this.text.setPosition(textPos)
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

  .info {
    position: absolute;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 30px;
    right: 30px;
    padding: 10px;
  }
</style>
