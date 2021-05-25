import Vue from 'vue'
import Router from 'vue-router'
import RegisterUser from '../views/RegisterUser'
import LoginUser from '../views/LoginUser'
import Student from "../views/Student"
import Teacher from "../views/Teacher"
import Admin from "../views/Admin"

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginUser,
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterUser,
    },
    {
      path: '/home/admin',
      name: 'admin',
      component: Admin,
      beforeEnter: authAdmin,

    },
    {
      path: '/home/teacher',
      name: 'teacher',
      component: Teacher,
      beforeEnter: authTeacher
    },
    {
      path: '/home/student',
      name: 'student',
      component: Student,
      beforeEnter: authStudent

    }
  ],
  mode: 'history',
  base: process.env.BASE_URL,
})

function authAdmin(to, from, next) {
  const authUser = Vue.cookie.get("token")
  const authRole = Vue.cookie.get("loggedInUserRole")
  
  if (authUser && authRole === "admin") {
    next()
  } else {
    if (authRole === "teacher") {
      router.push({ name: "teacher" })
    }else if(!authUser){
      router.push({name:"login"})
    }
     else {
      router.push({ name: "student" })
    }
  }
}
function authTeacher(to, from, next) {
  const authUser = Vue.cookie.get("token")
  const authRole = Vue.cookie.get("loggedInUserRole")
  if (authUser && (authRole === "teacher" || authRole === "admin")) {
    next()
  }
  else if(!authUser){
    router.push({name:"login"})
  } else {
    router.push({ name: "student" })
  }
}
function authStudent(to, from, next) {
  const authUser = Vue.cookie.get("token")
  const authRole = Vue.cookie.get("loggedInUserRole")
  if (authUser && (authRole === "student" || authRole === "admin")) {
    next()
  }else if(!authUser){
    router.push({name:"login"})
  }
   else {
    router.push({ name: "teacher" })
  }
}

export default router

