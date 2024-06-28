'use client'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import Image from 'next/image'
import YouTube from 'react-youtube'

const ModalMui = ({
  selectedTitle,
  trailerKey,
  handleClickClose,
  handlePlayTrailer,
  open
}) => {
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
            {selectedTitle.media_type === 'tv' ? (
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
            ) : (
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
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ModalMui
