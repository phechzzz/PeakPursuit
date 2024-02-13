import { useState } from 'react';

const people = [
    {
      name: 'Leslie Alexander',
      interests: 'Weightlifting, Skiing',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Michael Foster',
      interests: 'Snowboarding, Hiking, Mountain Biking',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Dries Vincent',
      interests: 'Rowing, Running',
      imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: null,
    },
    {
      name: 'Lindsay Walton',
      interests: 'Calistenics, Snowboarding, Running',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Courtney Henry',
      interests: 'Cycling, Swimming',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Tom Cook',
      interests: 'Weightlifting, Bouldering',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: null,
    },
    
    
  ]
  
  const Friends = () => {
    const [friends, setFriends] = useState(people);
  
    const addFriend = () => {
      const newFriend = {
        name: 'New Friend',
        interests: 'Exercise, Exercise',
        imageUrl: 'https://via.placeholder.com/256',
        lastSeen: null,
        lastSeenDateTime: null,
      };
  
      setFriends([...friends, newFriend]);
    };
  
    return (
      <div>
        <h3 className="text-lg font-semibold mb-2">Friends:</h3>
        <button onClick={addFriend} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md focus:outline-none focus:bg-purple-600">
          Add Friend
        </button>
        <div className="max-h-[calc(50vh-120px)] overflow-y-auto">
          <ul className="divide-y divide-gray-100">
            {friends.map((person, index) => (
              <li key={index} className="flex justify-between gap-x-6 py-5 rounded-lg border border-gray-200" style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)' }}>
                <div className="flex min-w-0 gap-x-4">
                  <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.interests}</p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  {person.lastSeen ? (
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                    </p>
                  ) : (
                    <div className="mt-1 flex items-center gap-x-1.5">
                      <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-xs leading-5 text-gray-500">Online</p>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default Friends;