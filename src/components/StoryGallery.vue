<template>
<div>
  <div class="image" v-for="story in stories" v-bind:key="story._id">
    <p class="storyTitle">{{story.title}}</p>
    <p class="storyDate">
      <span v-if="story.user.name">{{story.user.name}}, </span>
      {{formatDate(story.created)}}
    </p>
    <div v-if="single">
      <div class="story-box">
        {{story.content}}
        </div>
    </div>
    <div v-else>
      <a :href="'story/' + story._id">
        <div class="story-box">
        {{story.content}}
        </div>
      </a>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'StoryGallery',
    props: {
        single: Boolean,
        stories: Array
    },
    methods: {
        formatDate(date) {
            if (moment(date).diff(Date.now(), 'days') < 15)
            return moment(date).fromNow();
            else
            return moment(date).format('d MMMM YYYY');
        }
    },
    created() {
        console.log(this.single);
    }
}
</script>

<style scoped>
a {
  color: black;
    text-decoration: none;
}       

.story-box {
    background-color: 	#E8E8E8;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    white-space: pre-line;
}

.storyTitle {
  margin: 0px;
  font-size: 1.4em;
  font-weight: bold;
}

.storyDate {
  margin: 0px;
  font-size: 0.9em;
  font-weight: normal;
}

p {
  margin: 0px;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  max-width: 600px;
  max-height: 600px;
  image-orientation: from-image;
}
</style>