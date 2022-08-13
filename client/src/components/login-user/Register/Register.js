import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { SIGNUP_USER } from '../../../Gql-Operations/mutations';

const Register = () => {
    const [info, setInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const [signupMutation, { data, loading, error }] = useMutation(SIGNUP_USER)

    console.log('loading', loading)
    console.log('error', error?.message)
    console.log('data', data)

    const handleChange = (e) => {
        const { value, name } = e.target;
        setInfo({ ...info, [name]: value })
    }

    // singnup user
    const handleSubmit = async (e) => {
        const { firstName, lastName, email, password } = info;
        e.preventDefault()
        signupMutation({
            variables: {
                userData: {
                    firstName,
                    lastName,
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
                    <div className="text-center lg:text-left">
                        {error && <p className='text-red-500 text-2xl font-bold'>{error?.message}</p>}
                        {data && <p className='text-green-500 text-2xl font-bold'>{data?.user?.firstName} has signed up!</p>}

                        <h1 className="text-5xl font-bold">Register now!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100 mt-5">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">First Name</span>
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        name="firstName"
                                        type="text"
                                        placeholder="first name"
                                        className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Last Name</span>
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        name="lastName"
                                        type="text"
                                        placeholder="last name"
                                        className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        name="email"
                                        type="email"
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
                                        type="password"
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
                            <Link to="/login">
                                <p className="text-green-500">Already have an account?</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;