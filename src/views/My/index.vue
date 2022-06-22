<template>
  <div class="my-container">
    <!-- 已登录的头部 -->
    <div v-if="user" class="header in-login">
      <div class="title">
        <div class="left">
          <van-image round fit="cover" class="img" :src="userInfo.photo" />
          <span class="text">{{ userInfo.name }}</span>
        </div>
        <van-button type="default" round size="mini">编辑资料</van-button>
      </div>
      <div class="content">
        <div class="content-item">
          <span class="num">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="content-item">
          <span class="num">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="content-item">
          <span class="num">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="content-item">
          <span class="num">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录的头部 -->
    <div v-else class="header not-login">
      <img
        class="mobile-img"
        src="~@/assets/mobile.png"
        @click="$router.push('/login')"
      />
      <span class="text">登录 / 注册</span>
    </div>

    <!-- 收藏和历史 -->
    <van-grid clickable class="nav-grid" :column-num="2">
      <van-grid-item>
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
        <template #text>
          <span class="text">收藏</span>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
        <template #text>
          <span class="text">历史</span>
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 单元格 -->
    <van-cell title="消息通知" is-link clickable />
    <van-cell title="小智同学" is-link clickable />

    <!-- 退出单元格 -->
    <van-cell
      v-if="user"
      @click="onLogout"
      center
      class="logout-cell"
      title="退出登录"
      clickable
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyPage',
  components: {},
  props: {},
  data () {
    return {
      userInfo: {} // 用户信息
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    // 初始化的时候，如果用户登录了，我才请求获取当前登录用户的信息
    if (this.user) {
      this.loadUser()
    }
  },
  mounted () {},
  methods: {
    async loadUser () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        // console.log(this.userInfo);
      } catch (err) {
        console.log(err)
        this.$toast('获取数据失败')
      }
    },
    onLogout () {
      // 退出提示
      // 在组件中需要使用 this.$dialog 来调用弹框组件
      this.$dialog
        .confirm({
          title: '确认退出吗？'
        })
        .then(() => {
          // on confirm
          // 确认退出：清除登录状态（容器中的 user + 本地存储中的 user）
          // console.log("确认执行这里");
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
          // console.log("取消执行这里");
        })
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 360px;
    background: url("~@/assets/banner.png") no-repeat;
    background-size: cover;
  }
  .not-login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    .mobile-img {
      width: 132px;
      height: 132px;
    }
    .text {
      margin-top: 10px;
      font-size: 36px;
    }
  }
  .in-login {
    .title {
      box-sizing: border-box;
      height: 231px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 76px 32px 23px;
      .left {
        display: flex;
        align-items: center;
        .img {
          width: 132px;
          height: 132px;
          border: 2px solid #fff;
        }
        .text {
          font-size: 29px;
          margin-left: 22px;
          color: #fff;
        }
      }
      .van-button {
        padding: 0 16px;
      }
    }
    .content {
      display: flex;
      align-items: center;
      color: #fff;
      .content-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span.num {
          font-size: 36px;
        }
        span.text {
          font-size: 22px;
        }
      }
    }
  }
  .nav-grid {
    background: #fff;
    .toutiao {
      font-size: 45px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    .text {
      color: #000;
      margin-top: 8px;
      font-size: 28px;
    }
  }
  .logout-cell {
    margin-top: 10px;
    text-align: center;
    color: #d86262;
  }
}
</style>
