<template>
  <div class="main-wrapper" id="main-wrapper">
    <Header/>
    <!-- Page Wrapper -->
    <div class="page-wrapper">
      <div class="content container-fluid">

        <div class="page-header">
          <div class="row">
            <div class="col-sm-12">
              <h3 class="page-title">Raum Item</h3>
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/">Dashboard</router-link>
                </li>
                <li class="breadcrumb-item active">{{ roomNumber }}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="row" v-if="store.selectedRoom">
          <div class="col-xl-6 d-flex">
            <div class="card flex-fill">
              <div class="card-header">
                <h5 class="card-title">Termin erstellen:</h5>
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
                    <button class="btn btn-primary" @click="createSchedule">Termin hinzufügen</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-6 d-flex">
            <div class="card flex-fill">
              <div class="card-header">
                <h5 class="card-title">Raumnutzer</h5>
              </div>
              <div class="card-body">
                <div class="card card-table">
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-center table-hover datatable">
                        <thead class="thead-light">
                        <tr>
                          <th>Vorname</th>
                          <th>Nachname</th>
                          <th>Raumnummer</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="user in store.selectedRoom.users">
                          <td>
                            <h2 class="table-avatar">
                              <a href="#">{{ user.givenName }}</a>
                            </h2>
                          </td>
                          <td>{{ user.lastName }}</td>
                          <td>{{ user.roomNumber !== null ? user.roomNumber : '-' }}</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-12 d-flex" v-if="store.selectedRoomSchedules">
            <div class="card flex-fill">
              <div class="card-header">
                <h5 class="card-title">Termine</h5>
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
                          <th>Bearbeiten</th>
                          <th>Löschen</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="schedule in globalUtils.orderByDate(store.selectedRoomSchedules)">
                          <td>{{ schedule.date }}</td>
                          <td>{{ schedule.start }}</td>
                          <td>{{ schedule.stop }}</td>
                          <td>{{ schedule.type }}</td>
                          <td>{{ schedule.target.temperature }} ℃</td>
                          <td>
                            <span v-for="(day,index) in schedule.recurringdays">
                              {{day}}<span v-if="index !== schedule.recurringdays.length - 1 ">, </span>
                            </span>
                          </td>
                          <td>
                            <router-link :to="`/schedule/${id}/${schedule.id}`" class="btn btn-primary reset-color">
                              <i class="feather-edit"></i>
                            </router-link>
                          </td>
                          <td>
                            <button @click="deleteSchedule(schedule.id)" class="btn btn-primary reset-color"><i
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
          </div>

          <div class="col-xl-12 d-flex">
            <div class="card flex-fill">
              <div class="card-header">
                <h5 class="card-title">Terminkalender</h5>
              </div>
              <div class="card-body">
                <FullCalendar :options="calendarOptions" >
                  <template v-slot:eventContent='arg'>
                    <div style="cursor: pointer !important;" @click="goToSchedule(arg.event.extendedProps.scheduleId)">
                      <p>{{arg.event.extendedProps.scheduleStart.slice(0, -3)}} - {{arg.event.extendedProps.scheduleStop.slice(0, -3)}}</p>
                      <i>{{ arg.event.title }}</i>
                    </div>
                  </template>
                </FullCalendar>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- /Page Wrapper -->
  </div>
</template>

<script setup>
import Header from "../App.vue";
import {useRoute, useRouter} from "vue-router";
import useAppStore from "../stores/appStore";
import {inject, onMounted, ref, watch} from "vue";
import Swal from 'sweetalert2'
import globalUtils from "../helpers/globalUtils";
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const route = useRoute()
const router = useRouter()
const store = useAppStore()
const id = route.params.id
const roomNumber = id.slice(0, 1) + "." + id.slice(1);
const auth = inject('authConfig')

const date = ref()
const startTime = ref()
const endTime = ref()
const recurringdays = ref([])
const type = ref("RECURRING")
const targetTemp = ref("22.5")

const calendarOptions = ref({
  plugins: [ dayGridPlugin, interactionPlugin ],
  initialView: 'dayGridMonth',
  events: []
})

onMounted(() => {
  setCurrentDate(date);
});

watch(calendarOptions, (newValue, oldValue) => {
  console.log('calendarOptions changed:', newValue);
},  { deep: true });

function goToSchedule(scheduleId){
  router.push(`/schedule/${id}/${scheduleId}`)
}

function setCurrentDate(time) {
  const timestamp = Date.now();
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  time.value = `${year}-${month}-${day}`;
}

function findRoom(auth) {
  store.findRoom(roomNumber, auth.accessToken).then(() => {
    let events = []
    store.selectedRoomSchedules.forEach( schedule => {
      if(schedule.type === "ONETIME"){
        events.push({
          title: schedule.type,
          scheduleStart: schedule.start,
          scheduleStop: schedule.stop,
          scheduleId: schedule.id,
          date: schedule.date,
          backgroundColor: "#FF9CB6"
        })
      }else {
        let generatedEvents = generateEventsForYear(schedule)
        events = [...events , ...generatedEvents]
      }
    })

    calendarOptions.value["events"] = events
  })
}


findRoom(auth)

function createSchedule() {
  if (recurringdays.value.length < 1)
    return;

  const param = {
    type: type.value,
    date: date.value,
    start: startTime.value + ":00",
    stop: endTime.value + ":00",
    target: {
      temperature: targetTemp.value,
    },
    recurringdays: recurringdays.value,
    pauses: []
  }

  store.createSchedule(param, roomNumber, auth.accessToken).then(() => {
    Swal.fire(store.toastOptions)

    let events = []
    if(param.type === "ONETIME"){
      events.push({
        title: param.type,
        scheduleStart: param.start,
        scheduleStop: param.stop,
        scheduleId: store.createdSchedule.id,
        date: param.date,
        backgroundColor: "#FF9CB6"
      })
    } else {
      events = generateEventsForYear(store.createdSchedule)
    }
    calendarOptions.value["events"] =[...calendarOptions.value["events"] , ...events]
    store.toastOptions = {}
  }).catch(() => {
    Swal.fire(store.toastOptions)
    store.toastOptions = {}
  })
}

function deleteSchedule(id) {
  const param = {
    roomNumber: roomNumber,
    schedule: id
  }

  Swal.fire({
    title: 'Delete Schedule',
    text: "Do you really want to delete this schedule ?!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      calendarOptions.value.events = calendarOptions.value.events.filter( event => {
        return event.scheduleId !== id
      })
      store.deleteSchedule(param, auth.accessToken).then(() => {
        Swal.fire(store.toastOptions)
        store.toastOptions = {}
      }).catch(() => {
        Swal.fire(store.toastOptions)
        store.toastOptions = {}
      })
    }
  })
}

function generateEventsForYear(schedule) {
  const recurringdays = schedule.recurringdays;
  const startDate = new Date(schedule.date);
  const endDate = new Date(startDate);
  endDate.setFullYear(endDate.getFullYear() + 1);

  const events = [];
  const pauses = schedule.pauses;

  while (startDate < endDate) {
    const dayName = getDayName(startDate);

    if (recurringdays.includes(dayName) && !isInPauseRange(startDate, pauses)) {
      const event = {
        title: schedule.type,
        scheduleStart: schedule.start,
        scheduleStop: schedule.stop,
        backgroundColor: "#7638ff",
        scheduleId: schedule.id,
        date: startDate.toISOString().slice(0, 10) // Format date as YYYY-MM-DD
      };
      events.push(event);
    }

    startDate.setDate(startDate.getDate() + 1);
  }

  return events;
}

function getDayName(date) {
  const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  return days[date.getDay()];
}

function isInPauseRange(date, pauses) {
  for (const pause of pauses) {
    const pauseStart = new Date(pause.start);
    const pauseStop = new Date(pause.stop);
    if (date >= pauseStart && date <= pauseStop) {
      return true;
    }
  }
  return false;
}

</script>

<style scoped>
.ml-5 {
  margin-right: 15px;
}

.reset-color {
  color: white;
}

/deep/
.fc .fc-daygrid-day.fc-day-today{
  background-color: #a9a9a94a !important;
}
</style>