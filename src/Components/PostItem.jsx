import { useState, useEffect } from "react"
import { Avatar, Card, Alert } from "flowbite-react"
import axios from "axios"
import { HiInformationCircle } from "react-icons/hi"


export const PostItem = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:5000/posts/feed")
            setPosts(response.data);
        }
        fetchData()
    }, [])

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="p-5 ">
            {
                posts.length ? (
                    posts.slice().reverse().map(post => (
                        <Card
                            key={post._id}
                            className="max-w-sm m-3"
                            href="#"

                        >
                            <div className="flex flex-col gap-3 justify-center items-start">
                                <div className="flex justify-start gap-3 items-center">
                                    <Avatar
                                        alt="avatar of Jese"
                                        img="src/assets/user.png"
                                        rounded
                                    />
                                    <p className="text-1xl font-semibold tracking-tight text-gray-900 dark:text-white">{post.whoCreated}</p>
                                </div>
                                <div>
                                    <h5 className="text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        <p>
                                            {post.title}
                                        </p>
                                    </h5>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">
                                        <p>
                                            {post.content}
                                        </p>

                                        <p className="text-sm opacity-70 pt-2">Posted :  {formatDate(post.createdAt)}</p>
                                    </p>
                                </div>
                            </div>

                        </Card>
                    ))
                ) : <Alert
                    color="failure"
                    icon={HiInformationCircle}
                >
                    <span>
                        <p>
                            <span className="font-medium">
                               No data
                            </span>

                        </p>
                    </span>
                </Alert>
            }
        </div>
    )
}
