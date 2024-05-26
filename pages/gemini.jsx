import React, { useContext } from 'react'
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import CommentModal from "../components/CommentModal";
import Main from '../components/gemini';
import { assets } from './main/assets/assets'
import { Context } from '../config/context/context'

export default function Gemini({ newsResults, randomUsersResults }) {
    const router = useRouter();
    const { onSent, recentprompt, showresult, loading, resultdata, setInput, input } = useContext(Context)
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSent();
        }
    };
    return (
        <>
 <main className="flex min-h-screen mx-auto">
            {/* Sidebar */}
            <Sidebar />

            {/* Feed */}
            <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
                <div className="flex items-center space-x-2  py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">

                <h2 className="text-lg sm:text-xl font-bold cursor-pointer flex relative">AI bot</h2>
                </div>
                <div className="flex justify-center items-center h-screen pt-10">

                <Main/>
               
                </div>


            </div>

            {/* Widgets */}

            <Widgets
                newsResults={newsResults?.articles}
                randomUsersResults={randomUsersResults?.results}
            />

            {/* Modal */}

            <CommentModal />
        </main>
    </>
    )
}

export async function getServerSideProps() {
    const newsResults = await fetch(
        "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
    ).then((res) => res.json());

    // Who to follow section

    let randomUsersResults = [];

    try {
        const res = await fetch(
            "https://randomuser.me/api/?results=30&inc=name,login,picture"
        );

        randomUsersResults = await res.json();
    } catch (e) {
        randomUsersResults = [];
    }

    return {
        props: {
            newsResults,
            randomUsersResults,
        },
    };
}
