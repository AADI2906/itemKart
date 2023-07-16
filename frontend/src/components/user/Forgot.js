import React , {useState , useEffect } from 'react'
import { MailOutline  } from '@material-ui/icons'
import "./ForgotPassword.css"
import Loader from '../layout/loader/Loader';
import { forgot } from '../../actions/userActions';
import {useDispatch , useSelector} from "react-redux";

const Forgot = () => {

    const dispatch = useDispatch();
    const {message , loading} = useSelector((state)=>state.forgotPassword) 

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit=(e)=>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email" , email);
        dispatch(forgot(myForm));
    }

    useEffect(() => {
      if(message){
        console.log(message);
      }
    }, [message]);
    

  return (
    <>
        {loading ? (<Loader />) : (
            <>

            <div className='forgotPasswordContainer'>
            <div className='forgotPasswordBox'>
            <h2 className='forgotPasswordHeading'>Forgot Password</h2>
            <form className='forgotPasswordForm'
            encType='multipart/form-data'
            onSubmit={forgotPasswordSubmit}
            >

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


                <input 
                type='submit'
                value='Send'
                className='forgotPasswordBtn'
                />

            </form>
            </div>
         </div>

        </>
        )}
    </>

    
  )
}

export default Forgot