'use client'
import { Card, ModalMui, PaginationComponent, Search } from '@/components'
import { useState } from 'react'
// import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'

const Movie = ({ movieData, loading }) => {
  // //search data
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
  const dataToShow = searchData.length > 0 ? searchData : movieData
  const currentItems = dataToShow.slice(indexOfFirstItem, indexOfLastItem)

  //different handle functions
  const handleClickOpen = (title) => {
    setSelectedTitle(title)
    setOpen(true)
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
      <Search
        setSearchData={setSearchData}
        setIsLoading={setIsLoading}
        setCurrentPage={setCurrentPage}
      />

      <div className='w-full h-full flex flex-wrap'>
        {currentItems.map((item, index) => (
          <Card key={index} cardData={item} handleClickOpen={handleClickOpen} />
        ))}
      </div>
      <PaginationComponent
        count={Math.ceil(movieData.length / itemsPerPage)}
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

export default Movie
