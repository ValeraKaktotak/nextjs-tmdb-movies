'use client'
import { Card, ModalMui, PaginationComponent } from '@/components'
import { useState } from 'react'

const Trending = ({ trendingData, loading }) => {
  //pagination data
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  //modal data
  const [open, setOpen] = useState(false)
  const [selectedTitle, setSelectedTitle] = useState(null)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = trendingData.slice(indexOfFirstItem, indexOfLastItem)

  const handleClickOpen = (title) => {
    setSelectedTitle(title)
    setOpen(true)
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
        {currentItems.map((item, index) => (
          <Card key={index} cardData={item} handleClickOpen={handleClickOpen} />
        ))}
      </div>
      <PaginationComponent
        count={Math.ceil(trendingData.length / itemsPerPage)}
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

export default Trending
