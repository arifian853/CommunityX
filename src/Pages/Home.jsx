import { Button } from 'flowbite-react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <div className='p-10 flex gap-1 justify-center flex-col items-center h-screen'>
            <h1 className='text-6xl text-white font-bold'>Welcome!</h1>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div className='p-10'>
                <Button.Group>
                    <Button color="gray">
                        <Link to='/login'>
                            Login
                        </Link>
                    </Button>
                    <Button color="gray">
                        <Link to='/register'>
                            Register
                        </Link>
                    </Button>
                </Button.Group>
            </div>
        </div>
    )
}
