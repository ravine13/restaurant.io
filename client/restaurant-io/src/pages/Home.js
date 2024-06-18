import { useContext} from 'react'
import { Button} from 'flowbite-react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import bannerImage from '../assets/images/banner-bg.jpg';

const Home = () => {
    const { currentUser,} = useContext(UserContext)

  return (
    <main className="px-4 my-12">
      <div className="relative flex mx-auto justify-center items-center h-[330px] md:h-[400px] w-full max-w-[1254px] rounded-2xl" style={{ backgroundImage: `url(${bannerImage})` }}>
        <h1 className="relative md:px-10 text-center text-3xl md:text-5xl font-semibold text-white z-30">
          Book Your Spot, at the click of button
        </h1>
      </div>
      <div className="mx-auto my-16 max-w-[1254px]">
        <p className="w-full my-10 text-2xl font-semibold max-w-2xl">
        Are you the creator of delectable dishes? Do you seek variety in your gastronomic adventures? Our vibrant community can’t wait to savor your creations. Dive into the flavor fest!
        </p>
        <div className="flex flex-col md:flex-row gap-4 ">
          <Link to={currentUser ? '/register_restaurant' : '/login'}>
              <Button gradientDuoTone="purpleToBlue">
                Register your Restaurant
              </Button>
          </Link>
          <Link to='/restaurants'>
            <Button gradientDuoTone="cyanToBlue">Find restaurants</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Home