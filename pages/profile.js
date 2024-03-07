import { useRouter } from "next/router";
import { useState,useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { useRecoilState } from "recoil";
import { userState } from "../atom/userAtom";

import CommentModal from "../components/CommentModal";


export default function profile({newsResults, randomUsersResults }) {
    const router = useRouter();
 
    const [currentUser, setCurrentUser] = useRecoilState(userState);
    const [comments, setComments] = useState([]);
   
    return <div>

        <main className="flex min-h-screen mx-auto">
            {/* Sidebar */}
            <Sidebar />

            {/* Feed */}
            <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
               
                <div className="flex flex-col items-center bg-green-300">
                  <div>
                      <img
                       src={currentUser?.userImg}
                       alt="user-img"
                       className=" p-4 h-30 w-30 rounded-full xl:mr-2"
                      />
     
                    </div>
             <h4 className="font-bold ">{currentUser?.name}</h4>
                <h6> Frontend Developer | UI/UX Designer</h6>
                 <div className="pt-3 border-b-2 border-green-700 w-3/4"></div>
                </div>
                 <div className="m-6 p-3 bg-green-200 rounded-3xl">
                    <h3 className="pt-3 pl-4 font-bold">About</h3>
                    <p className="pl-4 pr-3">
                        I'm a dedicated frontend developer with a passion for crafting seamless and visually stunning user experiences. With a strong foundation in web development, I'm always excited about staying ahead of the curve by exploring and mastering new technologies.Excited about the endless possibilities that frontend development offers, and always open to collaborations and discussions. Let's build the future together! 
                    </p>
                 </div>
                 <div className=" m-6 p-3 bg-green-200 rounded-3xl">
                    <h3 className="pt-3 pl-4 font-bold">Skills</h3>
                    <p className=" m-3 bg-green-800 rounded-3xl w-28 pl-4 pr-3 text-gray-100">
                        JavaScript
                    </p>
                    <p className="m-3 bg-green-800 rounded-3xl w-28 pl-4 pr-3 text-gray-100">
                        C++
                    </p>
                    <p className="m-3 bg-green-800 rounded-3xl w-28 pl-4 pr-3 text-gray-100">
                        React.js
                    </p>
                    <p className="m-3 bg-green-800 rounded-3xl w-28 pl-4 pr-3 text-gray-100">
                        Flutter
                    </p>
                 </div>
                 <div className="m-6 p-3 bg-green-200 rounded-3xl">
                    <h3 className="pt-3 pl-4 font-bold">Experience</h3>
                    <h5 className="pt-3 pl-4 font-bold">UI/UX Designer</h5>
                    <p className="pl-4 font-medium">The Resolved Tech</p>
                    <p className="pl-4 pr-3">
                    Collaborated closely with the design team to create user-centered interface designs for web and mobile
applications.
Contributed to the wireframing and prototyping process using Figma effectively translating ideas into visual
concepts.
Actively contributed to the development of food delivery app design and dashboard design
                    </p>
                 </div>
                 <div className="m-6 p-3 bg-green-200 rounded-3xl">
                    <h3 className="pt-3 pl-4 font-bold">Contact</h3>
                   <h5 className="pl-4"><span className="font-bold">Email: </span>{currentUser?.name}@gmail.com</h5>
                   <h5 className="pl-4"><span className="font-bold">Phone No. : </span>+919876543210</h5>
                 </div>
            </div>

            {/* Widgets */}

            <Widgets
                newsResults={newsResults.articles}
                randomUsersResults={randomUsersResults.results}
            />

            {/* Modal */}

            <CommentModal />
        </main>
    </div>
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
