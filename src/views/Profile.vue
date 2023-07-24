<template>
  <div class="main-wrapper" id="main-wrapper">
    <Header/>
    <!-- Page Wrapper -->
    <div class="page-wrapper">
      <div class="content container-fluid">

        <!-- Page Header -->
        <div class="page-header">
          <div class="row">
            <div class="col-sm-12">
              <h3 class="page-title">Profil</h3>
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/">Dashboard</router-link>
                </li>
                <li class="breadcrumb-item active">Profil</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- /Page Header -->

        <div class="row" v-if="user">
          <div class="col-xl-12 d-flex">
            <div class="card flex-fill">
              <div class="card-header">
                <h5 class="card-title">Benutzer Informationen</h5>
              </div>
              <div class="card-body">
                <div class="card card-table">
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-center table-hover datatable">
                        <thead class="thead-light">
                        <tr>
                          <th>Daten</th>
                          <th>Wert</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td><b>Vorname</b></td>
                          <td>{{ user.given_name }}</td>
                        </tr>
                        <tr>
                          <td><b>Nachname</b></td>
                          <td>{{ user.family_name }}</td>
                        </tr>
                        <tr>
                          <td><b>Vollständiger Name</b></td>
                          <td>{{ user.name }}</td>
                        </tr>
                        <tr>
                          <td><b>Session State</b></td>
                          <td>{{ user.session_state }}</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- /Page Wrapper -->
  </div>
</template>

<script>
import Header from "../App.vue";

export default {
  name: 'Profile',
  components: {Header},
  data() {
    return {
      user: null
    }
  },
  async created() {
    this.$auth.on('user_login', ({user}) => {
      this.user = user
    })
    this.$auth.on('user_logout', () => {
      this.user = null
    })
    this.user = await this.$auth.getUser()
  },
}
</script>
