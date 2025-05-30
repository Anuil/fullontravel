import { useUserState } from '../../features/user/userstateSlice';
// import { Link } from "react-router-dom";
import Link from 'next/link';

import {useSendLogoutMutation} from '../../features/auth/authApiSlice'


const BASE_FILE_SRC = "https://cdn.fullontravel.com/"
const Profile = () => {
  const [logout] = useSendLogoutMutation();
  let nameParts, abbreviation = null;
  const { user } = useUserState();
  
  if (user) {    
    nameParts = user.firstName.split(" ");
    abbreviation = nameParts.map(part => part.charAt(0).toUpperCase())
      .join('');
    nameParts = nameParts[0];

  }
  const handleLogout= async() =>{
    await logout();
    location.reload();
  }
  return (
    <>
      <div className="dropdown aftLogin">
        <button className="userproBtn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          {
            user?.profileImageUrl ? <div className="userProfile">
              <img src={BASE_FILE_SRC + user?.profileImageUrl} alt={abbreviation} />
            </div> : <div className="userProfile">{abbreviation}</div>
          }
          
          
          <span className="userName">Hi, {nameParts}</span>
        </button>

        <ul className="dropdown-menu">
          <li><Link className="dropdown-item" href="/profile">Profile</Link></li>
          <li><span className="dropdown-item" onClick={()=>handleLogout()}>Logout</span></li>
        </ul>
      </div>
    </>
  )
}

export default Profile
