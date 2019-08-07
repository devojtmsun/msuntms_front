<template>
  <div>
  <a-layout id="components-layout-demo-responsive">
    <a-layout-sider
      breakpoint="lg"
      collapsedWidth="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
      v-if="authenticated"
    >
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']" >
        <a-menu-item key="1">
          <nuxt-link to="/"></nuxt-link>
          <a-icon type="home" />
          <span class="nav-text">Home</span>
        </a-menu-item>
        <a-menu-item key="2">
          <nuxt-link to="/course"></nuxt-link>
          <a-icon type="account-book" />
          <span class="nav-text">Course</span>
        </a-menu-item>
        <a-menu-item key="3">
          <nuxt-link to="/trainee"></nuxt-link>
          <a-icon type="user" />
          <span class="nav-text">Trainee</span>
        </a-menu-item>
        <a-menu-item key="4">
          <nuxt-link to="/school"></nuxt-link>
          <a-icon type="bank" />
          <span class="nav-text">School</span>
        </a-menu-item>
        <a-menu-item key="5">
          <nuxt-link to="/emergency"></nuxt-link>
          <a-icon type="team" />
          <span class="nav-text">Emergency Contacts</span>
        </a-menu-item>
        <a-menu-item key="6">
          <nuxt-link to="/training"></nuxt-link>
          <a-icon type="schedule" />
          <span class="nav-text">Trainings</span>
        </a-menu-item>
        <a-menu-item key="7">
          <!-- <nuxt-link to="/logout"></nuxt-link> -->
          <a-icon type="logout" />
          <a-popconfirm
            title="Sure to logout?"
            @confirm="() => logout()">
            <span class="nav-text">Logout</span>
          </a-popconfirm>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }" v-if="authenticated" />
      <a-layout-content :style="{ margin: '30px 16px 0' }" v-if="authenticated">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '559px' }">
          <nuxt />
        </div>
      </a-layout-content>
      <a-layout-content :style="{ margin: '118px 16px 0' }" v-if="!authenticated">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '559px' }">
          <nuxt />
        </div>
      </a-layout-content>
      <a-layout-footer style="textAlign: center" v-if="authenticated">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
  
  </div>
</template>
<script>
export default {
  
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
     async logout() {
      //  console.log('fuck')
      await this.$auth.logout();
      this.$router.push({
                path: '/auth/login'
          });
    },
  }
}
</script>

<style>
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
}
</style>
