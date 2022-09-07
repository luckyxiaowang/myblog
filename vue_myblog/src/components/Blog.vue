<template>
<div  class="blog_box">
  <div class="search_box">
  <input type="text" class="lookBlog" placeholder="想查查什么呢" >
  <button class="blogBtn">查找</button>
</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.blog_box{
  width:100%;
  height:650px;
}
.search_box{
width: 1000px;
height: 50px;
margin: auto;
margin-top:200px;
}
.lookBlog{
  width:800px;
  height:50px;
  border-radius: 25px;
  border: 1px solid #e0e0e0;
  outline: none;
  background: none;
  margin-right: 20px;
  text-indent: 20px;
}
.lookBlog::placeholder{

}
.blogBtn{
  width: 100px;
  height: 50px;
  border-radius: 25px;
  outline: none;
  background: #40a0ff67;
  border: none;

}

</style>
