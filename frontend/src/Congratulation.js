import React from 'react'
import Title from './Title'
import { Link, useNavigate } from 'react-router-dom'
import CongratulationModuleCss from './css/Congratulation.module.css'

export default function Congratulation() {

    return (
        <div className={CongratulationModuleCss.congratulationSection}>
            <div className={CongratulationModuleCss.congratulationContainer}>
                <Title mainTitle={'Congratulation'}/>
                <h2>Order successfully</h2>
                <button><Link to='/home'>Back to home page</Link></button>
            </div>
        </div>
    )
}
