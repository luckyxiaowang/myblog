<template>
  <div class="blogging-container">
    <div class="title-box">
      <input type="text" name="" class="title" placeholder="请输入标题" v-model="article.title">
    <button class="submit" @click="submitBlog">发表博客</button>
    </div>
    <mavon-editor class="blogging" v-model="article.content" />
    <!-- 动态表单 -->
    <el-dialog :title="`发布文章：${article.title}`" :visible.sync="showDialog" width="30%">
  <el-form label-position="left" label-width="80px">
    <!-- 分类区域 -->
    <el-form-item label="分类：">
      <el-select v-model="article.category" placeholder="请选择">
        <el-option
          v-for="(category,index) in categories"
          :key="index"
          :label="category"
          :value="category"
        ></el-option>
      </el-select>
      <el-button type="text" @click="showAddCategoryInput = true" class="add-category-btn">自定义分类</el-button>
    </el-form-item>
    <el-collapse-transition>
      <el-form-item label="新分类：" v-show="showAddCategoryInput">
        <el-input v-model="article.newCategory" @keypress.enter.native="addCategory"></el-input>
      </el-form-item>
    </el-collapse-transition>
    <!-- 标签区域 -->
    <el-form-item label="标签：" style="width:fit-content">
      <el-tag
        :key="tag"
        v-for="tag in article.tags"
        closable
        :disable-transitions="false"
        @close="handleTagClose(tag)"
      >{{tag}}</el-tag>
      <el-input
        v-if="inputTagVisible"
        v-model="inputTag"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleTagInputConfirm"
        @blur="handleTagInputConfirm"
        class="input-new-tag"
      ></el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showTagInput">+ 新标签</el-button>
    </el-form-item>
    <el-form-item label="摘要：">
      <el-input type="textarea" v-model="article.tabloid" rows="4"></el-input>
    </el-form-item>
    <el-form-item label="作者：">
      <el-input type="text" v-model="article.author"></el-input>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="article.type">原创</el-checkbox>
    </el-form-item>
  </el-form>
  <span slot="footer">
    <el-button @click="handleCancel=flase">取 消</el-button>
    <el-button type="primary" @click="handleSubmit">发布</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
import { getArticlelistAPI, addArticlelistAPI } from '@/api'
export default {
  data () {
    return {
      showDialog: false,
      categories: [], // 分类
      inputTag: '',
      inputTagVisible: false,
      showAddCategoryInput: false,
      handleCancel: false,
      article: {
        title: '',
        content: '',
        category: '',
        tags: [],
        tabloid: '',
        type: true,
        author: '',
        newCategory: ''
      }
    }
  },
  methods: {
    assertNotEmpty (target, msg) {
      if (!target) {
        this.$message({
          message: msg,
          type: 'warning'
        })
        return false
      }
      return true
    },
    submitBlog () {
      if (this.assertNotEmpty(this.article.title, '请填写文章标题') &&
           this.assertNotEmpty(this.article.content, '请填写文章内容')) {
        this.showDialog = true
      }
    },
    // 添加新的文章标签
    showTagInput () {
      this.inputTagVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 页面删除标签
    handleTagClose (tag) {
      this.article.tags.splice(this.article.tags.indexOf(tag), 1)
    },
    // 添加新的标签后回车显示在页面上
    handleTagInputConfirm () {
      const inputTag = this.inputTag
      if (inputTag) {
        this.article.tags.push(inputTag)
      }
      this.inputTagVisible = false
      this.inputTag = ''
    },
    // 添加新的博客分类
    async addCategory () {
      const { data: res } = await addArticlelistAPI(this.article.newCategory)
      // 添加失败则返回添加失败的消息
      if (res.status !== 0) return this.$message.error(res.message)
      // 成功
      this.$message.success(res.message)
    }
  },
  // 动态渲染分类数据
  created () {
    getArticlelistAPI().then((res) => {
      console.log(res)
      this.categories = res.data.data.map((item) => item.name)
    })
  }

}
</script>

<style lang="less" scoped>
.blogging{
  height: 650px;
}
.title-box{
  display: grid;
  grid-template-columns: 22fr 2fr;
  .title{
    background: none;
    outline: none;
    border: none;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 10px;
    line-height: 1;
    height: 20px;
    font-size: 16px;
    font-weight: bold;
    color: #303133;
  }
.title:focus {
  border-color: #409eff;
}
.title::placeholder{
  font-weight: normal;
  text-indent: 20px;
}
  .submit{
    border: none;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
    color:#409eff;
    background:none;
  }
}

</style>
