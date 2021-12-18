import React from 'react'
import './dice.css'

class Dice extends React.Component {


    render(){
        return (
            <div className="dice-container">
               {
               (this.props.number > 0) && <img src={`${this.props.number}.png`} alt="dice" />
               } 
            </div>
        )
    }
}

export default Dice