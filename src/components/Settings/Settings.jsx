import React from 'react'
import './settings.css'

class Settings extends React.Component {


    handleSubmit = e => {
        e.preventDefault()
        this.props.updateState('isSettingsMode', false)
        this.props.playAudio('./sounds/outstanding.mp3')
    }
    handleChange = e => {
        const { id, value } = e.target
        if (value) {
            if (id !== 'targetPoints') {
                this.props.updateObjState(this.props[id], ['name'], [value])
            } else {
                this.props.updateState(id, value)
            }
        }
    }
    render() {
        const avatarUrls = [
            './mk/1.png',
            './mk/2.png',
            './mk/3.png',
            './mk/4.png',
            './mk/5.png',
            './mk/6.png',
            './mk/7.png',
            './mk/8.png',
            './mk/9.png',
            './mk/10.png',
            './mk/11.png',
            './mk/12.png'
        ]
        const { player0, player1, targetPoints } = this.props
        return (
            <div className="settings-container">
                <div className="avatars-wrapper">

                <h2 className='character-header'>Player 1 Character</h2>
                <div className="avatars-container">
                    {
                        avatarUrls.map((url, i) => {
                            return (
                                <label className='radio-label' key={`player0-avatar-${i + 100}`} htmlFor={`player0-avatar-${i}`}>
                                    <input key={`player0-input-${i}`}
                                        className='radio-btn'
                                        type="radio"
                                        name="player0-avatar"
                                        id={`player0-avatar-${i}`}
                                        value={url}
                                        onChange={(e) => this.props.updateObjState(player0,['avatarUrl'],[`${e.target.value}`])}
                                        data-state="avatarUrl" />
                                    <img className='avatar-img' key={`player0-img-${i}`} src={url} alt="" />
                                </label>

                            )
                        })
                    }
                </div>
                </div>

                <form className='settings-form' onSubmit={(e) => this.handleSubmit(e)} onChange={(e) => this.handleChange(e)}>

                    <div className="fields-container">
                        <label htmlFor="player0">Player 1 Name</label>
                        <input id="player0" data-state="player0" type="text" placeholder={player0.name} />
                        <label htmlFor="player1">Player 2  Name</label>
                        <input id="player1" data-state="player1" type="text" placeholder={player1.name} />
                        <label htmlFor="targetPoints">Target Score</label>
                        <input type="number" data-state="targetPoints" id="targetPoints" placeholder={targetPoints} />
                        <input type="submit" value="Ok" />
                    </div>
                </form>
                <div className="avatars-wrapper">
                <h2 className='character-header'>Player 2 Character</h2>
                <div className="avatars-container">
                    {
                        avatarUrls.map((url, i) => {
                            return (

                                <label className='radio-label' key={`player1-avatar-${i + 10}`} htmlFor={`player1-avatar-${i}`}>
                                    <input 
                                    key={`player1-input-${i}`} 
                                    className='radio-btn' 
                                    type="radio" 
                                    name="player1-avatar" 
                                    id={`player1-avatar-${i}`} 
                                    onChange={() => this.props.updateObjState(player1,['avatarUrl'],[url])}
                                    value={url} />
                                    <img className='avatar-img' key={`player1-img-${i}`} src={url} alt="avatar" />
                                </label>

                            )
                        })
                    }
                </div>
                </div>
            </div>
        )
    }
}

export default Settings