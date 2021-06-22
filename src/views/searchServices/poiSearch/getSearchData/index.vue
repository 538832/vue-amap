<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <pre v-text="result"></pre>
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
        result: ''
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
        // 初始化地图
        let map = new AMap.Map("container", {
          resizeEnable: true
        });
        this.autoInput();
      },
      // 获取搜索信息
      autoInput() {
        let that = this;
        let keywords = '北京大学';
        let autoOptions = {
          city: '全国'
        }
        let placeSearch = new AMap.PlaceSearch(autoOptions);
        placeSearch.search(keywords, function (status, result) {
          that.result = result
        })
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

  .input-item {
    position: absolute;
    background: white;
    padding: 10px;
    right: 30px;
    top: 30px;
    max-height: 400px;
    overflow-y: scroll;
    width: 320px;
  }

  /*//滚动条凹槽的颜色，还可以设置边框属性*/
  ::-webkit-scrollbar-track-piece {
    background-color: #f8f8f8;
  }

  /*滚动条的宽度*/
  ::-webkit-scrollbar {
    width: 9px;
    height: 6px;
  }

  /*滚动条的设置*/
  ::-webkit-scrollbar-thumb {
    background-color: #dddddd;
    background-clip: padding-box;
    min-height: 28px;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #bbb;
  }

</style>
