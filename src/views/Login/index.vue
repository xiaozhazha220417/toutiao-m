<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <template #left>
        <van-icon name="cross" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!--
      表单验证：
        1、给 van-field 组件配置 rules 验证规则
          参考文档：https://youzan.github.io/vant/#/zh-CN/form#rule-shu-ju-jie-gou
        2、当表单提交的时候会自动触发表单验证
           如果验证通过，会触发 submit 事件
           如果验证失败，不会触发 submit
     -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <!-- van-cell-group 仅仅是提供了一个上下外边框，能看到包裹的区域 -->
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          required
          clearable
          label="手机号"
          type="number"
          maxlength="11"
          placeholder="请输入手机号"
          :rules="userFormRules.mobile"
          name="mobile"
        >
          <template #left-icon>
            <i class="toutiao toutiao-shouji"></i>
          </template>
        </van-field>
        <van-field
          v-model="user.code"
          required
          label="验证码"
          type="number"
          maxlength="6"
          placeholder="请输入验证码"
          :rules="userFormRules.code"
          name="code"
        >
          <template #left-icon>
            <i class="toutiao toutiao-yanzhengma"></i>
          </template>

          <template #button>
            <van-count-down
              v-if="isCountDownShow"
              :time="1000 * 60"
              format="ss 秒"
              @finish="isCountDownShow = false"
            />
            <van-button
              v-else
              native-type="button"
              class="send-code-btn"
              size="small"
              round
              type="default"
              @click="onSendSms"
            >
              发送验证码
            </van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>
<script>
import { login, getSmsCode } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      isCountDownShow: false,
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      // 1. 获取表单数据
      const user = this.user

      // TODO: 2. 表单验证

      // 3. 提交表单请求登录
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认 2000，0 表示持续展示不关闭
      })

      try {
        const { data } = await login(user)
        // console.log(res);
        // console.log(res.data.data);
        this.$store.commit('setUser', data.data)
        // 提示 success 或者 fail 的时候，会先把其它的 toast 先清除
        this.$toast.success('登录成功')
        this.$router.push('/my')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },

    async onSendSms () {
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true

      // 3. 请求发送验证码
      try {
        await getSmsCode(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          console.log(err.message)
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          console.log(err.message)
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-code-btn {
    background-color: #ededed;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
