import Header from './Header'
import Maincontent from './Maincontent'

const HomePage = () => {
  return (
    <div className='w-full bg-white min-h-screen'>
        <Header/>
        <div className='pt-32 p-1 md:p-5'>
            <Maincontent/>
        </div>
    </div>  
  )
}

export default HomePage