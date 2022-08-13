import "./Profile.css";

import{ uploads} from "../../utils/config";

//components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXlg } from "react-icons/bs";

//hooks 
import { useState, useEffect, useRef} from "react"
import { useSelector, useDispatch } from "react-redux";
import { useParams} from "react-router-dom";

//redux

import { getUserDetails } from "../../slices/userSlice";



const Profile = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const { user, loading } = useSelector((state) => state.user);
    const { user: userAuth } = useSelector((state) => state.auth);

//New form and edi form ref
const newPhotoForm = useRef();
const editPhotoForm = useRef();


//load user data

  // Load user data
    useEffect(() => {
   dispatch(getUserDetails(id));
    
  }, [dispatch, id]);

  const submitHandle = (e) =>{
    e.preventDefault();
  }

if(loading){
    return <p>Carregando...</p>
}

  return (
    <div id="profile">
        <div className="profile-header">
                {user.profileImage && (
                    <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
                )}
        
                <div className="profile-description">
                    <h2>{user.name}</h2>
                    <p>{user.bio}</p>
                </div>
        </div>

       {id === userAuth._id &&(
        <>
            <div className="new-photo" ref={newPhotoForm}>
                <h3>Compartilhe Algum momento eu:</h3>
                <form onSubmit={submitHandle} > 
                    <label>
                        <span>Titulo para a foto:</span>
                        <input type="text" placeholder="Insira um titulo" />
                    </label>
                    <label>
                        <span>Imagem:</span>
                        <input type="File" />
                    </label>
                    <input type="submit" value="postar"/>
                </form>
          </div>
        </>
       )}
    </div>
  )
}

export default Profile