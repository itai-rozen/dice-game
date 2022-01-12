import React from 'react'
import Dice from '../Dice/Dice'
import './controller.css'

class Controller extends React.Component {



    getRandomDiceNumber = () => Math.floor(Math.random() * 6 + 1)

    getPlayers = () => {
        const { state } = this.props
        const { player0, player1 } = state
        return [player0, player1]
    }

    getPlayerByProp = (prop, value) => {
        const players = this.getPlayers()
        return players.find(player => player[prop] === value)
    }



    handleHold = () => {
        const { updateObjState } = this.props
        const activePlayer = this.getPlayerByProp('isActive', true)
        const nonActivePlayer = this.getPlayerByProp('isActive', false)
        const {  score,currTurnScore } = activePlayer
        updateObjState(activePlayer, ['score', 'currTurnScore', 'isActive'], [score+currTurnScore, 0, false])
        updateObjState(nonActivePlayer, ['isActive'], [true])
    }



    handleNewGame = () => {
        const {  player0, player1 } = this.props.state
        const { updateObjState, updateState } = this.props
        updateState('dice0', 0)
        updateState('dice1', 0)
        updateState('isRunning',true)
        const randomIsActive = Math.random() > 0.5
        updateObjState(player0, ['score', 'currTurnScore', 'isWinner', 'isActive'], [0, 0, false, randomIsActive])
        updateObjState(player1, ['score', 'currTurnScore', 'isWinner', 'isActive'], [0, 0, false, !randomIsActive])
        this.props.playAudio('./sounds/fight.mp3')
    }



    handleRoll = () => {
        const { updateState, updateObjState } = this.props
        const dice0 = this.getRandomDiceNumber()
        const dice1 = this.getRandomDiceNumber()
        const activePlayer = this.getPlayerByProp('isActive', true)
        const nonActivePlayer = this.getPlayerByProp('isActive', false)
        updateState('dice0', dice0)
        updateState('dice1', dice1)
        if (dice0 === dice1) {
            updateObjState(activePlayer, ['currTurnScore', 'isActive'], [0, false])
            updateObjState(nonActivePlayer, ['isActive'], [true])
            this.props.playAudio('./sounds/toasty.mp3')
        }
        else {
            updateObjState(activePlayer, ['currTurnScore'], [dice0 + dice1])
            this.props.playAudio(`./sounds/hit${this.getRandomDiceNumber()}.mp3`)
        }
    }

    handleSettings = () => {
        this.props.updateState('isSettingsMode',true)
        this.handleNewGame()
    }
    

    render() {
        const { state } = this.props
        const { dice0, dice1,targetPoints,isRunning } = state
        return (
            <div className="controller-container">
                <div className="side-btn-container">

                <button className={`${!isRunning && "glow"} new-game-btn`} onClick={() => this.handleNewGame()}>New game</button>
                <button disabled={isRunning} className={`${!isRunning && "glow"} new-game-btn`} onClick={() => this.handleSettings()}>Settings</button>
                </div>
                <div className="score-container">
                    <h4>Target Score</h4>
                    <p onChange={() => this.handleInput} className="score-input">{targetPoints}</p>
                </div>
                <div className="dice-container">
                    <Dice number={dice0} />
                    <Dice number={dice1} />
                </div>
                <div className="side-btn-container">
                <button  disabled={ !isRunning} onClick={() => this.handleHold()}>Hold</button>
                <button disabled={!isRunning } onClick={() => this.handleRoll()}>Roll Dice</button>
                </div>
            </div>
        )
    }

}

export default Controller