import React, { useEffect } from 'react'
import Container from '../components/container/Container'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Footer } from '../components'

const Home = () => {

  const authStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData);

  return (
    <Container className='' backgroundImage={'/homeBg.svg'}>
      <div className='h-full flex flex-col justify-between bg-gray text-white'>

        <div className='flex flex-col items-center py-2 h-[95vh] ss:h-auto'>

          <marquee behavior="" direction="lef-to-right" className='text-5xl font-bold ms:text-8xl h-[70px] ms:h-[170px]'>Welcome{authStatus ? ` back ! ${user.name}` : " to Youtube Blogs"}</marquee>
          <p className='text-2xl px-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi odio maxime quod numquam cupiditate quam, consectetur sint ipsam illo. Veritatis molestias magni eius?</p>
          {!authStatus ?
            <div className='flex gap-4 mt-24 ss:mt-10'>
              <Link to="/login" className=' text-white font-bold px-6 py-3 sm:py-4 sm:px-7 bg-blue-500 rounded-xl'>Log in</Link>
              <Link to="/signup" className=' text-white font-bold px-6 py-3 sm:py-4 sm:px-7 bg-green-500 rounded-xl'>Sign up</Link>
            </div>
            :
            <div className='flex flex-col xxs:flex-row items-center gap-2 bg-gray-900 p-2 rounded-xl mt-24 ss:mt-10'>
              <p className='font-bold'>
                {user?.email}
              </p>
            </div>
          }
        </div>
        <Footer />
      </div>

    </Container>
  )
}

export default Home