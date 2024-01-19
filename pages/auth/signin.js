import { db } from "../../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
export default function Signin() {
  const router = useRouter();
  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const user = auth.currentUser.providerData[0];
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          username: user.displayName.split(" ").join("").toLocaleLowerCase(),
          userImg: user.photoURL,
          uid: user.uid,
          timestamp: serverTimestamp(),
        });
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center mt-20 space-x-4">

      <div className="">
        <div className="flex flex-col items-center">
          <img
            className="w-36 object-cover"
            src="/NexLink.png"
            alt="NexLink"
          />
          <p className="text-center text-lg  my-10">
            Welcome to NexLink !
          </p>
          <button
            onClick={onGoogleClick}
            className="bg-green-400 rounded-lg p-3 text-white hover:bg-green-600"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
