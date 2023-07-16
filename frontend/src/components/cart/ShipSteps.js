import React from 'react'
import "./ShippingSteps.css"
import { Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import { AccountBalance, LibraryAddCheck, LocalShipping } from '@material-ui/icons'


const ShipSteps = ({step}) => {

    const steps = [
    {
        label: <Typography>Shipping Details</Typography> ,
        icon: <LocalShipping />
    },
    {
        label: <Typography>Confirm Order</Typography> ,
        icon: <LibraryAddCheck />
    },
    {
        label: <Typography>Payment</Typography> ,
        icon: <AccountBalance />
    }
]

const styles = {
    boxSizing:"border-box"
}

  return (
    <>
        <Stepper alternativeLabel ShipSteps={step} style={styles} >
            {steps.map((item , index)=>(
                <Step key={index} active = {step===index ? true : false} completed = {step>=index ? true : false}>
                    <StepLabel icon={item.icon}
                        style={{color : step>=index ? 'tomato' : "rgba(0,0,0,0.649)"}}
                     >
                        {item.label}
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    </>


  )
}

export default ShipSteps