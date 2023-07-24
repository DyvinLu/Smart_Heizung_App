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
              <h3 class="page-title">Startseite</h3>
              <ul class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
                <li class="breadcrumb-item active">Startseite</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- /Page Header -->


        <div class="row">
          <!-- Blog Post -->

          <template v-if="appStore.rooms.length > 0">
            <div class="col-md-6 col-xl-4 col-sm-12 d-flex" v-for="room in appStore.rooms" :key="room.roomNumber">
              <RaumBox :roomNumber="room.roomNumber" :current_temp="room.currentTemperature.temperature"
                       :target_temp="room.targetTemperature.temperature" :desc="room.roomDescription"
                       :type="room.topics[0].deviceType"/>

            </div>
          </template>

        </div>

      </div>
    </div>
    <!-- /Page Wrapper -->
  </div>
</template>

<script>
import RaumBox from "../components/RaumBox.vue";
import Header from "../App.vue";
import useAppStore from "../stores/appStore";

export default {
  name: 'Home',
  components: {Header, RaumBox},
  data() {
    return {
      user: null,
      token: this.$auth.accessToken,
      appStore: useAppStore(),
    }
  },
  async created() {

  },
  async mounted() {
    if (this.token !== undefined) {
      await this.appStore.fetchRooms(this.token)
    }
  }
}
</script>
