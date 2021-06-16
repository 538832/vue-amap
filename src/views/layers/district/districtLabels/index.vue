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
        colors: {}
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

        var districts = [
          {
            citycode: [],
            adcode: "440000",
            name: "广东",
            center: "113.280637,23.125178",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "410000",
            name: "河南",
            center: "113.665412,34.757975",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "150000",
            name: "内蒙古",
            center: "111.670801,40.818311",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "230000",
            name: "黑龙江",
            center: "126.642464,45.756967",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "650000",
            name: "新疆",
            center: "87.617733,43.792818",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "420000",
            name: "湖北",
            center: "114.298572,30.584355",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "210000",
            name: "辽宁",
            center: "123.429096,41.796767",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "370000",
            name: "山东",
            center: "117.000923,36.675807",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "610000",
            name: "陕西",
            center: "108.948024,34.263161",
            level: "province",
            districts: []
          },
          {
            citycode: "021",
            adcode: "310000",
            name: "上海",
            center: "121.472644,31.231706",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "520000",
            name: "贵州",
            center: "106.713478,26.578343",
            level: "province",
            districts: []
          },
          {
            citycode: "023",
            adcode: "500000",
            name: "重庆",
            center: "106.504962,29.533155",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "540000",
            name: "西藏",
            center: "91.132212,29.660361",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "340000",
            name: "安徽",
            center: "117.283042,31.86119",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "350000",
            name: "福建",
            center: "119.306239,26.075302",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "430000",
            name: "湖南",
            center: "112.982279,28.19409",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "460000",
            name: "海南",
            center: "110.33119,20.031971",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "320000",
            name: "江苏",
            center: "118.767413,32.041544",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "630000",
            name: "青海",
            center: "101.778916,36.623178",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "450000",
            name: "广西",
            center: "108.320004,22.82402",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "640000",
            name: "宁夏",
            center: "106.278179,38.46637",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "360000",
            name: "江西",
            center: "115.892151,28.676493",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "330000",
            name: "浙江",
            center: "120.153576,30.287459",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "130000",
            name: "河北",
            center: "114.502461,38.045474",
            level: "province",
            districts: []
          },
          {
            citycode: "1853",
            adcode: "820000",
            name: "澳门",
            center: "113.54909,22.198951",
            level: "province",
            districts: []
          },
          {
            citycode: "1886",
            adcode: "710000",
            name: "台湾",
            center: "121.509062,25.044332",
            level: "province",
            districts: []
          },
          {
            citycode: "1852",
            adcode: "810000",
            name: "香港",
            center: "114.173355,22.320048",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "620000",
            name: "甘肃",
            center: "103.823557,36.058039",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "510000",
            name: "四川",
            center: "104.065735,30.659462",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "220000",
            name: "吉林",
            center: "125.3245,43.886841",
            level: "province",
            districts: []
          },
          {
            citycode: "022",
            adcode: "120000",
            name: "天津",
            center: "117.190182,39.125596",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "530000",
            name: "云南",
            center: "102.712251,25.040609",
            level: "province",
            districts: []
          },
          {
            citycode: "010",
            adcode: "110000",
            name: "北京",
            center: "116.405285,39.904989",
            level: "province",
            districts: []
          },
          {
            citycode: [],
            adcode: "140000",
            name: "山西",
            center: "112.549248,37.857014",
            level: "province",
            districts: []
          }
        ];

        let LabelsData = [];

        const directions = {
          '北京': 'top',
          '河北': 'right',
          '宁夏': 'bottom',
          '浙江': 'bottom',
          '上海': 'right',
          '青海': 'left',
          '黑龙江': 'top',
          '江苏': 'right',
          '安徽': 'top',
          '重庆': 'right',
          '湖南': 'left',
          '澳门': 'bottom',
          '香港': 'right',
          '台湾': 'bottom',
          '内蒙古': 'top',

        };

        for (let i = 0; i < districts.length; i++) {
          let config = {
            name: '',
            position: [116.12, 39.11],
            zooms: [4, 13],
            zIndex: 1,
            opacity: 1,
            text: {
              content: '',
              direction: 'center',
              offset: [0, 0],
              zooms: [3, 20],
              style: {
                fontSize: 10,
                fontWeight: 'normal',
                fillColor: '#eee',
                strokeColor: '#88f',
                strokeWidth: 2,
              }
            }
          };
          let district = districts[i];
          let name = district.name;
          config.text.content = name;
          config.position = district.center.split(',');
          if (directions[name]) {
            config.text.direction = directions[name];
          }
          LabelsData.push(config);
        }

        let disCountry = new AMap.DistrictLayer.Country({
          zIndex: 10,
          SOC: 'CHN',
          depth: 1,
          styles: {
            'nation-stroke': '#ff0000',
            'coastline-stroke': '#0088ff',
            'province-stroke': 'grey',
            'fill': function (props) {
              return that.getColorByDGP(props.adcode_pro)
            }
          }
        })

        that.map = new AMap.Map("container", {
          zooms: [4, 10],
          center: [106.122082, 33.719192],
          zoom: 4,
          isHotspot: false,
          defaultCursor: 'pointer',
          layers: [
            disCountry
          ],
          viewMode: '3D',
        })
        that.map.addControl(new AMap.Scale());
        that.map.addControl(new AMap.ToolBar({liteStyle: true}));

        that.map.on('complete', function () {
          var layer = new AMap.LabelsLayer({
            // 开启标注避让，默认为开启，v1.4.15 新增属性
            collision: false,
            // 开启标注淡入动画，默认为开启，v1.4.15 新增属性
            animation: true,
          });

          for (var i = 0; i < LabelsData.length; i++) {
            var labelsMarker = new AMap.LabelMarker(LabelsData[i]);
            layer.add(labelsMarker);
          }
          that.map.add(layer);
        })
      },

      getColorByDGP(adcode) {
        let GDPSpeed = {
          '520000': 10,//贵州
          '540000': 10,//西藏
          '530000': 8.5,//云南
          '500000': 8.5,//重庆
          '360000': 8.5,//江西
          '340000': 8.0,//安徽
          '510000': 7.5,//四川
          '350000': 8.5,//福建
          '430000': 8.0,//湖南
          '420000': 7.5, //湖北
          '410000': 7.5,//河南
          '330000': 7.0,//浙江
          '640000': 7.5,//宁夏
          '650000': 7.0,//新疆
          '440000': 7.0,//广东
          '370000': 7.0,//山东
          '450000': 7.3,//广西
          '630000': 7.0,//青海
          '320000': 7.0,//江苏
          '140000': 6.5,//山西
          '460000': 7,// 海南
          '310000': 6.5,//上海
          '110000': 6.5, // 北京
          '130000': 6.5, // 河北
          '230000': 6, // 黑龙江
          '220000': 6,// 吉林
          '210000': 6.5, //辽宁
          '150000': 6.5,//内蒙古
          '120000': 5,// 天津
          '620000': 6,// 甘肃
          '610000': 8.5,// 甘肃
          '710000': 2.64, //台湾
          '810000': 3.0, //香港
          '820000': 4.7 //澳门

        };
        if (!this.colors[adcode]) {
          var gdp = GDPSpeed[adcode];
          if (!gdp) {
            this.colors[adcode] = 'rgb(227,227,227)'
          } else {
            var r = 3;
            var g = 140;
            var b = 230;
            var a = gdp / 10;
            this.colors[adcode] = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
          }
        }
        return this.colors[adcode]
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
