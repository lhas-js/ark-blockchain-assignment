import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Generate from "../views/Generate.vue";
import Explore from "../views/Explore.vue";
import ExploreWallet from "../views/explore/Wallet.vue";
import ExploreWalletVoters from "../views/explore/WalletVoters.vue";
import ExploreDelegates from "../views/explore/Delegates.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/generate",
    name: "generate",
    component: Generate
  },
  {
    path: "/explore",
    name: "explore",
    component: Explore
  },
  {
    path: "/explore/wallet/:wallet",
    name: "exploreWallet",
    component: ExploreWallet
  },
  {
    path: "/explore/delegates",
    name: "exploreDelegates",
    component: ExploreDelegates
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
