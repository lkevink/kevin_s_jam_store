import React from 'react'
import TitleModuleCss from './css/Title.module.css'

export default function Title(props) {
    return (
        <div>                
            <h1 className={TitleModuleCss.title} style={{borderBottom: '5px solid black', textAlign: 'center', color: "black", fontWeight: "bold", marginLeft: "10%", marginRight: "10%" }} >
                {props.mainTitle} 
                {props.subTitle}
            </h1>
        </div>
    )
}
