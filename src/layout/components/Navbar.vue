<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <!-- <breadcrumb class="breadcrumb-container" /> 不使用这个面包屑 -->
    <div class="cpmpany-name">
      万帆集团股份有限公司
      <el-tag>尊享版</el-tag>
    </div>
    <div class="right-menu">
      <Screenfull class="right-menu-item"></Screenfull>
      <!-- 头像显示 -->
      <el-dropdown
        class="avatar-container right-menu-item"
        @command="handleCommand"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <div class="user">
            <img
              :src="staffPhoto"
              v-imgerror="require('@/assets/common/head.jpg')"
              class="user-avatar"
            />
            <span class="name">{{ username }}</span>
            <i class="el-icon-caret-bottom" />
          </div>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided command="logout">
            <span style="display:block;">注销</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'

export default {
  components: {
    Screenfull,
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(['sidebar', 'staffPhoto', 'username'])
  },
  methods: {
    ...mapActions('user', ['logout']),
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    },
    handleCommand (command) {
      switch (command) {
        case 'logout':
          // 注销
          this.handleLogout()
          break

        default:
          break
      }
    },
    async handleLogout () {
      /**
       * 注销逻辑：
       * 1.清除token
       * 2.重置路由（因为是动态添加的路由）
       * 3.请求注销接口(不涉及)
       * 4.跳转到登录页面（不带回跳地址）
       */
      this.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  background-image: -webkit-linear-gradient(left, #3d6df8, #5b8cff);

  .hamburger-container {
    fill: #fff; // svg改变颜色使用fill填充
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      color: #fff;
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 15px;
          vertical-align: middle;
        }
        .name {
          color: #fff;
          font-size: 14px;
          vertical-align: middle;
          margin-left: 5px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          vertical-align: middle;
        }
      }
    }
  }
  .user {
    cursor: pointer;
  }
  .cpmpany-name {
    display: inline-block;
    color: #fff;
    font-size: 18px;
    font-weight: 400;
    line-height: 50px;
    ::v-deep .el-tag {
      font-size: 16px;
      border-radius: 20px;
      cursor: pointer;
      margin-left: 10px;
    }
  }
}
</style>
