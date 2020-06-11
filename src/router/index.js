import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/incomeexpense",
    name: "IncomeExpense",
    component: () => import("../views/IncomeExpense.vue")
  },
  {
    path: "/transfer",
    name: "Transfer",
    component: () => import("../views/Transfer.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue")
  },
  {
    path: "/accounts",
    name: "Accounts",
    component: () => import("../views/Accounts.vue")
  },
  {
    path: "/categories",
    name: "Categories",
    component: () => import("../views/Categories.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
