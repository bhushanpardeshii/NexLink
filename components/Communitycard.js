import { useState } from 'react';
import { useRecoilState} from 'recoil';
import { joinedCommunity } from '../atom/userAtom';
function CommunityCard({ name, image,desc }) {
  const [joinedCommunities, setJoinedCommunities] = useRecoilState(joinedCommunity)
  

  const handleJoinToggle = () => {
    if (!joinedCommunities.includes(name)) {
      setJoinedCommunities([...joinedCommunities,{name:name,image:image}]);
    } else {
      // setJoinedCommunities(joinedCommunities.filter(community => community !== name));
    }
  };

  return (
    <div>
      <div className="w-full max-w-md mx-auto p-4 rounded-lg shadow-md">
        {/* Community Card */}
        <div className="bg-white rounded-lg overflow-hidden">
          {/* Image */}
          <img src={image} alt={name} className="w-full h-32 object-cover object-center" />
          {/* Content */}
          <div className="p-4">
            {/* Title */}
            <h2 className="text-xl font-semibold mb-2">{name}</h2>
            {/* Description */}
            <p className="text-gray-700">{desc}</p>
            {/* Join Button */}
            <button onClick={handleJoinToggle} className={`mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none`}>
              {joinedCommunities.map((community)=>{if(community.name===name){return true}return false;}).includes(true) ? 'Joined' : 'Join'}
            </button>
          </div>
        </div>
      </div>
      {/* Sidebar */}
      
      </div>
  );
}

export default CommunityCard;
