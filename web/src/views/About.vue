<template>
  <div class="main-container page-about d-flex flex-column ai-center pt-9 content">
    <div class="page p-5">
      <div class="text-green fs-xxxxl">About</div>
      <div class="text-grey-2 fs-sm mt-5">Published on March 11th 2020</div>
      <div class="mt-5 mb-5"></div>
      <div class="py-4">
        <span class="fs-xxl text-green">#</span>
        &nbsp;
        <span class="fs-xxl text-grey-1">关于自己</span>
      </div>
      <div class="pl-5 text-green-1">
        <p>• Java程序员一枚，目前📍：杭州</p>
        <p>• 未来希望成为一名优秀的全栈程序🐵</p>
        <p>• 业余爱好比较多，喜欢摄影、音乐、羽毛球🏸等等</p>
      </div>
      <div class="py-4">
        <span class="fs-xxl text-green">#</span>
        &nbsp;
        <span class="fs-xxl text-grey-1">关于博客</span>
      </div>
      <div class="pl-5 text-green-1">
        <p>
          •
          该博客用Vue实现，express提供数据接口，mongoDB储存数据，部署在阿里云的linux服务器上，搭建博客的初衷是希望把自己平常工作学习生活中值得记录的东西记录下来
        </p>
        <p>• 如有错误、bug的地方烦请指正</p>
      </div>
      <div class="py-4 mt-6">
        <span class="fs-xxl text-green">#</span>
        &nbsp;
        <span class="fs-xxl text-grey-1">Side Project (Coding)</span>
      </div>
      <div class="pl-5 text-green-1 mb-9">
        <p>
          <a
            href="https://github.com/miqilin21/myBlog"
            target="_blank"
            class="text-green-1 bd-bottom-about"
            >• myBlog(本博客)</a
          >
          - 基于NodeJs、Vue、MongoDB实现的一款个人博客网站🔥
        </p>
        <p>
          <a
            href="https://github.com/LastWhisperzzz/react-moblie-shop"
            target="_blank"
            class="text-green-1 bd-bottom-about"
            >• react-shop</a
          >
          - 基于React、NodeJs、MongoDB构建的手机商城🎉
        </p>
        <p>
          <a
            href="https://github.com/LastWhisperzzz/nice-music"
            target="_blank"
            class="text-green-1 bd-bottom-about"
            >• nice-music</a
          >
          - 基于Vue和NeteaseCloudMusicApi搭建的仿网易云音乐webApp🎄
        </p>
        <p>
          <a
            href="https://github.com/LastWhisperzzz/vue-node-moba"
            target="_blank"
            class="text-green-1 bd-bottom-about"
            >• vue-moba</a
          >
          - 基于Vue+Node+MongoDB开发的英雄联盟移动端官网⛄
        </p>
        <p>
          <a
            href="https://github.com/LastWhisperzzz/resume"
            target="_blank"
            class="text-green-1 bd-bottom-about"
            >• resume</a
          >
          - 原生js实现的动态个人简历📄
        </p>
        <p>
          <a
            href="https://github.com/LastWhisperzzz"
            target="_blank"
            class="text-green-1 bd-bottom-about"
            >• 其他项目</a
          >
          - 持续开发中...
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/style.scss';
.content {
  line-height: 1.8 !important;
}

.bd-bottom-about {
  border-bottom: 1px solid grey;
  &.bd-bottom-about:hover {
    color: map-get($colors, 'red');
  }
}
</style>
