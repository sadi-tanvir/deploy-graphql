import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_ALL_QUOTES } from '../../../Gql-Operations/queries';
import CreateQuote from '../createQuote/CreateQuote';

const GetAllQuotes = () => {
    const { loading, error, data } = useQuery(GET_ALL_QUOTES)

    if (error) {
        console.log(error);
    } else {
        console.log(data);
    }

    if (loading) {
        return (
            <div className="container mx-auto mt-5">
                <h1 className="text-4xl bg-purple-300 px-5 py-1 text-green-800 capitalize font-bold mb-10">Loading...</h1>
            </div>
        )
    } else {
        return (
            <>
                <div className="container mx-auto mt-5">
                    <h1 className="text-4xl bg-purple-300 rounded-lg px-5 py-2 text-purple-800 capitalize font-bold mb-10">Quotes</h1>
                    {
                        data.quotes.map(quote => {
                            return (
                                <>
                                    <blockquote key={quote.by._id} className="bg-purple-100 rounded-lg py-3 pl-3 ml-1 mt-3">
                                        <p className="text-2xl text-slate-600 capitalize font-bold">{quote.name}</p>
                                        <small className="bg-purple-300 px-3 py-[2px] rounded text-purple-800 font-semibold">{quote.by.firstName}</small>
                                    </blockquote>
                                </>
                            )
                        })
                    }
                </div>
            </>
        );
    }
};

export default GetAllQuotes;