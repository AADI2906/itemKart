import React , {useState} from 'react'
import "./Search.css"
import { useNavigate } from "react-router-dom"

const Search = () => {
    
const navigate = useNavigate();
    

    const [keyword, setkeyword] = useState("")

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
          navigate("/products");
        }
      };



  return (
    <>
        <form className='searchBox' onSubmit={submitHandler}>
            <input type='text' placeholder='Search a product...' onChange={(e)=>setkeyword(e.target.value)} />
            <input type='submit' value="search" />
        </form>
    </>
  )
}

export default Search