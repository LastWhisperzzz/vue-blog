<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
import 'echarts-wordcloud/dist/echarts-wordcloud'
import 'echarts-wordcloud/dist/echarts-wordcloud.min'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: null,
      data: [
        { name: 'JS', value: 6 },
        { name: 'Linux', value: 2 },
        { name: 'CSS', value: 2 },
        { name: 'Vue', value: 1 },
        { name: 'React', value: 1 },
        { name: 'Java', value: 2 },
        { name: '数据库', value: 2 },
        { name: 'Node', value: 0 },
        { name: 'Redis', value: 0 },
        { name: 'SpringBoot', value: 0 },
        { name: '设计模式', value: 0 }
      ]
    }
  },
  computed: {
    // ...mapGetters(['wordCloudData'])
  },
  created() {
    // this.getData()
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.setOptions()
      }
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el)
      this.setOptions()
    },
    setOptions() {
      this.chart.setOption({
        title: {
          text: this.title,
          x: 'center'
        },
        backgroundColor: '#fff',
        // tooltip: {
        //   pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
        // },
        series: [
          {
            type: 'wordCloud',
            //用来调整词之间的距离
            gridSize: 10,
            //用来调整字的大小范围
            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.
            sizeRange: [14, 60],
            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
            //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            // rotationRange: [-45, 0, 45, 90],
            // rotationRange: [ 0,90],
            rotationRange: [0, 0],
            //随机生成字体颜色
            // maskImage: maskImage,
            textStyle: {
              normal: {
                color: function() {
                  return (
                    'rgb(' +
                    Math.round(Math.random() * 255) +
                    ', ' +
                    Math.round(Math.random() * 255) +
                    ', ' +
                    Math.round(Math.random() * 255) +
                    ')'
                  )
                }
              }
            },
            //位置相关设置
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.
            left: 'center',
            top: 'center',
            right: null,
            bottom: null,
            width: '200%',
            height: '200%',
            //数据
            data: this.data
          }
        ]
      })
    },
    getData() {
      // getTagStatistic().then(response => {
      //   for (var v of response) {
      //     var obj = {};
      //     obj.name = v.tagName;
      //     obj.value = v.blogCount * 100;
      //     this.data.push(obj);
      //   }
      // });
    }
  }
}
</script>
<style scoped>
.chartsClass {
  padding-left: 1.2rem;
}
</style>
