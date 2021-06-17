<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <h5>添加、删除图层（Layer）</h5>
      <div class="item">
        <span>卫星图层：</span>
        <el-button size="mini" round @click="addMarker">添加点标记</el-button>
        <el-button size="mini" round @click="updateIcon">更新点标记图标</el-button>
      </div>
      <div class="item">
        <span>红色标记：</span>
        <el-button size="mini" round @click="clearMarker">删除点标记</el-button>
        <el-button size="mini" round @click="updateContent">更新点标记内容</el-button>
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
        marker: null,

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
        this.map = new AMap.Map('container', {
          resizeEnable: true,
          center: [116.397428, 39.90923],
          zoom: 13
        });
      },

      // 实例化点标记
      addMarker() {
        this.marker = new AMap.Marker({
          //icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
          icon: new AMap.Icon({
            image: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
            size: new AMap.Size(25, 34),  //图标所处区域大小
            imageSize: new AMap.Size(25, 34)//图标大小
          }),
          position: [116.406315, 39.908775],
          offset: new AMap.Pixel(-13, -30)
        });
        this.marker.setMap(this.map);
      },

      //更新点标记图标
      updateIcon() {
        if (!this.marker) {
          return;
        }
        //this.marker.setIcon('//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png')
        this.marker.setIcon( new AMap.Icon({
          image: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png",
          size: new AMap.Size(25, 34),  //图标所处区域大小
          imageSize: new AMap.Size(25, 34)//图标大小
        }),)
      },

      //更新点标记图标
      updateContent() {
        if (!this.marker) {
          return;
        }

        // 自定义点标记内容
        let markerContent = document.createElement("div");

        // 点标记中的图标
        let markerImg = document.createElement("img");
        markerImg.className = "markerlnglat";
        markerImg.src = "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png";
        markerImg.setAttribute('width', '25px');
        markerImg.setAttribute('height', '34px');
        markerContent.appendChild(markerImg);

        // 点标记中的文本
        let markerSpan = document.createElement("span");
        markerSpan.className = 'marker';
        markerSpan.innerHTML = "Hi，我被更新啦！";
        markerContent.appendChild(markerSpan);

        this.marker.setContent(markerContent); //更新点标记内容
        this.marker.setPosition([116.391467, 39.927761]); //更新点标记位置
      },

      //删除点标记
      clearMarker() {
        if (this.marker) {
          this.marker.setMap(null);
          this.marker = null;
        }
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
  }

  .input-item .item {
    margin: 10px 0px;
  }
</style>
