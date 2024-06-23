'use client'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import axios from 'axios'
import PropTypes from 'prop-types'
import * as React from 'react'
import { Movie, Trending, Tv } from '..'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

export default function HeadlineNav() {
  const [value, setValue] = React.useState(0)
  const [trendingData, setTrendingData] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const trending = await axios.get('/api/trending')
        setTrendingData(trending.data.results)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const [movieData, setMovieData] = React.useState([])
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const movie = await axios.get('/api/movie')
        setMovieData(movie.data.results)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const [tvData, setTvData] = React.useState([])
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const tv = await axios.get('/api/tv')
        setTvData(tv.data.results)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'papayawhip' }}>
      <Tabs
        TabIndicatorProps={{
          sx: {
            backgroundColor: '#F49200'
          }
        }}
        value={value}
        onChange={handleChange}
        aria-label='basic tabs example'
        centered
        textColor='inherit'
      >
        <Tab label='TRENDING' />
        <Tab label='MOVIES' />
        <Tab label='TV' />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <Trending loading={loading} trendingData={trendingData} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Movie loading={loading} movieData={movieData} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Tv loading={loading} tvData={tvData} />
      </CustomTabPanel>
    </Box>
  )
}
