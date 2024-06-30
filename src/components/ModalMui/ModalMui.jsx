'use client'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import YouTube from 'react-youtube'

const ModalMui = ({ open, setOpen, selectedTitle, setSelectedTitle }) => {
  const [trailerKey, setTrailerKey] = useState(null)

  const handleClickClose = (title) => {
    setSelectedTitle(null)
    setOpen(false)
    setTrailerKey(false)
  }
  const handlePlayTrailer = async (mediaType, id) => {
    try {
      const response = await axios.post('/api/trailer', {
        media_type: mediaType,
        id
      })
      setTrailerKey(response.data.trailerKey)
    } catch (error) {
      console.log('Failed to fetch Trailer', error)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClickClose}
      maxWidth='sm'
      fullWidth={true}
      className='rounded-lg p-4'
      PaperProps={{
        className: 'bg-white dark:bg-gray-800 text-black dark:text-white'
      }}
    >
      <DialogTitle
        className={
          selectedTitle?.media_type === 'tv'
            ? 'text-[3.5vmin] font-semibold text-left'
            : 'text-[3.5vmin] font-semibold text-left'
        }
      >
        {selectedTitle?.original_title ||
          selectedTitle?.title ||
          selectedTitle?.original_name ||
          selectedTitle?.name}
      </DialogTitle>
      <DialogContent className='flex flex-col items-center'>
        {selectedTitle && (
          <>
            {selectedTitle.video === false ? (
              <>
                {/* Show trailer for movies */}
                {trailerKey ? (
                  <YouTube
                    videoId={trailerKey}
                    className='w-full h-full flex justify-center text-center'
                  />
                ) : (
                  <IconButton
                    color='primary'
                    onClick={() =>
                      handlePlayTrailer(
                        selectedTitle.media_type,
                        selectedTitle.id
                      )
                    }
                    aria-label='play trailer'
                    className='m-4'
                  >
                    <PlayArrowIcon />
                  </IconButton>
                )}
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  <p className='p-4'>{selectedTitle.overview}</p>
                </div>
              </>
            ) : (
              <>
                <Image
                  src={`https://image.tmdb.org/t/p/original${selectedTitle.poster_path}`}
                  alt={selectedTitle.original_title || selectedTitle.title}
                  width={500}
                  height={500}
                  layout='responsive'
                  priority={true}
                  className='object-contain max-h-[500px]'
                />
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  <p className='p-4'>{selectedTitle.overview}</p>
                </div>
              </>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ModalMui
