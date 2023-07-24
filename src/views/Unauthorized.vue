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
              <h3 class="page-title">Profile</h3>
              <ul class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/">Dashboard</router-link></li>
                <li class="breadcrumb-item active">Unauthorized</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- /Page Header -->

        <div class="row">
          <div class="col-12 d-flex">
            <div class="container">
              <p>Sie müssen sich einloggen, um die Seite zu sehen</p>
              <button class="btn btn-primary" @click="$auth.login()">Log in</button>
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
  name: 'Unauthorized',
  components: {Header}
}
</script>
