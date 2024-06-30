import { Badge } from '@mui/material'
import Image from 'next/image'

const Card = ({ cardData, handleClickOpen }) => {
  return (
    <div
      className='p-4 md:w-[25%] w-[50%] capitalize overflow-hidden cursor-pointer transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-black'
      onClick={() => handleClickOpen(cardData)}
    >
      <Badge
        badgeContent={`${cardData.vote_average.toFixed(1)}★`}
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
            src={`https://image.tmdb.org/t/p/original${cardData.poster_path}`}
            alt={cardData.original_title || cardData.title}
            width={500}
            height={500}
            priority={true} // High-priority image, preload
          />
          <h1 className='text-center md:font-medium md:text-sm hover:text-red-500 transition duration-300'>
            {cardData.original_title ||
              cardData.title ||
              cardData.name ||
              cardData.original_name}
          </h1>
          <h2 className='text-center'>
            {cardData.release_date || cardData.first_air_date}
          </h2>
          <p className='text-center'>{cardData.media_type}</p>
        </div>
      </Badge>
    </div>
  )
}

export default Card
