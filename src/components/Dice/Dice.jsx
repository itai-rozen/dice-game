import React from 'react'
import './dice.css'

class Dice extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="dice-container">
                {/* <img src="" alt="dice" /> */}
                <p>{this.props.number}</p>
            </div>
        )
    }
}

export default Dice