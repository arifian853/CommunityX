import { useState } from 'react'
import { Button, Checkbox, Label, TextInput, Alert } from 'flowbite-react'
import { HiInformationCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'

import axios from 'axios';
import { Helmet } from 'react-helmet';

export const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState('')
    const [error, setError] = useState('')

    const changeUsername = (e) => {
        const value = e.target.value;
        setUsername(value);
        setError('')
      }
    
      const changeEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
        setError('')
      }
    
      const changeFullName = (e) => {
        const value = e.target.value;
        setFullName(value);
        setError('')
      }
    
      const changePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
        setError('')
      }
    
      const registBtn = () => {
        const data = {
            username : username,
            email : email,
            fullName: fullName,
            password : password
        }
        axios.post('http://localhost:5000/user/register', data) 
        .then(result => {
            if(result) {
                if(result.data) {
                    setUsername('')
                    setEmail('')
                    setPassword('')
                    setAlert(result.data.message)
                    setTimeout(() => {
                        setAlert('')
                        window.location.href = '/login'
                    }, 2000)
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
        <div data-aos="fade-up" data-aos-anchor-placement="top-center" className='flex justify-center items-center flex-col gap-4 md:p-8 pt-10 h-screen'>
            <h1 className='text-4xl text-white font-bold'>Register</h1>
            <div className="flex flex-col w-94 md:w-96 gap-4 border border-sky-500 md:p-5 p-5 rounded-md">
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
                     <Helmet>
                        <title>Register</title>
                    </Helmet>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="name1"
                            value="Full Name"
                        />
                    </div>
                    <TextInput
                        id="name1"
                        placeholder="John Doe"
                        required
                        type="text"
                        value={fullName}
                        onChange={changeFullName}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="name1"
                            value="Username"
                        />
                    </div>
                    <TextInput
                        id="username1"
                        placeholder="Your username"
                        required
                        type="text"
                        value={username}
                        onChange={changeUsername}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="email1"
                            value="Email"
                        />
                    </div>
                    <TextInput
                        id="email1"
                        placeholder="name@flowbite.com"
                        required
                        type="email"
                        value={email}
                        onChange={changeEmail}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="password1"
                            value="Your password"
                        />
                    </div>
                    <TextInput
                        id="password1"
                        required
                        type="password"
                        value={password}
                        onChange={changePassword}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">
                        I am agree to Terms and Condition
                    </Label>
                </div>
                <Button onClick={registBtn}>
                    Register
                </Button>
            </div>
            <p className='text-white'>Already have an account? <span className='underline'><Link to='/login'>Login here</Link></span></p>
            <p className='text-white underline'> <Link to='/'>Cancel</Link></p>
        </div>
    )
}
