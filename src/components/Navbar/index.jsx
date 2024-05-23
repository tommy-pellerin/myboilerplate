import { Link } from "react-router-dom";
import Logout from "../Logout"
import { useAtomValue } from "jotai";
import { userAtom } from "../atoms/user";

//Extern import

//Styles
import { FaHome } from "react-icons/fa";

function Navbar() {
  const user = useAtomValue(userAtom)

  return ( 
    
    <nav className="flex justify-around">
      <div>
        <Link to="/" className="flex justify-between">
          <FaHome />
          <p>LOGO</p>
        </Link>
      </div>
      <div className="">
        <Link to="workouts">Trouver une séance</Link>
      </div>
      <div className="">
        <button>Proposer une séance</button>
      </div>
      <div className="flex justify-between">
        <div>Language</div>
        <div>Dark/Light</div>
      </div>
      <div>
          <button>Menu</button>
          <ul>
            <li><Link to="/profile/me">Profile</Link></li>
            <li><Link to="/sigup">Sign Up</Link></li>
            <li><Link to="/login">Log In</Link></li>
            <li><Link to="/logout">Log Out</Link></li>
          </ul>
      </div>
    </nav>
  );
}

export default Navbar;