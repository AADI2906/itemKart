import React , {useState , useEffect } from 'react'
import {LockOpen , Lock , VpnKey} from '@material-ui/icons'
import "./ResetPassword.css"
import Loader from '../layout/loader/Loader';
import { resetPass} from '../../actions/userActions';
import {useDispatch , useSelector} from "react-redux";
import { useNavigate , useParams } from 'react-router-dom';




const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading , success} = useSelector((state)=>state.forgotPassword)
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const { token } = useParams();
    const resetPasswordSubmit = (e)=>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("newPassword" , newPassword);
        myForm.set("confirmPassword" , confirmPassword);
        dispatch(resetPass(myForm , token))
    }

    useEffect(() => {
      
        if(success === true){
            navigate("/login");
        }

    }, [success , navigate])
    

    return (
        <>
            {loading ? (<Loader />) : (
        <>
        <div className='resetPasswordContainer'>
            <div className='resetPasswordBox'>
            <h2 className='resetPasswordHeading'>Change Password</h2>

            <form className='resetPasswordForm'
            encType='multipart/form-data'
            onSubmit={resetPasswordSubmit}
            >
                
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
                value='Reset'
                className='resetPasswordBtn'
                />

            </form>
            </div>
        </div>

        </>
            )}
        </>
  )
}

export default ResetPassword