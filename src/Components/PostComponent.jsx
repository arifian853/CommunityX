import { useState } from 'react'
import { Button, Label, TextInput, Alert } from 'flowbite-react'
import { HiInformationCircle } from 'react-icons/hi'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import axios from 'axios'


// eslint-disable-next-line react/prop-types, no-unused-vars
export const PostComponent = ({ children, onClose }) => {
    const [whoCreated, setwhoCreated] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [alert, setAlert] = useState('')
    const [error, setError] = useState('')

    const changeWhoCreated = (e) => {
        const value = e.target.value;
        setwhoCreated(value);
    }

    const changeTitle = (e) => {
        const value = e.target.value;
        setTitle(value);
    }

    const changeContent = (e) => {
        const value = e.target.value;
        setContent(value);
    }

    const postBtn = () => {
        const data = {
            whoCreated: whoCreated,
            title: title,
            content: content
        }
        axios.post('http://localhost:5000/posts/sent', data)
            .then(result => {
                if (result) {
                    if (result.data) {
                        setwhoCreated('')
                        setTitle('')
                        setContent('')
                        setAlert(result.data.message)
                        setTimeout(() => {
                            setAlert('')
                            window.location.href = '/feed'
                        }, 1000)
                    }
                }
            })
            .catch(e => {
                setError(e.response.data.message)
                setTimeout(() => {
                    setError('')
                }, 7000)
            })
    }
    return (
        <div data-aos="fade-up" data-aos-anchor-placement="top-center" className='modal flex justify-center items-center flex-col gap-4 md:p-8 pt-10 h-screen'>
            <div className="modal-body flex flex-col w-auto md:w-96 gap-4 border border-sky-500 md:p-5 p-5 rounded-md">
            <div className="flex flex-row justify-between text-2xl font-semibold dark:text-white">
                    <p>Post Something! </p> <button onClick={()=> onClose()} className='close-modal shadow-2xl'><AiOutlineCloseCircle /></button>
                </div>
                {
                    error && (
                        <Alert
                            color="failure"
                            icon={HiInformationCircle}
                        >
                            <span>
                                <p>
                                    <span className="font-medium">
                                        {error}
                                    </span>

                                </p>
                            </span>
                        </Alert>
                    )
                }
                {
                    alert && (
                        <Alert
                            color="success"
                            icon={HiInformationCircle}
                        >
                            <span>
                                <p>
                                    <span className="font-medium">
                                        {alert}
                                    </span>

                                </p>
                            </span>
                        </Alert>
                    )
                }

                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="who"
                            value="Who are you?"
                        />
                    </div>
                    <TextInput
                        id="username1"
                        placeholder="Just don't left it blank"
                        required
                        type="text"
                        value={whoCreated}
                        onChange={changeWhoCreated}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="title"
                            value="Title"
                        />
                    </div>
                    <TextInput
                        id="password1"
                        required
                        placeholder="Title"
                        type="text"
                        value={title}
                        onChange={changeTitle}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="content"
                            value="Content"
                        />
                    </div>
                    <TextInput
                        id="content"
                        sizing="lg"
                        placeholder="Content"
                        required
                        type="text"
                        value={content}
                        onChange={changeContent}
                    />
                </div>
                <Button onClick={postBtn}>
                    Post!
                </Button>
            </div>
        </div>
    )
}
