<template>
  <div class="foot">
    <!-- 链接 -->
    <div class="bg-navcolor border-top border-bottom ">
      <div class="d-flex py-6 jc-center">
        <div class="px-7 hand">
          <a href="https://github.com/LastWhisperzzz" target="_blank" class="text-grey-1">GITHUB</a>
        </div>
        <div class="px-7 hand">
          <a href="https://www.zhihu.com/people/xu-xiang-zhong" target="_blank" class="text-grey-1"
            >ZHIHU</a
          >
        </div>
        <div class="px-7 hand">
          <a href="https://juejin.cn/user/105186329635294" target="_blank" class="text-grey-1"
            >JUEJIN</a
          >
        </div>
        <div class="px-7 hand">
          <a href="https://twitter.com/LastWhisperzzz" class="text-grey-1">TWITTER</a>
        </div>
      </div>
    </div>
    <!-- 信息 -->
    <div class="footer pt-3 bg-navcolor">
      <div class="pt-5 d-flex jc-center">
        <div class="px-8 mb-4">
          <router-link class="hand" tag="div" to="/">
            <!-- <img src="https://miqilin-blog.oss-cn-shenzhen.aliyuncs.com/logo.png" height="32" /> -->
            <img class="foot-logo" src="https://oss.lastwhisper.net/sakura.svg" />
            <!-- <div class="text-grey-1 fs-md mt-5">Lastwhisper's Blog</div> -->
          </router-link>
          <div class="text-grey-2 fs-sm">
            <p class="load">I work with passion & love.</p>
            <p>
              Powered by
              <a href="https://github.com/LastWhisperzzz" target="_blank">LastWhisper</a>
            </p>
            <p>
              <a href="https://beian.miit.gov.cn/" target="_blank" class="text-grey-2"
                >浙ICP备2020039354号-1</a
              >
            </p>
            <p>
              本站已运行{{ this.timeObj.day }}天{{ this.timeObj.hour }}时{{
                this.timeObj.minute
              }}分{{ this.timeObj.second }}秒
            </p>
          </div>
        </div>
        <div class="px-8">
          <div class="text-grey-1 fs-md mt-5">RECENT POSTS</div>
          <div class="text-grey-2 fs-sm hand">
            <router-link
              tag="p"
              v-for="item in model"
              :to="`/article/list/${item._id}`"
              :key="item._id"
              >{{ item.title }}</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      model: [],
      currentTime: '232',
      startTime: 1583856000000,
      timeCha: '232321',
      timeObj: {
        day: 0,
        hour: 0,
        minute: 0,
        second: 0
      },
      showTime: true,
      intTime: null
    }
  },
  created() {
    this.getTime()
  },
  mounted() {
    this.getArticles()
  },
  beforeDestroy() {
    clearInterval(this.intTime)
  },
  methods: {
    //获取最近更新文章
    async getArticles() {
      const res = await this.$http.get('articles/recent')
      this.model = res.data
    },
    //获取服务器时间
    async getTime() {
      let res = await this.$http.get('/time')
      this.currentTime = res.data.data
      this.timeCha = this.currentTime - this.startTime
      this.getCountTime(this.timeCha)
      this.intTime = setInterval(() => {
        this.timeCha += 1000
        this.getCountTime(this.timeCha)
      }, 1000)
    },
    // 将倒计的时间戳换算成天、时、分、秒
    getCountTime(time) {
      let countTime = {
        day: 0,
        hour: 0,
        minute: 0,
        second: 0
      }
      countTime.day = Math.floor(time / (24 * 60 * 60 * 1000))
      countTime.hour = Math.floor((time % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
      countTime.minute = Math.floor(
        ((time % (24 * 60 * 60 * 1000)) % (60 * 60 * 1000)) / (60 * 1000)
      )
      countTime.second = Math.floor(
        (((time % (24 * 60 * 60 * 1000)) % (60 * 60 * 1000)) % (60 * 1000)) / 1000
      )
      this.$nextTick(() => {
        this.timeObj = countTime
        this.showTime = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.foot-logo {
  width: 30px;
  height: 30px;
  opacity: 0.3;
  // margin: 0 auto;
  // background-size: cover;
  // background-position: center center;
  // background-repeat: no-repeat;
  animation: poi-deg 12s infinite linear;
  -webkit-animation: poi-deg 12s infinite linear;
}
.foot-title {
  font-size: 16px;
  // font-family: 'Comic Sans MS', sans-serif;
  vertical-align: middle;
}

@keyframes poi-deg {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.foot {
  width: 100%;
  bottom: 0;
  left: 0;
}
</style>
