import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from "@/store/user/user";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    meta: { title: "authorization", logged: false },
    component: () => import("../views/User/LoginView.vue"),
  },
  {
    path: "/register",
    name: "Registration",
    meta: { title: "registration", logged: false },
    component: () => import("../views/User/RegistrationView.vue"),
  },
  {
    path: "/persons",
    name: "Persons",
    meta: { title: "persons", logged: true },
    component: () => import("../views/OnlyLogged/PersonsView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title as string;
  const isAuth: boolean = store.state.logged;
  if (to.meta.logged && !isAuth) {
    next("/");
  } else if (!to.meta.logged && isAuth) {
    next("/persons");
  } else {
    next();
  }
});

export default router;
