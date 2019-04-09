import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    stories: [],
    comments: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setStories(state, stories) {
      state.stories = stories;
    },
    setComments(state, comments) {
      state.comments = comments;
    }
  },
  actions: {
    async register(context, data) {
      try {
        let response = await axios.post("/api/users", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit('setUser', null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async upload(context, data) {
      try {
        console.log("form data\n" + data)
        await axios.post('/api/stories', data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getMyStories(context) {
      try {
        let response = await axios.get("/api/stories");
        context.commit('setStories', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getAllStories(context) {
      try {
        let response = await axios.get("/api/stories/all");
        context.commit('setStories', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getSingleStory(context, id) {
      try {
        let response = await axios.get("/api/story/"+id);
        context.commit('setStories', response.data);
        console.log("response")
        console.log(response)
        return "";
      } catch (error) {
        return "";
      }
    },
    async getComments(context, id) {
      try {
        let response = await axios.get("/api/comments/" + id);
        context.commit('setComments', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async uploadComment(context, data) {
      try {
        await axios.post('/api/comments', data);
        return "";
      } catch (error) {
        return "";
      }
    }
  }
})
