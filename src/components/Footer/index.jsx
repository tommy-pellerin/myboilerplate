//Styles
import { FaGithub } from "react-icons/fa";

//extern inport
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="flex justify-around border-t-2 py-5">
      <div>
        <p>© 2024 Tommy Pellerin, all right reserved.</p>
      </div>
      <div>
        <ul>
          <li><Link to="#">Condition d&apos;utilisation</Link></li>
          <li><Link to="#">Politique de confidentialité</Link></li>
          <li><Link to="#">Mentions légales</Link></li>
        </ul>
      </div>
      <div>
        <a href="https://github.com/tommy-pellerin">
          <FaGithub />
        </a>
      </div>
    </footer>
  )
}

export default Footer