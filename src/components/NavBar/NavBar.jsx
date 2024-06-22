import Link from 'next/link'

const NavBar = () => {
  return (
    <nav className='w-full h-[8vh] fixed top-0 left-0 bg-black flex items-center justify-between text-white px-4 z-50'>
      <div className='w-full h-full flex justify-between items-center'>
        <div>
          <Link href='/'>
            <h1 className='text-[2.5vmin]'>Entertainment</h1>
          </Link>
        </div>
        <div>
          <Link href='/location'>
            <h2 className='text-[1.95vmin]'>Location</h2>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
