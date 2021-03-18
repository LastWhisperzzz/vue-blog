<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ id ? '编辑' : '创建' }}文章</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-form label-width="80px" @submit.native.prevent="save">
        <!-- 分类 -->
        <el-form-item label="分类">
          <el-select
            v-model="model.categories"
            placeholder="请选择所属分类"
            clearable
            multiple
            style="width:380px"
          >
            <el-option
              v-for="item in cateList"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 标题 -->
        <el-form-item label="标题">
          <el-input v-model="model.title" style="width:380px"></el-input>
        </el-form-item>
        <!-- 封面 -->
        <el-form-item label="封面">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="res => $set(model, 'icon', res.url)"
          >
            <img v-if="model.icon" :src="model.icon" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 内容 -->
        <el-form-item label="内容">
          <div>
            <mavon-editor
              code_style="monokai-sublime"
              :ishljs="true"
              ref="mavon"
              v-model="model.body"
              @imgAdd="$imgAdd"
            ></mavon-editor>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'ArticleEdit',
  components: { mavonEditor },
  props: {
    id: { type: String, default: '' }
  },
  data() {
    return {
      // 文章数据
      model: {},
      // 分类数据
      cateList: []
    }
  },
  created() {
    this.id && this.getArticle()
    this.getCateList()
  },
  methods: {
    //获取需要编辑的文章
    async getArticle() {
      const res = await this.axios.get(`rest/articles/${this.id}`)
      this.model = res.data
    },
    //获取分类列表
    async getCateList() {
      const res = await this.axios.get('rest/categories')
      this.cateList = res.data.data
    },
    // 富文本编辑器图片上传
    $imgAdd(pos, $file) {
      const formData = new FormData()
      formData.append('file', $file)
      this.axios.post('upload', formData).then(res => {
        console.log(res)
        //将返回的url替换到文本原位置
        this.$refs.mavon.$img2Url(pos, res.data.url)
      })
    },
    async save() {
      if (this.id) {
        await this.axios.put(`rest/articles/${this.id}`, this.model)
      } else {
        await this.axios.post('rest/articles', this.model)
      }
      this.$message.success('保存成功')
      this.$router.push('/articles/list')
    }
  }
}
</script>
