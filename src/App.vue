<template>
  <div id="app">
    <h1>黑马头条</h1>
    <i class="toutiao toutiao-lishi"></i>
    <br />
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>

    <p class="ceshi">测试</p>
  </div>
</template>

<script>
export default {
  created () {},
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.ceshi {
  font-size: 20px;
}
</style>
