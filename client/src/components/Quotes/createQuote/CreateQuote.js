import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CREATE_QUOTE } from '../../../Gql-Operations/mutations';
import { GET_ALL_QUOTES, GET_USER_INFORMATION } from '../../../Gql-Operations/queries';

const CreateQuote = () => {
    // state
    const [quote, setQuote] = useState("")
    const [showAlert, setShowAlert] = useState(false)

    // signIn mutation
    const [createQuoteMutation, { data, loading, error }] = useMutation(CREATE_QUOTE, {
        refetchQueries: [GET_ALL_QUOTES, GET_USER_INFORMATION]
    })

    console.log(data);
    console.log(error);

    // router
    const navigate = useNavigate()

    // handle submit data
    const handleSubmit = (e) => {
        e.preventDefault()
        createQuoteMutation({
            variables: {
                name: quote
            }
        })
        setQuote("")
    }



    useEffect(() => {
        if (data || error) {
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 3000)
        }
    }, [data, error])
    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col w-6/12">
                    {
                        (error || data) &&
                        <div class={`alert ${error ? "alert-error" : "alert-info"} ${showAlert ? "visible" : "hidden"} shadow-lg w-10/12`}>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>{error ? error?.message : data?.createQuote}</span>
                            </div>
                        </div>
                    }

                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Create Quote</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        onChange={(e) => setQuote(e.target.value)}
                                        type="text"
                                        placeholder="write quote.."
                                        className="input input-bordered"
                                        value={quote}
                                    />
                                </div>
                                <div className="form-control mt-6">
                                    <button type="submit" className="btn btn-primary">Create Quote</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateQuote;