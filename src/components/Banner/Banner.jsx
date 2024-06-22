import { randomIndex } from '@/utils/randomIndex'
import { truncate } from '@/utils/truncate'
import Image from 'next/image'

const getData = async () => {
  const key = process.env.API_KEY

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-USpage=1`
    )
    if (!response.ok) {
      throw new Error(`Wrong https request! Status: ${response.status}`)
    }
    const data = await response.json()
    const result = data.results
    const random = randomIndex(result.length)
    const movie = result[random]
    return movie
  } catch (error) {
    console.log(error)
  }
}

const Banner = async () => {
  const movie = await getData()
  console.log(movie)
  return (
    <div className='w-full h-full pt-[8vh]'>
      {movie && (
        <div className='relative w-full h-[100vh] sm:h-[80vh]'>
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className='object-cover'
          />
          <div className='absolute bottom-[10%] left-0 bg-gradient-to-t from-black to-transparent p-4 w-full sm:w-[50%] rounded-lg'>
            <h1 className='text-white text-2xl sm:text-4xl font-bold'>
              {movie.title}
            </h1>
            <p className='text-gray-300 text-sm sm:text-base mt-2'>
              Release date: {movie.release_date}
            </p>
            <p className='text-gray-400 text-sm sm:text-base mt-2'>
              {truncate(movie.overview, 150)}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Banner
