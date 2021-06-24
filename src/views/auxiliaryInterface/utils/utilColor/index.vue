<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container">
      颜色格式转换
      <el-table stripe :data="tableData" style="width: 100%">
        <el-table-column prop="color" label=""></el-table-column>
        <el-table-column prop="default" label="原格式"></el-table-column>
        <el-table-column prop="rgba" label="rgba( r, g, b, a )格式"></el-table-column>
        <el-table-column prop="rgbaArr" label="[ r, g, b, a ]格式"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import JsonViewer from 'vue-json-viewer'

  export default {
    name: "index",
    // 注册组件
    components: {
      JsonViewer
    },
    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        result: {},
        tableData: [
          {
            color: 'red',
            default: 'red',
            rgba: '',
            rgbaArr: ''
          },
          {
            color: '#3399ff',
            default: '#3399ff',
            rgba: '',
            rgbaArr: ''
          },
          {
            color: 'rgb(102,255,255)',
            default: 'rgb(102,255,255)',
            rgba: '',
            rgbaArr: ''
          },
          {
            color: 'rgba(102,255,255,0.5)',
            default: 'rgba(102,255,255,0.5)',
            rgba: '',
            rgbaArr: ''
          },
        ]
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

        for (let i = 0; i < this.tableData.length; i++) {
          var originColor = this.tableData[i].default;

          var rgba = AMap.Util.color2Rgba(originColor)
          var rgbaArray = AMap.Util.color2RgbaArray(originColor)
          this.tableData[i].rgba = rgba
          this.tableData[i].rgbaArr = JSON.stringify(rgbaArray)
        }
      }
    }
  }
</script>

<style scoped>
  .app-container {
    width: 100%;
    position: relative;
  }

  #container {
    width: 100%;
    height: 100%;
  }

  /deep/ .el-table__row:nth-child(1) .el-table_1_column_1 {
    background: red;
  }

  /deep/ .el-table__row:nth-child(2) .el-table_1_column_1 {
    background: #3399ff;
  }

  /deep/ .el-table__row:nth-child(3) .el-table_1_column_1 {
    background: rgb(102, 255, 255);
  }

  /deep/ .el-table__row:nth-child(4) .el-table_1_column_1 {
    background: rgba(102, 255, 255, 0.5);
  }

</style>
