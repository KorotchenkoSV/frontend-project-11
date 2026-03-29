import { fetchRss } from './controllers/rssController.js'

async function getRss(state) {
  const { posts, feed, description, guids } = await fetchRss(state.form.value)
  state.posts.push(...posts)
  state.feeds.push(feed)
  state.descriptions.push(description)
  guids.forEach(guid => state.guids.add(guid))
}

function rssPostsUpdate(state, url, timeout = 5000, onNewPosts = () => {}) {
  function tick() {
    fetchRss(url)
      .then(({ posts }) => {
        const newPosts = posts.filter(({ guid }) => !state.guids.has(guid))
        if (newPosts.length > 0) {
          state.posts.push(...newPosts)
          newPosts.forEach(({ guid }) => state.guids.add(guid))
          onNewPosts()
        }
      })
      .catch((err) => {
        console.error('RSS update error:', err)
      })
      .finally(() => {
        setTimeout(() => tick(), timeout)
      })
  }
  tick()
}

export { getRss, rssPostsUpdate }
