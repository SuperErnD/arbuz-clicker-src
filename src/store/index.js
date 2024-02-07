import { createStore } from 'vuex'
import user from "@/store/user/user";
import boost from "@/store/boost/boost";
import websocket from "@/store/websocket/websocket";
import squad from "@/store/squad/squad";

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: user,
    boost: boost,
    websocket: websocket,
    squad: squad
  }
})
