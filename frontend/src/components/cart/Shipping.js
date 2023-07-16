import React , {useState , useEffect} from 'react'
import {PinDrop , LocationCity , Public , Phone , TransferWithinAStation , Home} from "@material-ui/icons"
import {  saveShippingInfo  } from '../../actions/cartActions';
import {useDispatch , useSelector} from "react-redux";
import "./Shipping.css"
import {Country , State} from "country-state-city"
import ShipSteps from './ShipSteps';
import { useNavigate } from 'react-router-dom';


const Shipping = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {shipInfo} = useSelector((state)=> state.cart)
    
    const [address, setAddress] = useState(shipInfo.address);
    const [country, setCountry] = useState(shipInfo.country);
    const [state, setState] = useState(shipInfo.state);
    const [city, setCity] = useState(shipInfo.city);
    const [pinCode , setPinCode] = useState(shipInfo.pincode);
    const [phone , setPhone] = useState(shipInfo.phone);

    const shippingSubmit=(e)=>{
        e.preventDefault();
        if(phone.length !== 10) return;
        dispatch(saveShippingInfo({address,
          country,
          state,
          city,
          pinCode,
          phone}))
          navigate("/order/confirm")
    }

  return (
    <>
        <ShipSteps step ={0} />
        <div className='shippingContainer'>
            <div className='shippingBox'>
                <h2 className='shippingHeading'>Shipping Details</h2>
                <form
                className="shippingForm"
                encType="multipart/form-data"
                onSubmit={shippingSubmit}
            >
                <div>
                <Home />
                <input
                    type="text"
                    placeholder="Address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                </div>

                <div>
              <LocationCity />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PinDrop />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <Phone />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                size="10"
              />
            </div>

            <div>
                <Public />
                <select value={country} required onChange={(e)=>setCountry(e.target.value)}>
                <option value='country'>Country</option>
                {
                    Country && Country.getAllCountries().map((country)=>(
                        <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                    ))
                }
                </select>
            </div>

            {
              country && (
                <div>
                  <TransferWithinAStation />
                  <select value={state} required onChange={(e)=>setState(e.target.value)}>
                  <option value='state'>States</option>
                  {
                    State && State.getStatesOfCountry(country).map((state)=>(
                      <option key={state.name} value={state.name}>{state.name}</option>
                    ))
                  }
                  </select>
                </div>
              )
            }


            <input type='submit' value='continue' className='shippingBtn' disabled = {state ? false : true}
            />

                
                
                </form>

            </div>
        </div>
    </>
  )
}

export default Shipping