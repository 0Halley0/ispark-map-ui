import { createRouter, createWebHistory } from "vue-router";
import LeafletMap from "../components/LeafletMap.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: LeafletMap,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
