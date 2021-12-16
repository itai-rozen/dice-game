import React from 'react'
import Dice from '../Dice/Dice'
import './controller.css'

class Controller extends React.Component {
    constructor(props) {
        super(props)
    }
    getRandomDiceNumber = () => Math.floor(Math.random() * 6 + 1)
    
    rollDice = () => {
        this.props.updateState('dice0', this.getRandomDiceNumber() )
        this.props.updateState('dice1', this.getRandomDiceNumber() )    
    }



    render() {
        return (
            <div className="controller-container">
                <button>New game</button>
                <div className="score-container">
                    <h2>Score</h2>
                    <div className="dice-container">
                        <Dice number={this.props.dice[0]} />
                        <Dice number={this.props.dice[1]} />
                    </div>
                    <p className="score-input"></p>
                </div>
                <button>Hold</button>
                <button onClick={() => this.rollDice()}>Roll Dice</button>
            </div>
        )
    }

}

export default Controller