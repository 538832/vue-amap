<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <el-input placeholder="请输入关键字" size="mini" id="tipinput" v-model="address">
        <template slot="prepend">请输入关键字</template>
      </el-input>
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
        address: ''
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
        let map = new AMap.Map("container", {
          resizeEnable: true
        });
        //输入提示
        let auto = new AMap.AutoComplete({
          input: "tipinput"
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

  .input-item {
    position: absolute;
    background: white;
    padding: 20px 10px;
    right: 30px;
    top: 30px;

  }

  .input-item .result {
    margin: 20px 0 10px;
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
