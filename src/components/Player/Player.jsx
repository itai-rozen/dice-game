import React from 'react'
import './player.css'

class Player extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        const {id, name, currTurnScore,score,isActive} = this.props
        return (
            <div className={"player-container " + (isActive && "active")}>
                <img src="" alt="avatar" className="player-avatar" />
                <h1 className="player-name">{name}</h1>
                <h2 className="turn-score">{currTurnScore}</h2>
                <h3 className="score">{score}</h3>
            </div>
        )
    }
}

export default Player