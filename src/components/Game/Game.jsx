import React from 'react'
import Controller from '../Controller/Controller'
import Player from '../Player/Player'
import Settings from '../Settings/Settings'
import './game.css'

class Game extends React.Component {

    state = {
        player0: { id: 0, avatarUrl: '', name: 'Player1', currTurnScore: 0, score: 0, isActive: true, isWinner: false },
        player1: { id: 1, avatarUrl: '', name: 'Player2', currTurnScore: 0, score: 0, isActive: false, isWinner: false },
        isRunning: false,
        dice0: 0,
        dice1: 0,
        targetPoints: 100,
        isSettingsMode: false
    }

    playAudio = audio => {
        new Audio(audio).play()
    }
    updateState = (stateName, stateValue) => {
        this.setState({ [stateName]: stateValue }, () => {
            return {
                [stateName]: stateValue
            }
        })
    }

    checkWinner = (score, currTurnScore) => {
        return (score + currTurnScore >= this.state.targetPoints)
    }


    updateObjState = (playerObj, keys, values) => {
        const activePlayerCopy = Object.assign({}, playerObj)
        keys.forEach((key, i) => {
            if (key === 'currTurnScore' || key === 'avatarUrl') {
                activePlayerCopy[key] = (values[i] === 0) ?
                    values[i] :
                    activePlayerCopy[key] + values[i]

                const playerWon = this.checkWinner(activePlayerCopy.score, activePlayerCopy.currTurnScore)
                if (playerWon) this.playAudio('./sounds/fatality.mp3')
                this.updateState('isRunning', !playerWon)
                activePlayerCopy.isWinner = playerWon
            } else activePlayerCopy[key] = values[i]
        })
        this.updateState(`player${playerObj.id}`, activePlayerCopy)
    }


    render() {

        const { player0, player1, targetPoints, isSettingsMode } = this.state
        return (
            <div className="game-container">
                <div className="players-container">
                    {
                        [player0, player1].map(player => {
                            const { avatarUrl, id, name, currTurnScore, score, isActive, isWinner } = player
                            return <Player
                                key={id}
                                avatarUrl={avatarUrl}
                                id={id}
                                name={name}
                                currTurnScore={currTurnScore}
                                score={score}
                                isActive={isActive}
                                isWinner={isWinner}
                                updateState={this.updateState}
                            />
                        })
                    }
                </div>
                <div>
                    <Controller playAudio={this.playAudio} state={this.state} updateObjState={this.updateObjState} updateState={this.updateState} />
                </div>
                {isSettingsMode && <Settings
                    playAudio={this.playAudio}
                    player0={player0}
                    player1={player1}
                    targetPoints={targetPoints}
                    updateObjState={this.updateObjState}
                    updateState={this.updateState} />}

            </div>
        )
    }
}

export default Game
