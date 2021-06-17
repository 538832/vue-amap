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
        map: null
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
        let map = new AMap.Map('container', {
          viewMode: '3D',
          zoom: 13,
          center: [116.4,39.92],
          resizeEnable: true
        });
        // 创建纯文本标记
        let text = new AMap.Text({
          text:'纯文本标记',
          anchor:'center', // 设置文本标记锚点
          draggable:true,
          cursor:'pointer',
          angle:10,
          style:{
            'padding': '.75rem 1.25rem',
            'margin-bottom': '1rem',
            'border-radius': '.25rem',
            'background-color': 'white',
            'width': '15rem',
            'border-width': 0,
            'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
            'text-align': 'center',
            'font-size': '20px',
            'color': 'blue'
          },
          position: [116.396923,39.918203]
        });

        text.setMap(map);
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

</style>
