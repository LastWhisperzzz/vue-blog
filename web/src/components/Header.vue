<template>
  <div class="head d-flex jc-around ai-center" :class="isScrolling ? `mini` : ''">
    <!-- logo -->
    <div class="hand">
      <router-link tag="div" to="/" class="d-flex ai-center">
        <!-- <img class="bdr50" src="http://oss.lastwhisper.net/avatar.jpg" height="42" /> -->
        <p class="title ml-5 fs-xxxxl text-lightgrey">Lastwhisper's Blog</p>
      </router-link>
    </div>

    <div class="d-flex text-white">
      <!-- 导航菜单 -->
      <router-link
        exact
        tag="div"
        :to="item.link"
        v-for="item in items"
        :key="item.text"
        active-class="active"
        class="nav-item px-5 icon"
        >{{ item.text }}</router-link
      >
      <!-- 音乐播放 -->
      <div class="play pl-5">
        <i
          v-show="!isPlay"
          active-class="active"
          class="iconfont icon-music-o nav-item"
          @click="playMusic(true)"
        ></i>
        <i
          v-show="isPlay"
          active-class="active"
          class="iconfont icon-Pause1 nav-item"
          @click="playMusic(false)"
        ></i>
      </div>
      <div v-show="isPlay">
        <audio id="music" ref="music" src="http://oss.lastwhisper.net/wuxin.mp3" loop></audio>
      </div>
      <!-- 移动端样式 导航菜单改下拉菜单 -->
      <el-dropdown trigger="click" @visible-change="v => (isShowMenu = v)">
        <div
          class="menu-button hand"
          @click="isShowMenu = !isShowMenu"
          :class="{ isShowMenu: isShowMenu }"
        >
          <i></i>
          <i></i>
          <i></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link tag="div" to="/">首页</router-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <router-link tag="div" to="/archives">归档</router-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <router-link tag="div" to="/tags">标签</router-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <router-link tag="div" to="/links">友链</router-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <router-link tag="div" to="/message">留言</router-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <router-link tag="div" to="/about">关于</router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isShowMenu: false,
      isPlay: false,
      isScrolling: false,
      items: [
        { text: '首页', link: '/' },
        { text: '归档', link: '/archives' },
        { text: '标签', link: '/tags' },
        { text: '友链', link: '/links' },
        { text: '留言', link: '/message' },
        { text: '关于', link: '/about' }
      ]
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handScroll)
  },
  methods: {
    //监听滚动
    handScroll() {
      let scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      this.isScrolling = scrollTop > 0
    },
    // 控制音乐播放
    playMusic(play) {
      this.isPlay = !this.isPlay
      if (play) {
        this.$refs.music.play()
      } else {
        this.$refs.music.pause()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';

.title {
  font-size: 22px;
  font-family: 'Comic Sans MS', sans-serif;
  // font-family: 'Segoe Script', 'Ink Free', 'Segoe Print';
}
.head {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 65px;
  background-color: transparent;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.5);
  transition: 0.5s ease-in-out;
  .icon-music-o {
    font-size: 19px;
  }
  .icon-Pause1 {
    font-size: 19px;
  }
}
.nav-item.active {
  color: map-get($colors, 'red');
}

.nav-item:hover {
  color: map-get($colors, 'red');
}

//滚动 顶栏改变
.mini {
  background-color: map-get($colors, 'navcolor');
  height: 56px;
  transition: 0.5s ease-in-out;
}

.menu-button {
  display: none;
  i {
    display: block;
    width: 24px;
    height: 3px;
    background-color: #fff;
    margin: 5px auto;
    transition: 0.2s ease-in-out;
  }
}
.isShowMenu {
  i {
    &:nth-child(2) {
      opacity: 0;
    }
    &:nth-child(1) {
      transform: translateY(8px) rotate(-45deg);
    }
    &:nth-child(3) {
      transform: translateY(-8px) rotate(45deg);
    }
  }
}
@media screen and (max-width: 650px) {
  .nav-item {
    display: none;
  }
  .play {
    display: none;
  }
  .menu-button {
    display: block;
    margin-left: 120px;
  }
}
</style>
