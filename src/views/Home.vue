<template>
  <div class="home">
    <story-gallery :stories="stories" />
    <a href=https://github.com/carterdmorgan/creative-project-5>GitHub Repo</a>
  </div>
</template>

<script>
// @ is an alias to /src
import StoryGallery from '@/components/StoryGallery.vue'

export default {
  name: 'home',
  components: {
    StoryGallery
  },
  computed: {
    stories() {
      return this.$store.state.stories;
    }
  },
  async created() {
    await this.$store.dispatch("getAllStories");
  },
}
</script>
