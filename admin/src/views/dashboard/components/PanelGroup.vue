<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <span class="iconfont icon-peoples" style="font-size:45px" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">访问量</div>
          <count-to :start-val="0" :end-val="totalVisits" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <span class="el-icon-document" style="font-size:45px" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">文章</div>
          <count-to
            :start-val="0"
            :end-val="articleCount"
            :duration="3000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <span class="el-icon-s-comment" style="font-size:45px" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">留言</div>
          <count-to
            :start-val="0"
            :end-val="messageCount"
            :duration="3000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <span class="el-icon-s-promotion" style="font-size:45px" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">友链</div>
          <count-to :start-val="0" :end-val="linkCount" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      totalVisits: 151,
      articleCount: 0,
      messageCount: 0,
      linkCount: 4
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await this.axios.get('rest/articles')
      const res2 = await this.axios.get('rest/messages')
      const res3 = await this.axios.get('rest/comments')
      this.articleCount = res.data.total
      this.messageCount = res2.data.total + res3.data.total
    }
  }
}
</script>

<style scoped>
.panel-group {
  margin-top: 18px;
}
.panel-group .card-panel-col {
  margin-bottom: 32px;
}

.panel-group .card-panel {
  height: 108px;
  cursor: pointer;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
}
.panel-group .card-panel:hover .card-panel-icon-wrapper {
  color: #fff;
}

.panel-group .card-panel:hover .icon-people {
  background: #40c9c6;
}

.panel-group .card-panel:hover .icon-message {
  background: #36a3f7;
}

.panel-group .card-panel:hover .icon-money {
  background: #f4516c;
}

.panel-group .card-panel:hover .icon-shopping {
  background: #34bfa3;
}

.panel-group .card-panel .icon-people {
  color: #40c9c6;
}

.panel-group .card-panel .icon-message {
  color: #36a3f7;
}
.panel-group .card-panel .icon-message::before {
  content: none;
}
.panel-group .card-panel .icon-money {
  color: #f4516c;
}

.panel-group .card-panel .icon-shopping {
  color: #34bfa3;
}

.panel-group .card-panel .card-panel-icon-wrapper {
  float: left;
  margin: 14px 0 0 14px;
  padding: 16px;
  transition: all 0.38s ease-out;
  border-radius: 6px;
}

.panel-group .card-panel .card-panel-icon {
  float: left;
  font-size: 48px;
}

.panel-group .card-panel .card-panel-description {
  float: right;
  font-weight: bold;
  margin: 26px;
  margin-left: 0px;
}
.panel-group .card-panel .card-panel-description .card-panel-text {
  line-height: 18px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
  margin-bottom: 12px;
}

.panel-group .card-panel .card-panel-description .card-panel-num {
  font-size: 20px;
}
</style>
