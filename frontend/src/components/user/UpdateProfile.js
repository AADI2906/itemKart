import React , {useState , useEffect } from 'react'
import { Face, MailOutline } from '@material-ui/icons'
import "./UpdateProfile.css"
import Loader from '../layout/loader/Loader';
import { load, update } from '../../actions/userActions';
import {useDispatch , useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import { UPDATE_RESET } from '../../constants/userConstants';

const UpdateProfile = () => {

    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.user) 
    const {isUpdated , loading} = useSelector((state)=>state.updateProfile) 
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email)
    const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);



    const updateProfileSubmit=(e)=>{
        const myForm = new FormData();
        myForm.set("name" , name)
        myForm.set("email" , email)
        myForm.set("avatar" , avatar)
  
        dispatch(update(myForm));
    }
  
    const updateProfileDataChange =(e)=>{
        const reader = new FileReader();
  
        reader.onload =()=>{
          if(reader.readyState===2){
            setAvatarPreview(reader.result)
            setAvatar(reader.result)
          }
        };
  
        reader.readAsDataURL(e.target.files[0]);
    }

    useEffect(() => { 

        if(user){
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.url)
        }
    
        if(isUpdated){
          
            dispatch(load()); 
          
            dispatch({
                type:UPDATE_RESET
            })
             
            navigate("/account");
          
        }
        
    
      }, [isUpdated , dispatch , navigate ,user  ])
      
  

  return (
    <>
        {loading ? (<Loader />) : (
            <>
    <div className='updateProfileContainer'>
        <div className='updateProfileBox'>
        <h2 className='updateProfileHeading'>Update Profile</h2>
        <form className='updateProfileForm'
          encType='multipart/form-data'
          onSubmit={updateProfileSubmit}
          >

          <div className='updateProfileName'>
            <Face />
            <input 
              type='text'
              required
              name='name' 
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div className='updateProfileEmail'>
            <MailOutline/>
            <input
              type='email'
              placeholder = "Email" 
              name = "email"
              value={email}
              required
              onChange={(e)=>setEmail(e.target.value)}
            />
             </div>

             <div id='updateProfileImage'> 
              <img src={avatarPreview} alt='avatarPreview'/>
              <input 
                type='file'
                name='avatar'
                accept='image/*'
                onChange={updateProfileDataChange}
              />
             </div>

            <input 
              type='submit'
              value='Update'
              className='updateProfileBtn'
            />

          </form>
        </div>
    </div>

    </>
        )}
    </>

    
  )
}

export default UpdateProfile