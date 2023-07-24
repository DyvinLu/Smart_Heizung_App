import {defineStore} from 'pinia';
const BASE_URL = "https://api.dev.heating.idial.institute"
const state = () => ({
  userInfos : {},
  rooms: [],
  selectedRoom: undefined,
  selectedSchedule: undefined,
  selectedRoomSchedules: [],
  pauses: [],
  toastOptions: {},
  createdSchedule: undefined
})

const actions = {
  async fetchRooms(token) {
    try {
      const response = await fetch (BASE_URL + '/rooms/', {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
      this.rooms = await response.json()
    } catch (error) {
      console.log(error);
    }
  },
  async fetchSchedule(request,token) {
    try {
      const response = await fetch (BASE_URL + '/rooms/' + request.roomNumber + '/schedules/' +
        request.scheduleId, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
      this.selectedSchedule = await response.json()
      console.log("SELECTED:", this.selectedSchedule)
      this.pauses = this.selectedSchedule.pauses
    } catch (error) {
      console.log(error);
    }
  },
  async addPause(request,token) {
    try {
      const param = {
        start: request.start,
        stop: request.stop
      }
      const response = await fetch (BASE_URL + '/rooms/' + request.roomNumber + '/schedules/' + request.scheduleId + '/pause', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
      })
      const scheduleParam = {
        roomNumber: request.roomNumber,
        scheduleId: request.scheduleId
      }
      await this.fetchSchedule(scheduleParam, token)

      this.toastOptions = {
        title: 'Created!',
        text: 'The Pause has been Created.',
        icon: 'success',
        toast: true,
        position: 'top-right',
      }
    } catch (error) {
      this.toastOptions = {
        title: 'Something gone wrong 🥲!',
        text: error,
        icon: 'error',
        toast: true,
        position: 'top-right',
      }
      console.log(error);
    }
  },
  async deletePause(param, token) {
    try {
      await fetch (BASE_URL + '/rooms/' +param.roomNumber + '/schedules/' + param.schedule + '/pause/' + param.pause, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      this.pauses = this.pauses.filter( pause => {
        return pause.id !== param.pause
      })

      this.toastOptions = {
        title: 'Deleted!',
        text: 'The Pause has been successfully deleted.',
        icon: 'success',
        toast: true,
        position: 'top-right',
      }
    } catch (error) {
      this.toastOptions = {
        title: 'Something gone wrong 🥲!',
        text: error,
        icon: 'error',
        toast: true,
        position: 'top-right',
      }
      console.log(error);
    }
  },
  async findRoom(roomNumber, token) {
    try {
      const room = await fetch (BASE_URL + '/rooms/' + roomNumber, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })

      this.selectedRoom = await room.json()

      const schedules = await fetch (BASE_URL + '/rooms/' + roomNumber + '/schedules/', {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
      this.selectedRoomSchedules = await schedules.json()
    } catch (error) {
      console.log(error);
    }
  },

  async createSchedule(param, roomNumber, token) {
    try {
      const schedules = await fetch (BASE_URL + '/rooms/' +roomNumber + '/schedules/', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
      })

      const response = await schedules.json()
      this.createdSchedule = response
      this.selectedRoomSchedules.push(response)

      this.toastOptions = {
        title: 'Created!',
        text: 'The Schedule has been Created.',
        icon: 'success',
        toast: true,
        position: 'top-right',
      }
    } catch (error) {
      this.toastOptions = {
        title: 'Something gone wrong 🥲!',
        text: error,
        icon: 'error',
        toast: true,
        position: 'top-right',
      }
      console.log(error);
    }
  },

  async updateSchedule(param, roomNumber, token) {
    try {
      const schedule = await fetch (BASE_URL + '/rooms/' +roomNumber + '/schedules/' +
        param.id, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
      })

      this.toastOptions = {
        title: 'Updated!',
        text: 'The Schedule has been updated.',
        icon: 'success',
        toast: true,
        position: 'top-right',
      }
    } catch (error) {
      this.toastOptions = {
        title: 'Something gone wrong 🥲!',
        text: error,
        icon: 'error',
        toast: true,
        position: 'top-right',
      }
      console.log(error);
    }
  },

  async deleteSchedule(param, token) {
    try {
      await fetch (BASE_URL + '/rooms/' +param.roomNumber + '/schedules/' + param.schedule, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      this.selectedRoomSchedules = this.selectedRoomSchedules.filter( schedule => {
        return schedule.id !== param.schedule
      })

      this.toastOptions = {
        title: 'Deleted!',
        text: 'The Schedule has been successfully deleted.',
        icon: 'success',
        toast: true,
        position: 'top-right',
      }
    } catch (error) {
      this.toastOptions = {
        title: 'Something gone wrong 🥲!',
        text: error,
        icon: 'error',
        toast: true,
        position: 'top-right',
      }
      console.log(error);
    }
  },

}

const useAppStore = defineStore('appStore' , {
  state,
  actions
});

export default useAppStore