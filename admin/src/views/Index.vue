<template>
  <div>
    <el-card>
      <div class="info">
        <div class="userinfo">
          <div class="avatar">
            <img src="../assets/images/default-avatar.jpg" alt="" />
          </div>
          <p class="nickname">Last Whisper</p>
          <p class="description">
            百丈之台，其始则一石耳，由是而二石焉，由是而三石，四石以至于千万石焉。领悟亦然。今日记一事，明日悟一理，积久而成学。
          </p>
          <ul class="contact">
            <li>
              <el-tooltip class="item" effect="dark" content="1154793918@qq.com" placement="top">
                <a
                  href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&amp;email=1154793918@qq.com"
                  target="_blank"
                >
                  <img src="../assets/images/contact/mail.png" />
                </a>
              </el-tooltip>
            </li>
            <li>
              <el-tooltip class="item" effect="dark" content="1154793918" placement="top">
                <a
                  href="http://wpa.qq.com/msgrd?v=3&amp;uin=1154793918&amp;site=qq&amp;menu=yes"
                  target="_blank"
                >
                  <img src="../assets/images/contact/qq.png" />
                </a>
              </el-tooltip>
            </li>
            <li>
              <el-tooltip class="item" effect="dark" content="15257155808" placement="top">
                <a href="javascript:;">
                  <img src="../assets/images/contact/wexin.png" />
                </a>
              </el-tooltip>
            </li>
            <li>
              <a href="https://github.com/LastWhisperzzz" target="_blank">
                <img src="../assets/images/contact/github.png" />
              </a>
            </li>
            <li>
              <a href="https://music.163.com/#/user/home?id=406467024" target="_blank">
                <img src="../assets/images/contact/music.png" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </el-card>

    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="hover" class="info-card">
          <div class="title">文章</div>
          <div>
            <span>{{ articleNum }}</span
            >篇
          </div>
          <div class="tips">9天前发布了一篇文章，继续努力哦！</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" class="info-card">
          <div class="title">留言</div>
          <div>
            <span>{{ commentNum }}</span
            >条
          </div>
          <div class="tips">感谢陌生人的留言！</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" class="info-card">
          <div class="title">访问量</div>
          <div><span>31</span>次</div>
          <div class="tips">感谢你们的浏览！</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleNum: 0,
      commentNum: 0
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const res = await this.axios.get('rest/articles')
      const res2 = await this.axios.get('rest/messages')
      const res3 = await this.axios.get('rest/comments')
      this.articleNum = res.data.total
      this.commentNum = res2.data.total + res3.data.total
    }
  }
}
</script>
<style lang="scss" scoped>
.info {
  padding-top: 0;
  .userinfo {
    text-align: center;
    padding: 20px 20px 0;
    .avatar {
      width: 75px;
      margin: 0 auto 15px;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .name {
      font-size: 20px;
      color: #37474f;
      margin-bottom: 20px;
    }
    .nickname {
      color: #a3afb7;
      margin-bottom: 20px;
    }
    .description {
      margin-bottom: 25px;
    }
    .contact {
      text-align: center;
      li {
        display: inline-block;
        margin-right: 15px;
        margin-bottom: 10px;
        a {
          display: inline-block;
          img {
            border: 1px solid #888;
            border-radius: 100%;
          }
        }
      }
    }
  }
}

.info-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 320px;
  // border-radius: 25px;
  .title {
    position: absolute;
    left: 20px;
    top: 20px;
    color: #74bcff;
    font-size: 16px;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -6px;
      width: 35px;
      height: 2px;
      background: #dbe8f7;
    }
  }
  span {
    color: #0d80ff;
    font-size: 40px;
    font-style: oblique;
    margin-right: 6px;
  }
  .tips {
    color: #bdc6cf;
    margin-top: 40px;
  }
}
</style>
