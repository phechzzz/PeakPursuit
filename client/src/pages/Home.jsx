import Navbar  from '../components/NavBar';
import Profile  from '../components/Profile';
import Friends  from '../components/Friends';
import Log  from '../components/Log';
import Cals from '../components/Cals';

const Home = () => {
    return (
        <>
        <Navbar />
        <h1>Hello This is Our Project 3!</h1>
        <Profile />
        <Friends />
        <Log />
        <Cals />
        </>
    );
  };
  export default Home;