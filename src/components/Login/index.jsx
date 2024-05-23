import Cookies from 'js-cookie'
import { useEffect } from 'react';
import {useNavigate, useLocation} from "react-router-dom"
//connect to Jotai
import { useSetAtom } from 'jotai';
import { userAtom } from '../atoms/user.js';
//call personalized hook
import useFetch from '../useFetch/index.js';

function Login() {
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom)
  let location = useLocation();

  // Initialize useFetch at the top level, but don't execute it yet
  const { data, error, isLoading, executeFetch } = useFetch("http://localhost:1337/api/auth/local",'post', null, false)
  
  const handleSubmit = (event) =>{
    event.preventDefault()
    const formData = new FormData(event.target);
    const newFormdata = Object.fromEntries(formData);
    console.log(newFormdata);
    executeFetch(newFormdata); //execute the hook when need
  }
  
  useEffect(() => {
    if (data) {
      Cookies.set('token', data.jwt);
      console.log(data);
      // Dispatch Jotai store
      setUser({
        id:data.user.id,
        username:data.user.username,
        isLoading:false
      })
      // Redirect to prévious page or to home page
      let { from } = location.state || { from: { pathname: "/" } };
      navigate(from);
    }
  }, [data]); // Add data as a dependency

  return ( 
    <div className='border-2 rounded-lg border-blue-900 mx-10 py-5'>
      <h1>LogIn</h1>
      <form onSubmit={handleSubmit}>
        <div className='my-3'>
          <label htmlFor="Email">Email</label><br />
          <input className="border-2 rounded-lg border-blue-900 px-10 text-center" type="email" id="Email" name="identifier" placeholder="Your Email" required></input>
        </div>
        <div className='my-3'>
          <label htmlFor="Password">Password</label><br />
          <input className="border-2 rounded-lg border-blue-900 px-10 text-center" type="password" id="Password" name="password" placeholder="Your Password" required></input>

        </div>
        <button type="submit" className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-lg">Submit</button>
      </form>
    </div>
  );
}

export default Login;