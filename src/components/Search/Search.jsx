'use client'
import axios from 'axios'
import { useState } from 'react'
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'

const Search = ({
  setSearchData,
  setIsLoading,
  setCurrentPage,
  searchType = 'default'
}) => {
  //search data
  const [search, setSearch] = useState('')
  let type = ''

  if (searchType === 'tv' || searchType === 'default') {
    type = 'searchtv'
  } else {
    type = 'searchmovies'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await axios.post(`/api/${type}`, { search })
      if (response.data.results.length > 0) {
        setSearchData(response.data.results)
        setCurrentPage(1)
        setIsLoading(false)
      } else {
        setSearchData([])
        setIsLoading(false)
        window.alert(`${search} not found!`)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setSearchData([])
      window.alert(`No results found for ${search}`)
      setSearch('')
    }
  }

  return (
    <div className='w-full h-full flex justify-end p-3 pb-10'>
      <form
        onSubmit={handleSubmit}
        className='flex w-full md:w-auto items-center gap-2'
      >
        <input
          className='w-full h-full bg-transparent border-b focus:outline-none'
          type='text'
          placeholder='Search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            type='button'
            className='p-1'
            onClick={() => {
              setSearch('')
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
  )
}

export default Search
