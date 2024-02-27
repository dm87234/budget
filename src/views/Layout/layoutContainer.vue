<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const logOut = () => {
  router.push('/login')
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <div class="middle">
          <router-link to="/home">
            <font-awesome-icon :icon="['fas', 'house']" />
            <span class="menuText">首頁</span>
          </router-link>
          <router-link to="/budget">
            <font-awesome-icon :icon="['fas', 'magnifying-glass-dollar']" />
            <span class="menuText">預算</span>
          </router-link>
          <router-link to="/chart">
            <font-awesome-icon :icon="['fas', 'chart-column']" />
            <span class="menuText">圖表</span>
          </router-link>
          <router-link to="/settings">
            <font-awesome-icon :icon="['fas', 'gear']" />
            <span class="menuText">設定</span>
          </router-link>
        </div>
        <div @click="logOut" class="bottom">
          <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
          <span class="menuText">登出</span>
        </div>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <div class="rwdMenu">
      <router-link to="/home">
        <font-awesome-icon :icon="['fas', 'house']" />
        <div class="menuText">首頁</div>
      </router-link>
      <router-link to="/budget">
        <font-awesome-icon :icon="['fas', 'magnifying-glass-dollar']" />
        <div class="menuText">預算</div>
      </router-link>
      <router-link to="/chart">
        <font-awesome-icon :icon="['fas', 'chart-column']" />
        <div class="menuText">圖表</div>
      </router-link>
      <router-link to="/settings">
        <font-awesome-icon :icon="['fas', 'gear']" />
        <div class="menuText">設定</div>
      </router-link>
      <div @click="logOut" class="bottom">
        <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
        <div class="menuText">登出</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.common-layout {
  height: 100%;
  background: #f8d1b4;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  @include mobile {
    height: 90vh;
    padding: 0;
    margin-top: 0;
  }
  @include pad {
    height: 90vh;
    padding: 0;
    margin-top: 0;
  }

  .el-container {
    height: 90%;
    @include mobile {
      height: 100%;
    }
    @include pad {
      height: 100%;
    }
    .el-aside {
      font-size: 26px;
      color: $white_color;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      padding: 80px 0 80px 22px;
      width: 128px;
      background: #e37b58;
      border-radius: 20px 0 0 20px;

      @include mobile {
        display: none;
      }
      @include pad {
        display: none;
      }
      .middle {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 50px;
        a {
          color: white;
          display: flex;
          align-items: center;
          @include transition_ease;
          &:hover {
            color: #ffe6b1;
          }
        }

        .router-link-active {
          color: #ffe6b1;
        }
        .menuText {
          font-size: 18px;
          margin-left: 8px;
        }
      }

      .bottom {
        display: flex;
        align-items: center;
        cursor: pointer;
        @include transition_ease;
        &:hover {
          color: #ffe6b1;
        }
        .menuText {
          font-size: 18px;
          margin-left: 8px;
        }
      }
    }

    .el-main {
      padding: 10px;
      background: #fdf7eb;
      position: relative;
      // border-radius: 0 20px 20px 0;
      border-radius: 20px;
      left: -15px;
      @include mobile {
        left: 0;
        border-radius: 0;
      }
      @include pad {
        left: 0;
        border-radius: 0;
      }
    }
  }
  .rwdMenu {
    display: none;
    @include mobile {
      width: 100vw;
      height: 10vh;
      background: #e37b58;
      display: flex;
      align-items: center;
      position: fixed;
      bottom: 0;
      a,
      .bottom {
        color: white;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        font-size: 18px;
      }
    }
    @include pad {
      width: 100vw;
      height: 10vh;
      background: #e37b58;
      display: flex;
      align-items: center;
      position: fixed;
      bottom: 0;
      a,
      .bottom {
        color: white;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        font-size: 24px;
      }
    }
  }
}
</style>
