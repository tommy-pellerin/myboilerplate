//Styles

//Intern import
import Navbar from "./components/Navbar"
import PageNotFound from "./components/PageNoteFound"
import Home from "./components/Home"
import Profile from "./components/Profile"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Logout from "./components/Logout"
import Footer from "./components/Footer"
import Workouts from "./components/Workouts"
import { useAtomValue } from 'jotai'
import { userAtom } from './components/atoms/user'
import Loading from "./components/Loading"

//Extern import
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'


const PrivateRoute = ({ children }) => {

  const { id, isLoading } = useAtomValue(userAtom);
  console.log("isLoading", isLoading);
  const location = useLocation();

  if (isLoading) {
    return <Loading />; // Render Loading component when isLoading is true
  }

  if (id) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} />;
  }
}

const LoggedRoute = ({ children }) => {
  const currentUser = useAtomValue(userAtom);
  const location = useLocation();
  if (!currentUser.id) {
    alert('You must be logged in to log out');
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
};

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/workouts" element={<Workouts />}/>
          <Route path="/workouts/:slug" element={<Workouts />}/>
          <Route path="/profile/:userID" element={<PrivateRoute><Profile /></PrivateRoute>}/>
          <Route path="/sigup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/logout" element={<LoggedRoute><Logout /></LoggedRoute>}/>
          <Route path="*" element={<PageNotFound />}/> {/*Toutes les pages non prévu afficheront cette page*/}
        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </>
  )
}

export default App
