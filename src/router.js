import * as VueRouter from 'vue-router'
import { Auth } from "./auth.js";
import Home from "./views/Home.vue";
import Profile from "./views/Profile.vue";
import Unauthorized from "./views/Unauthorized.vue";
import AuthCallback from "./views/AuthCallback.vue";
import SilentRenew from "./views/SilentRenew.vue";
import ReservierungView from "./views/ReservierungView.vue";
import RaumDetailsView from "./views/RaumDetailsView.vue";
import ScheduleView from "./views/ScheduleView.vue";
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/callback', // Authentication redirect uri
    name: 'AuthCallback',
    component: AuthCallback
  },
  {
    path: '/silent-renew', // Token silent renew uri
    name: 'SilentRenew',
    component: SilentRenew
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {requiresAuth: true},
    component: Profile
  },
  {
    path: '/unauthorized', // Redirect to page if user not authorized
    name: 'unauthorized',
    component: Unauthorized
  },
  {
    path: '/reservierung',
    name: 'reservierung',
    component:ReservierungView
  },
  {
    path: '/details/:id',
    name: 'raumDetails',
    component: RaumDetailsView,
  },
  {
    path: '/schedule/:roomId/:scheduleId',
    name: 'schedule',
    component: ScheduleView,
  },
]

const Router = VueRouter.createRouter({
  history: VueRouter.createWebHistory('/'),
  routes
})


export { Router }
