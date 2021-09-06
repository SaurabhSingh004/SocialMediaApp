import "./rightbar.css";
import Online from "../online/Online";
import axios from "axios";
import { useState,useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {Add,Remove}  from "@material-ui/icons";
export default function Rightbar({myuser}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  const [friends,setFriends]=useState([]);
  const {user:currentUser,dispatch}=useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(myuser?._id)
  );
  
  useEffect(()=>{
    setFollowed(currentUser.followings.includes(myuser?._id));
  })
  console.log(myuser,"hello",currentUser.followings.includes(myuser?._id));
  useEffect(()=>{
    const getFriends= async ()=>{
      try{
        const friendlist=await axios.get("/users/friends/"+myuser?._id);
        setFriends(friendlist.data);
        console.log("sdaaa",friends)
      }
      catch(err)
      {
      console.log(err);
      }
    };
    getFriends();
    },[myuser]);
    
  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${myuser._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: myuser._id });
      } else {
        await axios.put(`/users/${myuser._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: myuser._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

  const HomeRightbar = () => {
    console.log("thi is follwed in homebar")
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={`${PF}gift.png`} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={`${PF}gift.png`} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        
      </>
    );
  };

  const ProfileRightbar = ({myuser}) => {
    console.log("thi is follwed in profilerightbar",followed)
    return (
      <>
       {myuser.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle fw-bold">myuser information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{myuser.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{myuser.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{myuser.relationship===1 ? "Single":myuser.relationship===2 ? "Married":"-"}</span>
          </div>
          <Link to={"/editprofile/"+myuser.username} style={{textDecoration:"none"}}>
            
            {myuser.username === currentUser.username?
            <button className="rightbarEditProfile">
              Edit Profile
            
            </button>
            :null}
            </Link>
          
          
        </div>
        <h4 className="rightbarTitle">myuser friends</h4>
        
        <div className="rightbarFollowings">
          {friends.map((friend,index)=>(
            <Link to={"/profile/"+friend.username} style={{textDecoration:"none"}}>
              <div className="rightbarFollowing">
              <img
                src={friend.profilePicture?PF+friend.profilePicture:PF+"person/noAvatar.jpg"}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">{friend.username}</span>
            </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {myuser ? <ProfileRightbar myuser={myuser}/> : <HomeRightbar />}
      </div>
    </div>
  );
}
