'use client'
import { ModalMui, PaginationComponent } from '@/components'
import { Badge } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'

const Trending = ({ trendingData, loading }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [open, setOpen] = useState(false)
  const [selectedTitle, setSelectedTitle] = useState(null)
  const [trailerKey, setTrailerKey] = useState(null)
  const [showTrailer, setShowTrailer] = useState(false)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = trendingData.slice(indexOfFirstItem, indexOfLastItem)

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
      setTrailerKey(response.data.trailerKey)
      setShowTrailer(true)
    } catch (error) {
      console.log('Failed to fetch Trailer', error)
    }
  }
  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen w-full'>
        <div className='animate-spin rounded-full h-32 w-32 border-2 border-green-500'></div>
      </div>
    )
  }

  return (
    <>
      <div className='w-full h-full flex flex-wrap'>
        {currentItems.map((trending, index) => (
          <div
            key={index}
            className='p-4 md:w-[25%] w-[50%] capitalize overflow-hidden cursor-pointer transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-black'
            onClick={() => handleClickOpen(trending)}
          >
            <Badge
              badgeContent={`${trending.vote_average.toFixed(1)}★`}
              color='primary'
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              sx={{
                '.MuiBadge-badge': {
                  top: '-2%',
                  right: '50%',
                  transform: 'translateX(50%)',
                  backgroundColor: '#f44336',
                  color: 'white'
                }
              }}
            >
              <div className='flex flex-col items-center'>
                <Image
                  src={`https://image.tmdb.org/t/p/original${trending.poster_path}`}
                  alt={trending.original_title || trending.title}
                  width={500}
                  height={500}
                  priority={true} // High-priority image, preload
                />
                <h1 className='text-center md:font-medium md:text-sm hover:text-red-500 transition duration-300'>
                  {trending.original_title ||
                    trending.title ||
                    trending.name ||
                    trending.original_name}
                </h1>
                <h2 className='text-center'>
                  {trending.release_date || trending.first_air_date}
                </h2>
                <p className='text-center'>{trending.media_type}</p>
              </div>
            </Badge>
          </div>
        ))}
      </div>
      <PaginationComponent
        count={Math.ceil(trendingData.length / itemsPerPage)}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
      <ModalMui
        selectedTitle={selectedTitle}
        trailerKey={trailerKey}
        handleClickClose={handleClickClose}
        handlePlayTrailer={handlePlayTrailer}
        open={open}
      />
    </>
  )
}

export default Trending
