import React, { useState, useEffect } from "react"
import axios from 'axios'
import { NEW_STORIES, ITEM } from '../config/endpoint'

export default function Home() {
  const [stories, setStories] = useState([])

  async function getStories() {
    try {
      const { data: storyIds } = await axios.get(NEW_STORIES)
      const promises = storyIds.slice(0, 10).map(id => {
        return axios.get(`${ITEM}/${id}.json`)
      })
      const items = await Promise.all(promises)
      setStories(items)
    } catch (err) {
      console.log('An Error occured in the Home component')
      console.log(err)
    }
  }

  useEffect(() => {
    getStories()
  }, [])

  return (
    <>
      <h1>Stories</h1>
      {stories.map(story => (
        <li key={story.data.id}>
          <a href={story.data.url}>
            {story.data.title}
          </a>
        </li>
      ))}
    </>
  )
}
