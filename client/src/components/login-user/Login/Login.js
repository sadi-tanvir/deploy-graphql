import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SIGNIN_USER } from '../../../Gql-Operations/mutations';
import { GET_ALL_QUOTES, GET_USER_INFORMATION } from '../../../Gql-Operations/queries';

const Login = () => {
    // state
    const [info, setInfo] = useState({
        email: "",
        password: ""
    })

    // signIn mutation
    const [signInMutation, { data, loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted(data) {
            localStorage.setItem("accessToken", data?.user.token)
            navigate('/')
        },
    })

    // router
    const navigate = useNavigate()

    // handle input change
    const handleChange = (e) => {
        const { value, name } = e.target;
        setInfo({ ...info, [name]: value })
    }

    // handle submit data
    const handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = info
        signInMutation({
            variables: {
                userData: {
                    email,
                    password
                }
            }
        })
    }

    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col w-6/12">
                    {error &&
                        <div class={`alert alert-error shadow-lg w-10/12`}>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>{error?.message}</span>
                            </div>
                        </div>
                    }

                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100 mt-5">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        name="email"
                                        type="text"
                                        placeholder="email"
                                        className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        name="password"
                                        type="text"
                                        placeholder="password"
                                        className="input input-bordered"
                                    />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                            <Link to="/register">
                                <p className="text-green-500">don't have an account?</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;