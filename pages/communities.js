import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import CommunityCard from "../components/Communitycard";
import CommentModal from "../components/CommentModal";

export default function communities({ newsResults, randomUsersResults }) {
    const router = useRouter();
    return <div>

        <main className="flex min-h-screen mx-auto">
            {/* Sidebar */}
            <Sidebar />

            {/* Feed */}
            <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
                <div className="flex items-center space-x-2  py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">

                <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Communities</h2>
                </div>
                <div className="flex flex-col items-center h-screen">

          
          <CommunityCard name="ReactJS Community" image="/Reactlogo.png" desc="
          The React JS community is a dynamic hub where developers collaborate and innovate with the React library to create interactive web interfaces. It's a space for sharing knowledge, resources, and ideas, driving progress in web development."/>
          <CommunityCard name="Blockchain Community" image="/Blockchain.jpg" desc="The blockchain community is an innovative ecosystem exploring the potential of blockchain technology. It's a hub for developing decentralized applications and driving advancements in areas like DeFi, supply chain management, and digital identity." />
          <CommunityCard name="NodeJs Community" image="Nodejs.png" desc="The Node.js community is a vibrant network of developers focused on creating scalable server-side applications. It's a collaborative space for sharing insights and best practices to enhance Node.js development."/>
          

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
