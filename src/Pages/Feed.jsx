
import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom"
import { PostComponent } from "../Components/PostComponent"
import { PostItem } from "../Components/PostItem"
import { Helmet } from "react-helmet"
import { BsPencilSquare } from 'react-icons/bs'
import { useState } from "react";

export const Feed = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const handleButtonClick = () => {
        setModalOpen(false)
    }

    return (
        <>
            <Helmet>
                <title>Feed</title>
            </Helmet>
            <Navbar
                fluid
                rounded
            >
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    CommunityX
                </span>

                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Navbar.Link
                        active
                        href="#"
                    >
                        <p>
                            Home
                        </p>
                    </Navbar.Link>
                    <Navbar.Link
                        href="#"
                    >
                        <p>
                            About
                        </p>
                    </Navbar.Link>
                    <Navbar.Link href="#">
                        <Link to='/'>
                            Logout
                        </Link>
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
            <div className="h-auto flex flex-col md:flex-row items-center md:items-start justify-center">
                {/* <PostComponent /> */}
                {
                    modalOpen && (
                        <PostComponent onClose={handleButtonClick} />
                    )
                }
                <button className='post-btn shadow-2xl' onClick={() => setModalOpen(true)}> <BsPencilSquare /> </button>
                
                    <PostItem />
                
                {/* <Button onClick={handleLogout} className="text-white p-3 underline">  Logout  </Button> */}
            </div>
        </>
    )
}

