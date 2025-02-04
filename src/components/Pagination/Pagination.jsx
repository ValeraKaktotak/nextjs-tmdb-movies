'use client'
import { Pagination, Stack } from '@mui/material'

const PaginationComponent = ({ count, setCurrentPage, currentPage }) => {
  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  return (
    <div className='flex justify-center w-full pt-10 p-3'>
      <Stack spacing={5}>
        <Pagination
          count={count}
          onChange={handlePageChange}
          page={currentPage}
          variant='outlined'
          color='primary'
        />
      </Stack>
    </div>
  )
}

export default PaginationComponent
