import React , {useState , useEffect } from 'react'
import {LockOpen , Lock , VpnKey} from '@material-ui/icons'
import "./UpdatePassword.css"
import Loader from '../layout/loader/Loader';
import { updatePassword } from '../../actions/userActions';
import {useDispatch , useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';

const UpdatePass = () => {

    const dispatch = useDispatch();
    const {isUpdated , loading} = useSelector((state)=>state.updateProfile) 
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")



    const updatePasswordSubmit=(e)=>{
        const myForm = new FormData();
        myForm.set("oldPassword" , oldPassword)
        myForm.set("newPassword" , newPassword)
        myForm.set("confirmPassword" , confirmPassword)
  
        dispatch(updatePassword(myForm));
    }

    useEffect(() => { 
    
        if(isUpdated){

            navigate("/account");
          
            dispatch({
                type:UPDATE_PASSWORD_RESET
            })
             
        }
        
    
      }, [isUpdated , dispatch , navigate])


  return (
<>
        {loading ? (<Loader />) : (
            <>
    <div className='updatePasswordContainer'>
        <div className='updatePasswordBox'>
        <h2 className='updatePasswordHeading'>Change Password</h2>

        <form className='updatePasswordForm'
          encType='multipart/form-data'
          onSubmit={updatePasswordSubmit}
          >
            
             <div className='signUpPassword'> 
              <Lock />
              <input 
                type='password'
                placeholder='Old password'
                required 
                name = "password"
                value={oldPassword}
                onChange={(e)=>setOldPassword(e.target.value)}
            />
             </div>
            
             <div className='signUpPassword'> 
              <VpnKey />
              <input 
                type='password'
                placeholder='New password'
                required 
                name = "password"
                value={newPassword}
                onChange={(e)=>setNewPassword(e.target.value)}
            />
             </div>
            
             <div className='signUpPassword'> 
              <LockOpen />
              <input 
                type='password'
                placeholder='Confirm password'
                required 
                name = "password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
            />
             </div>

            <input 
              type='submit'
              value='Change'
              className='updatePasswordBtn'
            />

          </form>
        </div>
    </div>

    </>
        )}
    </>
  )
}

export default UpdatePass