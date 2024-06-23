import axios from 'axios'
import { useState } from 'react'

const Trending = ({ trendingData, loading }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(15)
  const [open, setOpen] = useState(false)
  const [selectedTitle, setSelectedTitle] = useState(null)
  const [trailerKey, setTrailerKey] = useState(null)
  const [showTrailer, setShowTrailer] = useState(false)

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }
  const handleClickOpen = (title) => {
    setSelectedTitle(title)
    setOpen(true)
    setShowTrailer(false)
    setTrailerKey(null)
  }
  const handleClickClose = (title) => {
    setSelectedTitle(null)
    setOpen(false)
    setShowTrailer(null)
    setTrailerKey(false)
  }
  const handlePlayTrailer = async (mediaType, id) => {
    try {
      const response = await axios.post('/api/trailer', {
        media_type: mediaType,
        id
      })
      setTrailerKey(response.data.trailerkey)
      setShowTrailer(true)
    } catch (error) {
      console.log('Failed to fetch Trailer', error)
    }
  }

  return <div>Trending</div>
}

export default Trending
