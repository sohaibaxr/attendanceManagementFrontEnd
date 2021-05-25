import Vue from 'vue';
export default function auth({ next, router, }) {
    const token=Vue.cookie.get("token")
    if (!token) {
      return router.push({ name: 'login' });
    }
    return next();
  }