import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useState,useEffect } from "react";
import { useContext } from "react";
import {AuthContext} from"../../context/AuthContext"; 
import axios from "axios";
import {format} from "timeago.js";
import {Link} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import { Popover,PopoverBody,DropdownMenu,Dropdown, DropdownItem ,DropdownToggle} from 'reactstrap';

const dotenv = require("dotenv");
dotenv.config();
export default function Post({ post }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [user,setUser] = useState({})
  const {user:currentuser}=useContext(AuthContext);
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  const [popoverOpen,setState]=useState(false);
  const onHover = () => {
    setState(true)
  }
  
  const onHoverLeave = () => {
    
    setState(false)
  }
  const clickme = () => {
  
    setDropdownOpen(!dropdownOpen);
  }
  const handleClick = async () => {
    try {
    await axios.put(`/posts/${post._id}`, {
      userId: currentuser._id,
    });
    
    window.location.reload();
    window.alert("Post has been successfully deleted");
    }
     catch (err) {
    }
  };
  
  useEffect(()=>{
    setIsLiked(post.likes.includes(currentuser._id))
  },[currentuser._id,post.likes])
  const likeHandler =()=>{
    try{
        axios.put("/posts/"+post.id+"/like",{userId:currentuser._id})
    }
    catch(err){

    }
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
          <Link to={`/profile/${user.username}`} style={{ textDecoration: "none" }}>
        <img src={user.profilePicture?PF+user.profilePicture:PF+"person/noAvatar.jpg"} alt="" className="topbarImg"/>
        </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            
          <button id="Popover1" type="button" className="deletepost" onClick={handleClick} style={{textDecoration:"none"}} onMouseEnter={onHover}
            onMouseLeave={onHoverLeave}><DeleteIcon /></button>
        <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" >
          <PopoverBody>Click here to Delete Post!!</PopoverBody>
        </Popover>
        {/* <Dropdown isOpen={dropdownOpen} toggle={clickme}>
      <DropdownToggle caret>
        <span id="toggle" onClick={clickme}><MoreVert/></span>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem><button id="Popover1" type="button" className="deletepost" onClick={handleClick} style={{textDecoration:"none"}} onMouseEnter={onHover}
            onMouseLeave={onHoverLeave}><DeleteIcon /></button></DropdownItem>
      </DropdownMenu>
    </Dropdown> */}
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF+post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={PF+"like.png"} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={PF+"heart.png"} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
