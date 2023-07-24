<template>
  <!-- Header -->
  <div class="header header-one">

    <!-- Sidebar Toggle -->
    <a href="javascript:void(0);" id="toggle_btn">
      <i class="fas fa-bars"></i>
    </a>
    <!-- /Sidebar Toggle -->

    <!-- /Search -->

    <!-- Mobile Menu Toggle -->
    <a class="mobile_btn" id="mobile_btn">
      <i class="fas fa-bars"></i>
    </a>
    <!-- /Mobile Menu Toggle -->

  </div>
  <!-- /Header -->

  <!-- Sidebar -->
  <div class="sidebar" id="sidebar">
    <div class="sidebar-inner slimscroll"  >
      <div id="sidebar-menu" class="sidebar-menu">
        <ul>
          <!-- <li class="menu-title"><span>Main</span></li> -->
          <li>
            <RouterLink to="/"><i class="feather-home"></i> <span>Startseite</span></RouterLink>
          </li>
          <li>
            <RouterLink to="/profile" v-if="user"><i class="feather-users"></i> <span>{{userDisplayName}}</span></RouterLink>
          </li>
          <li>
            <a @click="$auth.logout()" v-if="user"><i class="feather-log-out"></i> <span>Logout</span></a>
            <a @click="$auth.login()" v-else><i class="feather-log-in"></i> <span>Login</span></a>
          </li>

        </ul>
      </div>
    </div>
  </div>
  <!-- /Sidebar -->
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  computed: {
    userDisplayName() {
      if (!this.user) {
        return null;
      } else {
        if (!this.user.given_name || !this.user.family_name) {
          return this.user.username || this.user.email || this.user.sub;
        }
        return `${this.user.given_name} ${this.user.family_name}`;
      }
    },
  },
  async created() {
    const loggedIn = await this.$auth.isLoggedIn(true)
    if(!loggedIn)
      this.$router.push("/unauthorized")
    this.$auth.on("user_login", ({ user }) => {
      this.user = user;
    });
    this.$auth.on("user_logout", () => {
      this.user = null;
    });
    this.user = await this.$auth.getUser();
  },
};
</script>
