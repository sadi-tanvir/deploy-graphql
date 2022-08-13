import React from 'react';
import { useQuery } from "@apollo/client"
import { GET_USER_INFORMATION } from "../../Gql-Operations/queries"

const Profile = () => {
    const { loading, error, data } = useQuery(GET_USER_INFORMATION)

    if (error) {
        console.log(error);
    } else {
        console.log('profile', data);
    }

    if (loading) {
        return <p>loading</p>
    }


    return (
        <>
            <div className="container mx-auto mt-10 bg-purple-100">
                <div className="text-center">
                    <div class="avatar">
                        <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src="https://placeimg.com/192/192/people" />
                        </div>
                    </div>
                    <p className="mt-5">{data?.user?.email}</p>
                    <h1 className="text-3xl font-bold pb-6 capitalize">{`${data?.user?.firstName} ${data?.user?.lastName}`}</h1>
                </div>
            </div>
            <div className="container mx-auto mt-5">
                <h1 className="text-4xl bg-green-300 rounded-lg px-5 py-2 text-green-800 capitalize font-bold mb-2">My Quotes</h1>
                {
                    data?.user?.quotes?.map((quote, index) => {
                        return (
                            <>
                                <blockquote key={index} className="bg-green-100 rounded-lg py-3 pl-3 ml-1 mt-3">
                                    <p className="text-2xl text-slate-600 capitalize font-bold">{quote?.name}</p>
                                    <small className="bg-green-300 px-3 py-[2px] rounded text-green-800 font-semibold">{quote?.by?.firstName}</small>
                                </blockquote>
                            </>
                        )
                    })
                }
            </div>
        </>
    );
}

export default Profile;