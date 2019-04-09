<template>
  <div class="home">
    <story-gallery :single="true" :stories="stories" />

    <div class="comment-box" v-for="comment in comments" :key="comment._id">
        <p>
            <span style="font-weight:bold">{{comment.username}}  </span>
            <span style="font-style:italic">{{formatDate(comment.date)}}</span>
        </p>
        <p>{{comment.text}}</p>
    </div>

    <form v-if="user" @submit.prevent="uploadComment" class="pure-form pure-form-stacked">
        <fieldset>
        <div class="pure-control-group">
            <label>Comment</label>
            <textarea v-model="text"/>
        </div>

        <div class="pure-controls">
            <button type="submit" class="pure-button pure-button-primary">Submit</button>
        </div>
        </fieldset>
    </form>

  </div>
 
</template>

<script>
import moment from 'moment';
// @ is an alias to /src
import StoryGallery from '@/components/StoryGallery.vue'

export default {
  name: 'story',
  components: {
    StoryGallery
  },
  props: {
    storyId: String
  },
  data() {
    return {
      text: '',
    }
  },
  computed: {
    user() {
        return this.$store.state.user;
    },
    stories() {
      console.log("stories")
      console.log(this.$store.state.stories)
        return this.$store.state.stories;
    },
    comments() {
        return this.$store.state.comments;
    }
  },
  methods: {
      async uploadComment() {
        let comment = {
            text: this.text,
            user: this.user,
            storyId: this.storyId
        }
        this.text = '';
        await this.$store.dispatch("uploadComment", comment)
        await this.$store.dispatch("getComments", this.storyId);
      },
      formatDate(date) {
            if (moment(date).diff(Date.now(), 'days') < 15)
            return moment(date).fromNow();
            else
            return moment(date).format('d MMMM YYYY');
      }  
  },
  async created() {
    await this.$store.dispatch("getComments", this.storyId);
    await this.$store.dispatch("getSingleStory", this.storyId);
    await this.$store.dispatch("getUser");
  },
}
</script>

<style scoped>
.comment-box {
    background-color: 	#E8E8E8;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
}
</style>