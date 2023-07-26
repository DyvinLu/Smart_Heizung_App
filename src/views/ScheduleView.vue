<template>
  <div class="main-wrapper" id="main-wrapper">
    <Header/>
    <!-- Page Wrapper -->
    <div class="page-wrapper">
      <div class="content container-fluid">

        <div class="page-header">
          <div class="row">
            <div class="col-sm-12">
              <h3 class="page-title">Terminübersicht</h3>
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link to="/"><r>Dashboard</r></router-link>
                </li>
                <li class="breadcrumb-item active">Schedule</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="card flex-fill">
          <div class="card-header">
            <h5 class="card-title">Terminplan</h5>
          </div>
          <div class="card-body">
            <div class="card card-table">
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-center table-hover datatable">
                    <thead class="thead-light">
                    <tr>
                      <th>Datum</th>
                      <th>Start</th>
                      <th>Ende</th>
                      <th>Typ</th>
                      <th>Ziel T.</th>
                      <th>wiederkehrende Tage</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="store.selectedSchedule">
                      <td>{{ store.selectedSchedule.date }}</td>
                      <td>{{ store.selectedSchedule.start }}</td>
                      <td>{{ store.selectedSchedule.stop }}</td>
                      <td>{{ store.selectedSchedule.type }}</td>
                      <td>{{ store.selectedSchedule.target.temperature }} ℃</td>
                      <td>
                          <span v-for="(day,index) in store.selectedSchedule.recurringdays">
                              {{day}}<span v-if="index !== store.selectedSchedule.recurringdays.length - 1 ">, </span>
                          </span>
                      </td>

                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <template v-if="store.selectedSchedule">
          <div class="card flex-fill" v-if="store.selectedSchedule.type !== 'ONETIME'">
            <div class="card-header">
              <h5 class="card-title">Termine Pause</h5>
            </div>
            <div class="card-body">
              <div class="card card-table">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-center table-hover datatable">
                      <thead class="thead-light">
                      <tr>
                        <th>Anfang der Pause</th>
                        <th>Ende der Pause</th>
                        <th>Löschen</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="pause in store.pauses">
                        <td>{{ globalUtils.formatDateTime(pause.start) }}</td>
                        <td>{{ globalUtils.formatDateTime(pause.stop) }}</td>
                        <td>
                          <button class="btn btn-primary" @click="deletePause(pause.id)">Löschen <i
                            class="feather-trash-2"></i></button>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row" >
            <div class="col-xl-6 d-flex" v-if="store.selectedSchedule.type !== 'ONETIME'">
              <div class="card flex-fill">
                <div class="card-header">
                  <h5 class="card-title">Pause hinzufügen:</h5>
                </div>
                <div class="card-body">
                  <div class="form-group row">
                    <div class="col-md-6 mb-3">
                      <label>Anfangsdatum</label>
                      <div class="input-group">
                        <input type="datetime-local" class="form-control" v-model="startDate">
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Enddatum</label>
                      <div class="input-group">
                        <input type="datetime-local" class="form-control" v-model="stopDate">
                      </div>
                    </div>

                    <div class="text-end">
                      <button class="btn btn-primary" @click="addPause">Pause hinzufügen</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-6 d-flex">
              <div class="card flex-fill">
                <div class="card-header">
                  <h5 class="card-title">Termin ändern:</h5>
                </div>
                <div class="card-body">
                  <div class="form-group row">
                    <div class="col-md-12 mb-3">
                      <label>Datum</label>
                      <div class="input-group">
                        <input type="date" class="form-control" v-model="date">
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Startzeit</label>
                      <div class="input-group">
                        <input type="time" class="form-control" v-model="startTime">
                      </div>
                    </div>

                    <div class="col-md-6 mb-3">
                      <label>Endzeit</label>
                      <div class="input-group">
                        <input type="time" class="form-control" v-model="endTime">
                      </div>
                    </div>

                    <div class="col-md-6 mb-3">
                      <label>Häufigkeit</label>
                      <div class="input-group">
                        <select class="form-control" v-model="type">
                          <option value="RECURRING">Wiederkehrend</option>
                          <option value="ONETIME">Einmalig</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-md-6 mb-3">
                      <label>Wiederkehrende Tage</label>
                      <div class="d-flex">
                        <div class="ml-5">
                          <div class="checkbox">
                            <input type="checkbox" name="checkbox" value="MONDAY" v-model="recurringdays"> Montag
                          </div>
                          <div class="checkbox">
                            <input type="checkbox" name="checkbox" value="TUESDAY" v-model="recurringdays"> Dienstag
                          </div>
                          <div class="checkbox">
                            <input type="checkbox" name="checkbox" value="WEDNESDAY" v-model="recurringdays"> Mittwoch
                          </div>
                        </div>
                        <div>
                          <div class="checkbox">
                            <input type="checkbox" name="checkbox" value="THURSDAY" v-model="recurringdays"> Donnerstag
                          </div>
                          <div class="checkbox">
                            <input type="checkbox" name="checkbox" value="FRIDAY" v-model="recurringdays"> Freitag
                          </div>
                          <div class="checkbox">
                            <input type="checkbox" name="checkbox" value="SATURDAY" v-model="recurringdays"> Samstag
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 mb-3">
                      <label>Ziel Temperature</label>
                      <div class="input-group">
                        <input v-model="targetTemp" type="text" class="form-control" placeholder="22.5" required>
                      </div>
                    </div>

                    <div class="text-end">
                      <button class="btn btn-primary" @click="editSchedule">Termin hinzufügen</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>




      </div>
    </div>
    <!-- /Page Wrapper -->
  </div>
</template>

<script setup>
import Header from "../App.vue";
import {useRoute} from "vue-router";
import useAppStore from "../stores/appStore";
import {inject, onMounted, ref} from "vue";
import Swal from 'sweetalert2'
import globalUtils from "../helpers/globalUtils";

const startDate = ref()
const stopDate = ref()
const route = useRoute()
const store = useAppStore()
const roomID = route.params.roomId
const roomNumber = roomID.slice(0, 1) + "." + roomID.slice(1);
const scheduleID = route.params.scheduleId

const auth = inject('authConfig')

const date = ref()
const startTime = ref()
const endTime = ref()
const recurringdays = ref([])
const type = ref("")
const targetTemp = ref("")


function editSchedule() {
  if (recurringdays.value.length < 1)
    return;

  const param = {
    id: store.selectedSchedule.id,
    type: type.value,
    date: date.value,
    start: startTime.value,
    stop: endTime.value,
    target: {
      temperature: targetTemp.value,
    },
    recurringdays: recurringdays.value,
    pauses: store.pauses
  }

  store.updateSchedule(param, roomNumber, auth.accessToken).then(() => {
    Swal.fire(store.toastOptions)

    store.selectedSchedule.type = param.type
    store.selectedSchedule.date = param.date
    store.selectedSchedule.start = param.start
    store.selectedSchedule.stop = param.stop
    store.selectedSchedule.target = param.target
    store.selectedSchedule.recurringdays = param.recurringdays
    store.selectedSchedule.pauses = param.pauses

    store.toastOptions = {}
  }).catch(() => {
    Swal.fire(store.toastOptions)
    store.toastOptions = {}
  })
}

function setCurrentDate(time) {
  const timestamp = Date.now();
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  time.value = `${year}-${month}-${day}`;
}

onMounted(() => {
  const request = {
    scheduleId: scheduleID,
    roomNumber: roomNumber
  }
  store.fetchSchedule(request, auth.accessToken).then( () => {
    date.value = store.selectedSchedule.date
    startTime.value = store.selectedSchedule.start
    endTime.value = store.selectedSchedule.stop
    recurringdays.value = store.selectedSchedule.recurringdays
    type.value = store.selectedSchedule.type
    targetTemp.value = store.selectedSchedule.target.temperature
  })
  setCurrentDate(startDate)
  setCurrentDate(stopDate)
});

function addPause() {
  const param = {
    scheduleId: scheduleID,
    roomNumber: roomNumber,
    start: startDate.value,
    stop: stopDate.value
  }
  store.addPause(param, auth.accessToken).then(() => {
    Swal.fire(store.toastOptions)
    store.toastOptions = {}
  }).catch(() => {
    Swal.fire(store.toastOptions)
    store.toastOptions = {}
  })
}

function deletePause(id) {
  const param = {
    roomNumber: roomNumber,
    schedule: scheduleID,
    pause: id
  }

  Swal.fire({
    title: 'Delete Pause',
    text: "Do you really want to delete this pause ?!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      store.deletePause(param, auth.accessToken).then(() => {
        Swal.fire(store.toastOptions)
        store.toastOptions = {}
      }).catch(() => {
        Swal.fire(store.toastOptions)
        store.toastOptions = {}
      })
    }
  })
}
</script>

<style scoped>
.ml-5 {
  margin-right: 15px;
}
</style>