import React from 'react'
import Controller from '../Controller/Controller'
import Player from '../Player/Player'
import './game.css'

class Game extends React.Component {
    constructor(){
        super()
        this.state = {
            players: [
                 {id: 0, name: 'Player1', currTurnScore: null, score: null, isActive: true},
                 {id: 1, name: 'Player2', currTurnScore: null, score: null, isActive: false}
            ],
            isRunning: false,
            dice0 :null,
            dice1 :null,
            activePlayerId: 0
        }
    }

    updateState = (stateName, stateValue) => {
        this.setState(() => {
            return {
                [stateName]: stateValue
            }
        })

    }

    render(){
        console.log(this.state)
        return (
            <div className="game-container">
            <div className="players-container">
            {
                this.state.players.map(player => {
                    return <Player
                            key={player.id} 
                            id={player.id}
                            name={player.name}
                            currTurnScore={player.currTurnScore}
                            score={player.score}
                            isActive={player.isActive}
                            updateState={this.updateState}  
                    />
                })
            }
            </div>
            <div className="controller-container">
                <Controller dice={[this.state.dice0,this.state.dice1]}  updateState={this.updateState} />
            </div>
            </div>
        )
    }
}

export default Game
