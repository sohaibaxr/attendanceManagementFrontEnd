import Vue from 'vue'
import Router from 'vue-router'
import RegisterUser from '../views/RegisterUser'
import LoginUser from '../views/LoginUser'
import Student from "../views/Student"
import Teacher from "../views/Teacher"
import Admin from "../views/Admin"
import auth from "../middleware/auth"

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
      meta: {
        middleware: [auth],
      },
    },
    {
      path: '/home/teacher',
      name: 'teacher',
      component: Teacher,
      meta: {
        middleware: [auth],
      },
    },
    {
      path: '/home/student',
      name: 'student',
      component: Student,
      meta: {
        middleware: [auth],
      },
    }
  ],
  mode: 'history',
  base: process.env.BASE_URL,
})

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);
    return middleware[0]({ ...context, next: nextMiddleware });
  }
  return next();
});

export default router

