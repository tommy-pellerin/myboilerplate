import { Link } from "react-router-dom";
import Logout from "../Logout"
import { useAtomValue } from "jotai";
import { userAtom } from "../atoms/user";
import { useState, useEffect, useRef } from "react";
//Extern import

//Styles
import { FaHome } from "react-icons/fa";

function Navbar() {
  const user = useAtomValue(userAtom)
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); //unmount the eventListener
    };
  }, []);

  const closeDropdown = () => {
    setIsOpen(false);
  };

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
      <div className="relative"  ref={dropdownRef}>
        <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
        {isOpen && (
          <ul className="absolute right-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl">
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link to="/profile/me" onClick={closeDropdown}>Profile</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link to="/signup" onClick={closeDropdown}>Sign Up</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link to="/login" onClick={closeDropdown}>Log In</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link to="/logout" onClick={closeDropdown}>Log Out</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;