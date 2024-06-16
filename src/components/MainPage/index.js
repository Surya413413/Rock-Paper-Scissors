import {Component} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {
  CustomDiv,
  Heading,
  WonContainer,
  SelectContainer,
  OptionContainer,
  ImageUrl,
  PlayAgainButton,
  Para,
  ParaOne,
} from './componentStyled'

import OptionCard from '../OptionCard'

import './index.css'

const gameConstantStauts = {
  win: 'WIN',
  lost: 'LOST',
  draw: 'DRAW',
  inPrgress: 'IN_PRGRESS',
}

class MainPage extends Component {
  state = {
    score: 0,
    status: gameConstantStauts.inPrgress,
    userGame: '',
    randomGame: '',
  }

  onClickUserView = id => {
    this.setState(
      {userGame: id, randomGame: this.getRandamGame()},
      this.getGame,
    )
  }

  getGame = () => {
    const {userGame, randomGame} = this.state

    if (userGame === randomGame) {
      this.setState({status: gameConstantStauts.draw})
    } else if (userGame === 'ROCK') {
      if (randomGame === 'SCISSORS') {
        this.setState(preivous => ({
          score: preivous.score + 1,
          status: gameConstantStauts.win,
        }))
      } else {
        this.setState(preivous => ({
          score: preivous.score - 1,
          status: gameConstantStauts.lost,
        }))
      }
    } else if (userGame === 'PAPER') {
      if (randomGame === 'ROCK') {
        this.setState(preivous => ({
          score: preivous.score + 1,
          status: gameConstantStauts.win,
        }))
      } else {
        this.setState(preivous => ({
          score: preivous.score - 1,
          status: gameConstantStauts.lost,
        }))
      }
    } else if (userGame === 'SCISSORS') {
      if (randomGame === 'PAPER') {
        this.setState(preivous => ({
          score: preivous.score + 1,
          status: gameConstantStauts.win,
        }))
      } else {
        this.setState(preivous => ({
          score: preivous.score - 1,
          status: gameConstantStauts.lost,
        }))
      }
    }
  }

  getRandamGame = () => {
    const {choicesList} = this.props
    const randomgameList = choicesList.map(each => each.id)
    const randomIndex = Math.floor(Math.random() * 3)
    return randomgameList[randomIndex]
  }

  renderOptionView = () => {
    const {choicesList} = this.props
    return (
      <div className="three-buttons-container">
        {choicesList.map(each => (
          <OptionCard
            optionItems={each}
            key={each.id}
            onClickUserView={this.onClickUserView}
          />
        ))}
      </div>
    )
  }

  onClickPlayAgain = () => {
    this.setState({status: gameConstantStauts.inPrgress})
  }

  renderGameWonView = () => {
    const {userGame, randomGame} = this.state
    const {choicesList} = this.props
    const userChoiceList = choicesList.filter(each => each.id === userGame)
    const userIndex = userChoiceList[0]
    const randomChoiceList = choicesList.filter(each => each.id === randomGame)
    const randomIndex = randomChoiceList[0]
    return (
      <WonContainer>
        <SelectContainer>
          <OptionContainer>
            <Para>you</Para>
            <ImageUrl src={userIndex.imageUrl} alt="your choice" />
          </OptionContainer>
          <OptionContainer>
            <Para>other</Para>
            <ImageUrl src={randomIndex.imageUrl} alt="opponent choice" />
          </OptionContainer>
        </SelectContainer>
        <Para>YOU WON</Para>
        <PlayAgainButton type="button" onClick={this.onClickPlayAgain}>
          PLAY AGAIN
        </PlayAgainButton>
      </WonContainer>
    )
  }

  renderGameLostView = () => {
    const {userGame, randomGame} = this.state
    const {choicesList} = this.props
    const userChoiceList = choicesList.filter(each => each.id === userGame)
    const userIndex = userChoiceList[0]
    const randomChoiceList = choicesList.filter(each => each.id === randomGame)
    const randomIndex = randomChoiceList[0]
    return (
      <WonContainer>
        <SelectContainer>
          <OptionContainer>
            <Para>you</Para>
            <ImageUrl src={userIndex.imageUrl} alt="your choice" />
          </OptionContainer>
          <OptionContainer>
            <Para>other</Para>
            <ImageUrl src={randomIndex.imageUrl} alt="opponent choice" />
          </OptionContainer>
        </SelectContainer>
        <Para>YOU LOSE</Para>
        <PlayAgainButton type="button" onClick={this.onClickPlayAgain}>
          PLAY AGAIN
        </PlayAgainButton>
      </WonContainer>
    )
  }

  renderGameDrawView = () => {
    const {userGame, randomGame} = this.state
    const {choicesList} = this.props
    const userChoiceList = choicesList.filter(each => each.id === userGame)
    const userIndex = userChoiceList[0]
    const randomChoiceList = choicesList.filter(each => each.id === randomGame)
    const randomIndex = randomChoiceList[0]
    return (
      <WonContainer>
        <SelectContainer>
          <OptionContainer>
            <Para>you</Para>
            <ImageUrl src={userIndex.imageUrl} alt="your choice" />
          </OptionContainer>
          <OptionContainer>
            <Para>other</Para>
            <ImageUrl src={randomIndex.imageUrl} alt="opponent choice" />
          </OptionContainer>
        </SelectContainer>
        <Para>IT IS DRAW</Para>
        <PlayAgainButton type="button" onClick={this.onClickPlayAgain}>
          PLAY AGAIN
        </PlayAgainButton>
      </WonContainer>
    )
  }

  renderResult = () => {
    const {status} = this.state
    switch (status) {
      case gameConstantStauts.inPrgress:
        return this.renderOptionView()
      case gameConstantStauts.win:
        return this.renderGameWonView()
      case gameConstantStauts.lost:
        return this.renderGameLostView()
      case gameConstantStauts.draw:
        return this.renderGameDrawView()
      default:
        return null
    }
  }

  render() {
    const {score} = this.state

    return (
      <>
        <CustomDiv>
          <div className="counting-container">
            <div>
              <Heading>
                Rock
                <br />
                Paper
                <br />
                Scissors
              </Heading>
            </div>
            <div className="score-card-container">
              <p className="score-heading">Score</p>
              <ParaOne className="score-para">{score}</ParaOne>
            </div>
          </div>
          <div>{this.renderResult()}</div>
          <Popup
            modal
            trigger={
              <button type="button" className="button-rules">
                Rules
              </button>
            }
          >
            {close => (
              <>
                <div>
                  {' '}
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                    alt="rules"
                    className="rules-image"
                  />
                </div>
                <button type="button" onClick={() => close()}>
                  close
                </button>
              </>
            )}
          </Popup>
        </CustomDiv>
      </>
    )
  }
}
export default MainPage
