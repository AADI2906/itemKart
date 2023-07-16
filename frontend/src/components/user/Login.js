import React , {useState , useRef , useEffect } from 'react'
import { Face, LockOpen, MailOutline } from '@material-ui/icons'
import "./Login.css"
import Loader from '../layout/loader/Loader';
import { Link, redirect } from 'react-router-dom'
import { login, register } from '../../actions/userActions';
import {useDispatch , useSelector} from "react-redux";
import { useNavigate , useLocation } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const navigate = useNavigate();
  const switcherTab = useRef(null);
  const regiserTab = useRef(null);
  const loginTab = useRef(null);

  const {loading , isAuth , error} = useSelector((state)=>state.user) 

  const redirect = location.search ? location.search.split("=")[1] : "/account"

  useEffect(() => {
    
    if(isAuth){
      navigate(redirect);
    }
    

  }, [isAuth])
  

  const loginSubmit =(e)=>{
    e.preventDefault();
    dispatch(login(loginEmail , loginPassword));
  }

  const switchTabs =(e , type)=>{
    if(type==="login"){
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      regiserTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    
    if(type==="register"){
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");
      regiserTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");

    }

  }

  const [user, setUser] = useState({
    name:"" , email:"" , password:""
  })

  const {name , email , password} = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/logo512.png");


  const registerSubmit=(e)=>{
      const myForm = new FormData();
      myForm.set("name" , name)
      myForm.set("password" , password)
      myForm.set("email" , email)
      myForm.set("avatar" , avatar)

      dispatch(register(myForm));
  }

  const registerDataChange =(e)=>{
    if(e.target.name==="avatar"){
      const reader = new FileReader;

      reader.onload =()=>{
        if(reader.readyState===2){
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
        }
      };

      reader.readAsDataURL(e.target.files[0]);

    }
    else{
      setUser({...user , [e.target.name]:e.target.value});
    }
  }



  return (<>
       {
        loading?(<Loader/>):(
          <>
          <div className='LoginSignUpContainer'>
        <div className='LoginSignUpBox'>
          <div>
            <div className='login_signUp_toggle'>
              <p onClick={(e)=>switchTabs(e , "login")}>LOGIN</p>
              <p onClick={(e)=>switchTabs(e , "register")}>REGISTER</p>
            </div>
            <button ref = {switcherTab}></button>
          </div>

          <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
          <div className='loginEmail'>
            <MailOutline/>
            <input
              type='email'
              placeholder = "Email" 
              value={loginEmail}
              required
              onChange={(e)=>setloginEmail(e.target.value)}
             />
             </div>
             <div className='loginPassword'> 
              <LockOpen />
              <input 
                type='password'
                required 
                value={loginPassword}
                onChange={(e)=>setloginPassword(e.target.value)}
              />
             </div>
             <Link to="/password/forgot" >Forgot password</Link>
             <input type='submit' value='Login' className='loginBtn'/>
          </form>

          <form className='signUpForm'
          ref={regiserTab}
          encType='multipart/form-data'
          onSubmit={registerSubmit}
          >

          <div className='signUpName'>
            <Face />
            <input 
              type='text'
              required
              name='name' 
              value={name}
              onChange={registerDataChange}
            />
          </div>

          <div className='signUpEmail'>
            <MailOutline/>
            <input
              type='email'
              placeholder = "Email" 
              name = "email"
              value={email}
              required
              onChange={registerDataChange}
             />
             </div>
             <div className='signUpPassword'> 
              <LockOpen />
              <input 
                type='password'
                required 
                name = "password"
                value={password}
                onChange={registerDataChange}
            />
             </div>

             <div id='registerImage'> 
              <img src={avatarPreview} alt='avatarPreview'/>
              <input 
                type='file'
                name='avatar'
                accept='image/*'
                onChange={registerDataChange}
              />
             </div>

            <input 
              type='submit'
              value='register'
              className='signUpBtn'
              // disabled = {loading ? true : false}
            />

          </form>

        </div>
        </div>
          </>
        )
       }
  </>
  )
}

export default Login