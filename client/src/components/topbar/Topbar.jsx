import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from"../../context/AuthContext";
import axios from "axios";

export default function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user,dispatch}=useContext(AuthContext); 
  console.log("loguser",user);
  
  const handleClick = async () => {
    try {
      localStorage.removeItem('user');
      window.location.reload();
    }
    catch(err){
      console.log(err);
    }
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
      <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">MysocialApp</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink" onClick={handleClick}>Logout</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`} style={{ textDecoration: "none" }}>
        <img src={user.profilePicture?PF+user.profilePicture:PF+"person/noAvatar.jpg"} alt="" className="topbarImg"/>
        </Link>
      </div>
    </div>
  );
}
