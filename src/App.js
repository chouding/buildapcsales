import React, { useState, useEffect } from 'react'
import { Container } from '@mui/system'
import TitleBar from './components/TitleBar.js'
import axios from 'axios'
import Posts from './components/Posts.js'
import { styled, Toolbar } from '@mui/material'

const Label = styled('div')({
  display: 'flex',
  gap: '0.1rem',
  alignItems: 'center'
})

const StyledSearchbar = styled('div')(({ theme }) => ({
  color: 'purple',
  backgroundColor: 'lightblue',
  borderRadius: theme.shape.borderRadius,
  padding: '0 0.7em',
  width: '60%',
  ml: '1rem',
  display: 'flex',
  alignItems: 'center'
}))

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  flexDirection: 'row',
  gap: '1.6em'
})

const App = () => {
  const [newPosts, setNewPosts] = useState([])
  const [searchInput, setSearchInput] = useState('')

  // Loads reddit posts minute
  useEffect(() => {
    const interval = setInterval(() => {
      const fetchPosts = async () => {
        const redditAPI = await axios.get('https://www.reddit.com/r/buildapcsales/new.json?limit=100')
        const filteredPosts = redditAPI.data.data.children
                              .filter(post => !(post.data.stickied))
                              .map(post => post.data)
        setNewPosts(filteredPosts.map(post => (
          {
            name: post.title.slice(post.title.indexOf(']')+1).trim(),
            type: post.title.slice(1, post.title.indexOf(']')),
            date: new Date(post.created_utc*1000),
            url: post.url,
            ongoing: post.link_flair_css_class.toLowerCase() !== 'expired'
          }))
        )
      }
      fetchPosts()
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Container>
      <TitleBar Label={Label} StyledSearchbar={StyledSearchbar} StyledToolbar={StyledToolbar} setSearchInput={setSearchInput} />
      <Posts searchInput={searchInput} newPosts={newPosts} />
    </Container>
  );
}

export default App;
