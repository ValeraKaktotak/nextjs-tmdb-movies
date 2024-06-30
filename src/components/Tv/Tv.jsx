'use client'
import { ModalMui, PaginationComponent } from '@/components'
import { Badge } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'

const Tv = ({ tvData, loading }) => {
  //search data
  const [tvSearch, setTvSearch] = useState('')
  const [searchData, setSearchData] = useState([])

  //pagination data
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  //modal data
  const [open, setOpen] = useState(false)
  const [selectedTitle, setSelectedTitle] = useState(null)

  //component data
  const [isLoading, setIsLoading] = useState(loading)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const dataToShow = searchData.length > 0 ? searchData : tvData
  const currentItems = dataToShow.slice(indexOfFirstItem, indexOfLastItem)

  //different handle functions
  const handleClickOpen = (title) => {
    setSelectedTitle(title)
    setOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await axios.post('/api/searchtv', { tvSearch })
      if (response.data.results.length > 0) {
        setSearchData(response.data.results)
        setCurrentPage(1)
        setIsLoading(false)
      } else {
        setSearchData([])
        setIsLoading(false)
        window.alert(`${tvSearch} not found!`)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setSearchData([])
      window.alert(`No results found for ${tvSearch}`)
      setTvSearch('')
    }
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen w-full'>
        <div className='animate-spin rounded-full h-32 w-32 border-2 border-green-500'></div>
      </div>
    )
  }

  return (
    <>
      <div className='w-full h-full flex justify-end p-3 pb-10'>
        <form
          onSubmit={handleSubmit}
          className='flex w-full md:w-auto items-center gap-2'
        >
          <input
            className='w-full h-full bg-transparent border-b focus:outline-none'
            type='text'
            placeholder='Search...'
            value={tvSearch}
            onChange={(e) => setTvSearch(e.target.value)}
          />
          {tvSearch && (
            <button
              type='button'
              className='p-1'
              onClick={() => {
                setTvSearch('')
                setSearchData([])
                setCurrentPage(1)
              }}
            >
              <AiOutlineClose className='text-lg text-red-500' />
            </button>
          )}

          <button
            type='submit'
            className='flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded'
          >
            <AiOutlineSearch className='text-lg' />
          </button>
        </form>
      </div>

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
        count={Math.ceil(tvData.length / itemsPerPage)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ModalMui
        selectedTitle={selectedTitle}
        setSelectedTitle={setSelectedTitle}
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}

export default Tv
