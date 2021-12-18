import React from 'react'
import './player.css'

class Player extends React.Component {


    render(){
        const {avatarUrl,isWinner, name, currTurnScore,score,isActive} = this.props
        return (
            <div className={"player-container " + (isActive && "active")}>
                <img src={avatarUrl || 'mk.png'} alt="avatar" className="player-avatar" />
                <h2 className="player-name">{name}</h2>
                <h1 className="turn-score">{currTurnScore}</h1>
                <div className="winner-container">
                    {isWinner && <h1>{name} Won!!</h1>} 
                </div>
                <h3 className="score">{score}</h3>
                <div className="winner-container">
                    {isWinner && <img className='fatality' src="fatality.png" alt="" /> } 
                </div>

            </div>
        )
    }
}

export default Player