import "./profile.css";
import { useEffect,useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import {useParams}from "react-router";
import axios from "axios";
export default function EditProfile() {
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
  return (
    <>
      <Topbar />
      <div className="Editprofile">
        
      </div>
    </>
  );
}
