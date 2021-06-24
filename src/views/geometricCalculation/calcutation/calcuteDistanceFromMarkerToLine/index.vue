<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info">
      拖动蓝色Marker可调整位置
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
        polyline2: null,
        marker: null,
        marker2: null,
        path: null
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
        //初始化地图对象，加载地图
        this.map = new AMap.Map("container", {
          resizeEnable: true,
          zoom: 13
        });
        let pos = [116.377904, 39.915423]
        this.marker = new AMap.Marker({
          draggable:true,
          position: pos
        });
        this.map.add(this.marker);

        this.path = [
          [116.368904, 39.913423],
          [116.382122, 39.901176],
          [116.387271, 39.912501],
          [116.398258, 39.904600]
        ]
        let polyline = new AMap.Polyline({
          path: this.path,
          strokeColor:'#80d8ff',
        });
        this.map.add(polyline)
        this.polyline2 = new AMap.Polyline({
          strokeStyle:'dashed',
          strokeColor:'blue',
          strokeWeight:2
        });
        this.map.add(this.polyline2)
        this.text = new AMap.Text({
          text:'',
          style:{'background-color':'#ccccff',
            'border-color':'green',
            'font-size':'12px'}
        });
        this.map.add(this.text)
        this.marker2 = new AMap.Marker({
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
          offset:new AMap.Pixel(-9,-31)
        });
        this.map.add(this.marker2)
        this.compute();
        this.marker.on('dragging',this.compute)
      },
      compute(){
        let pos = this.marker.getPosition();
        // 计算path上距离pos最近的点
        let closestPositionOnLine  = AMap.GeometryUtil.closestOnLine(pos,this.path);
        this.marker2.setPosition(closestPositionOnLine)
        // 设置label标签
        this.marker2.setLabel({
          offset: new AMap.Pixel(5, 0),
          content: '折线上离蓝色点最近的点'
        });
        this.polyline2.setPath([pos,closestPositionOnLine])

        let distance = Math.round(AMap.GeometryUtil.distanceToLine(pos,this.path));
        let textPos = [(pos.lng+closestPositionOnLine[0])/2,(pos.lat+closestPositionOnLine[1])/2]

        this.text.setPosition(textPos)
        this.text.setText('点线距离'+distance+'米')
        this.map.setFitView();
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
