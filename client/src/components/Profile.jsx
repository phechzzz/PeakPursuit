import React from 'react';

const Profile = () => {
  return (
    <>
      <article className="flex max-w-xl flex-col items-center justify-between">
        <div className="group relative">
          <div className="flex justify-center">
            <h3 className="mt-3 text-4xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600 uppercase"> {/* Made Goal Tracker all caps */}
              <a href="#">
                <span className="absolute inset-0"></span>
                Your Name
              </a>
            </h3>
          </div>
          <div className="flex justify-center">
            <img className="h-20 w-20 flex-none rounded-full bg-gray-50 mt-2" src='https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt="" /> {/* Increased profile pic size */}
          </div>
          <p className="mt-5 text-lg leading-6 text-center text-gray-600">Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.</p> {/* Centered and increased interests font size */}
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          <div className="text-lg leading-6 text-center"> {/* Centered and increased date joined font size */}
            <p className="font-semibold text-gray-900">
              <a href="#">
                <span className="absolute inset-0"></span>
                Interests:
              </a>
            </p>
            <p className="text-gray-600">Hiking, swimming, bouldering</p>
          </div>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          <div className="text-lg leading-6 text-center"> {/* Centered and increased date joined font size */}
            <p className="font-semibold text-gray-900">
              <a href="#">
                <span className="absolute inset-0"></span>
                Date joined:
              </a>
            </p>
            <p className="text-gray-600">February 12, 2024</p>
          </div>
        </div>
      </article>
    </>
  );
};

export default Profile;
