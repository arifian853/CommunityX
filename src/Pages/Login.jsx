import { useState } from 'react'
import { Button, Checkbox, Label, TextInput, Alert } from 'flowbite-react'
import { Link, Navigate } from 'react-router-dom'
import { HiInformationCircle } from 'react-icons/hi'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

export const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [navigate, setNavigate] = useState(false)
    const [error, setError] = useState('')
    const [alert, setAlert] = useState('')

    const onChangeUsername = (e) => {
        const value = e.target.value;
        setUsername(value);
        setError('')
    }

    const onChangePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
        setError('')
    }

    const loginBtn = () => {
        const data = {
            username: username,
            password: password
        }

        axios.post('http://localhost:5000/user/login', data)
            .then(result => {
                console.log(result)
                if (result) {
                    // setIsAuthenticated(true)
                    setAlert('Login successful!')
                    setTimeout(() => {
                        setNavigate(true)
                    }, 2000)
                } else {
                    setError('Login failed. Please check your credentials.');
                }
            })
            .catch(e => {
                setError(e.response.data.message)
            })

    }

    return (
        <>
            {
                navigate && (
                    <Navigate to="/feed" />
                )
            }
            <div data-aos="fade-up" data-aos-anchor-placement="top-center"  className='flex justify-center items-center flex-col gap-4 md:p-8 pt-10 h-screen'>
                <h1 className='text-4xl text-white font-bold'>Login</h1>
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
                        <title>Login</title>
                    </Helmet>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="email1"
                                value="Username"
                            />
                        </div>
                        <TextInput
                            id="username1"
                            placeholder="Your username"
                            required
                            type="text"
                            value={username}
                            onChange={onChangeUsername}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password1"
                                value="Password"
                            />
                        </div>
                        <TextInput
                            id="password1"
                            required
                            type="password"
                            value={password}
                            onChange={onChangePassword}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember">
                            Remember me
                        </Label>
                    </div>
                    <Button onClick={loginBtn}>
                        Login
                    </Button>
                </div>
                <p className='text-white'>Doesn&#39;t have an account yet? <span className='underline'><Link to='/register'>Register here</Link></span></p>
                <p className='text-white underline'> <Link to='/'>Cancel</Link></p>
            </div>
        </>
    )
}

Login.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired,
};
