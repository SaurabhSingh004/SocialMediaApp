import "./profile.css";
import { useEffect,useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import {useParams}from "react-router";
import axios from "axios";
export default function Profile() {
  const [user,setUser] = useState({})
  const username=useParams().username;
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
      
    };
    
    fetchUser();
    
  }, [username]);
  console.log("lkjhgfdsa",user)
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture?PF+user.coverPicture :PF+'person/2.jpeg'}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture?PF+user.profilePicture :PF+'person/noAvatar.jpg'}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username}/>
            <Rightbar myuser={user}/>
          </div>
        </div>
      </div>
    </>
  );
}
