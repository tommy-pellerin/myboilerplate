import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import UpdateProfile from './UpdateProfile';
import DisplayProfile from './DisplayProfile';

// utiliser la vateur de Jotai atom pour re render apres mise à jour;
import { useAtomValue} from 'jotai';
import { userAtom } from '../atoms/user';
//call personalized hook
import useFetch from '../useFetch/index.js';

function Profile() {
  const currentUser = useAtomValue(userAtom)
  const [user,setUser] = useState({})
  const [isUpdating, setIsUpdating] = useState(false)
  const { userID } = useParams();

  // Initialize useFetch at the top level, but don't execute it yet
  const { data, error, isLoading, executeFetch } = useFetch(`http://localhost:1337/api/users/${userID}`,'get', null, false)
  

  useEffect(() => {
    if (currentUser) { // Only fetch when currentUser is not null
      console.log(new Date());
      console.log("je fetche profile");
      executeFetch(); //execute the hook when need
      console.log("j'ai fini de fetché profil")
    }
  }
  ,[userID, currentUser]) //utiliser la valeur de Jotai atom pour re render apres mise à jour;

  useEffect(() => {
    console.log(data);
    if (data) {
      setUser(data);
    }
  }, [data]);

  return ( 
    <div>
      <h1>Profile</h1>      
      {isUpdating ? <UpdateProfile user={user} setIsUpdating={setIsUpdating} />:
        <>
          <DisplayProfile user={user} setIsUpdating={setIsUpdating}/>
        </>
      }
      
    </div>
  );
}

export default Profile;