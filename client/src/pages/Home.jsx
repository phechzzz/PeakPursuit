import Navbar from '../components/NavBar';
import Profile from '../components/Profile';
import Friends from '../components/Friends';
import Log from '../components/Log';
import Goal from '../components/Goal';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="h-screen bg-gray-100">
        <div className="container mx-auto h-full overflow-hidden">
          <div className="flex h-full">
            {/* Left column */}
            <div className="flex-1 mr-4 overflow-y-auto shadow-lg rounded-lg bg-white m-4">
              <div className="mb-4">
                <Profile />
              </div>
              <div>
                <Friends />
              </div>
            </div>
            {/* Right column */}
            <div className="flex-1 ml-4 overflow-y-auto flex flex-col">
              <div className="mb-4 shadow-lg rounded-lg bg-white m-4">
                <Goal />
              </div>
              <div className="shadow-lg rounded-lg bg-white m-4">
                <Log />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
