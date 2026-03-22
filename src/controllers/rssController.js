import _ from 'lodash'
import axios from 'axios'

function buildProxyUrl(url) {
  return `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`
}

function parseRss(data) {
  const parser = new DOMParser()
  const parsedData = parser.parseFromString(data, 'application/xml')

  const parserError = parsedData.querySelector('parsererror')
  if (parserError) {
    throw new Error('invalidRSS')
  }

  const feedElement = parsedData.querySelector('title')
  const descriptionElement = parsedData.querySelector('description')

  if (!feedElement || !descriptionElement) {
    throw new Error('invalidRSS')
  }
  const feed = feedElement.textContent
  const description = descriptionElement.textContent
  const items = parsedData.querySelectorAll('item')

  const guids = []
  const posts = Array.from(items).map((item) => {
    const title = item.querySelector('title')
    const description = item.querySelector('description')
    const link = item.querySelector('link')
    const guid = item.querySelector('guid')

    guids.push(guid.textContent)

    return {
      title: title.textContent,
      description: description.textContent,
      link: link.textContent,
      guid: guid.textContent,
      id: _.uniqueId(),
    }
  })

  return { posts, feed, description, guids }
}

async function fetchRss(url) {
  try {
    const response = await axios.get(buildProxyUrl(url), { timeout: 10000 })
    const data = response.data.contents
    return parseRss(data)
  } catch (error) {
    if (error.message === 'invalidRSS') {
      throw error
    }
    console.error(error)
    throw new Error('networkError', { cause: error })
  }
}

export { fetchRss }
