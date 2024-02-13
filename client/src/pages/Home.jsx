import Navbar  from '../components/NavBar';
import Profile  from '../components/Profile';
import Friends  from '../components/Friends';
import Log  from '../components/Log';
import Goal from '../components/Goal';

const Home = () => {
    return (
      <>
        <Navbar />
        <div className="container mx-auto max-h-screen overflow-hidden">
          <div className="flex h-full">
            {/* Left column */}
            <div className="flex-1 mr-4 overflow-y-auto">
              <div className="mb-4">
                <Profile />
              </div>
              <div>
                <Friends />
              </div>
            </div>
            {/* Middle column */}
            <div className="flex-1 mx-4 overflow-y-auto">
              <Goal />
            </div>
            {/* Right column */}
            <div className="flex-1 ml-4 overflow-y-auto">
              <Log />
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Home;