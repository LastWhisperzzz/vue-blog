<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="个人信息" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard, Account },
  data() {
    return {
      user: {
        nickName: 'Last Whisper',
        introduce:
          '百丈之台，其始则一石耳，由是而二石焉，由是而三石，四石以至于千万石焉。领悟亦然。今日记一事，明日悟一理，积久而成学。',
        avatar: 'https://oss.lastwhisper.net/default-avatar.jpg'
      },
      activeTab: 'account'
    }
  },
  computed: {
    // ...mapGetters(['nickName', 'avatar', 'introduce'])
  },
  created() {
    // this.getUser()
  },
  methods: {
    // getUser() {
    //   this.user = {
    //     nickName: this.nickName,
    //     introduce: this.introduce,
    //     avatar: this.avatar
    //   }
    // }
  }
}
</script>
