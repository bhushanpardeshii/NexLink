import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import { HomeIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  FlagIcon,
  HandIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { joinedCommunity, userState } from "../atom/userAtom";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Sidebar() {
  const [joinedCommunities, setJoinedCommunities] = useRecoilState(joinedCommunity)

  const router = useRouter();
  const [currentUser, setCurrentUser] = useRecoilState(userState);

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchUser = async () => {
          const docRef = doc(db, "users", auth.currentUser.providerData[0].uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCurrentUser(docSnap.data());
          }
        };
        fetchUser();
      }
    });
  }, []);

  function onSignOut() {
    signOut(auth);
    setCurrentUser(null);
  }
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
      {/* NexLink Logo */}
      <div className="hoverEffect p-0 self-center hover:bg-green-100 xl:px-1">
        <Image

          width="50"
          height="50"
          src="/Nexlink.png"
        ></Image>
        <p>NexLink</p>


      </div>

      {/* Menu */}

      <div className="mt-4 mb-2.5 xl:items-start">
        <Link href={'/'}><SidebarMenuItem text="Home" Icon={HomeIcon} active /></Link>
        <Link href={'/communities'}><SidebarMenuItem text="Communities" Icon={FlagIcon} /></Link>
        {currentUser && (
          <>
            <Link href={'/profile'}><SidebarMenuItem text="Profile" Icon={UserIcon} /></Link>
            <Link href={'/notifications'}><SidebarMenuItem text="Notifications" Icon={BellIcon} /></Link>
            <Link href={'/gemini'}><SidebarMenuItem text="Ask me" Icon={HashtagIcon} /></Link>
            <SidebarMenuItem text="Messages" Icon={InboxIcon} />
            <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Joined Communities</h3>
        <ul>
          {joinedCommunities.map(community => (
            <li key={community} className="flex items-center space-x-2">
              <img src={community.image} alt={name} className="w-8 h-8 rounded-full" />
              <span>{community.name}</span>
            </li>
          ))}
        </ul>
      </div>
          </>
        )}
      </div>

      {/* Button */}

      {currentUser ? (
        <>
          {/* <button className="bg-green-300 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
            Post
          </button> */}

          {/* Mini-Profile */}

          <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
            <img
              onClick={onSignOut}
              src={currentUser?.userImg}
              alt="user-img"
              className="h-10 w-10 rounded-full xl:mr-2"
            />
            <div className="leading-5 hidden xl:inline">
              <h4 className="font-bold">{currentUser?.name}</h4>
              <p className="text-gray-500">@{currentUser?.username}</p>
            </div>
            <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
          </div>
        </>
      ) : (
        <button
          onClick={() => router.push("/auth/signin")}
          className="bg-green-300 text-white rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline"
        >
          Sign in
        </button>
      )}
    </div>
  );
}
