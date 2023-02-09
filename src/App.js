import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import PlayingCard from "./PlayingCard";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      winner: '',
      p1Score: 0,
      p2Score: 0,
      Ties:0,
      roundsPlayed: 0,
      resetButton: false,
      dealButton: true,
      p1CardName: '',
      p1CardSuit:'',
      p2CardName:'',
      p2CardSuit:''
    };
  }
  
  dealCards = () => {
    let drawnCards = this.state.cardDeck.slice(-2);
    let currentP1Score = this.state.p1Score;
    let currentP2Score = this.state.p2Score; 
    let currentTies = this.state.Ties;
    let currentRoundsPlayed = this.state.roundsPlayed +1;
    console.log(currentRoundsPlayed);
    let currentP1CardName = drawnCards[0].name;
    let currentP1CardSuit = drawnCards[0].suit;
    let currentP2CardName = drawnCards[1].name;
    let currentP2CardSuit = drawnCards[1].suit;
    let roundWinner = '';
    if (currentRoundsPlayed === 26){
      this.toggleButton();
      console.log(this.state.resetButton);
    }
    if(drawnCards[0].rank > drawnCards[1].rank){
      roundWinner = `This round's winner is Player 1!`;
      currentP1Score ++;
    } else if (drawnCards[0].rank < drawnCards[1].rank){
      roundWinner = `This round's winner is Player 2!`;
      currentP2Score ++;
    } else{
      roundWinner = "No one won this round, it's a draw!"
      currentTies++;
    }

    this.setState((state) => ({
      // Remove last 2 cards from cardDeck
      cardDeck: state.cardDeck.slice(0, -2),
      // Deal last 2 cards to currCards
      currCards: state.cardDeck.slice(-2),
      winner: roundWinner,
      p1Score: currentP1Score,
      p2Score: currentP2Score,
      Ties: currentTies,
      roundsPlayed: currentRoundsPlayed,
      p1CardName: currentP1CardName,
      p2CardName: currentP2CardName,
      p1CardSuit: currentP1CardSuit,
      p2CardSuit: currentP2CardSuit
    }));
  };

  resetGame = () => {
    this.setState((state) => ({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      winner: '',
      p1Score: 0,
      p2Score: 0,
      Ties:0,
      roundsPlayed: 0,
      resetButton: false,
      dealButton: true,
      p1CardName: '',
      p1CardSuit:'',
      p2CardName:'',
      p2CardSuit:''
    }));
  }

  toggleButton = () => {
    console.log('go');
    let resetButtonStatus = this.state.resetButton;
    let dealButtonStatus = this.state.dealButton;
    this.setState((state) => ({
      resetButton: !resetButtonStatus,
      dealButton: !dealButtonStatus,
    }));
  }
  
  render() {
    let roundWinner = this.state.winner;
    let p1Score = this.state.p1Score;
    let p2Score = this.state.p2Score;
    let ties = this.state.Ties;
    let resetButton = this.state.resetButton;
    let dealButton = this.state.dealButton;
    let p1CardName = this.state.p1CardName;
    let p2CardName = this.state.p2CardName;
    let p1CardSuit = this.state.p1CardSuit;
    let p2CardSuit = this.state.p2CardSuit;
    console.log(p1CardName);
    console.log(p2CardSuit);

    return (
      <div className="App">
        <header className="App-header">
          <h3>🚀 High Card 🚀</h3>
          <div className = 'flex-container'>
            <PlayingCard playerNum = '1' name= {p1CardName} suit={p1CardSuit} />
            <PlayingCard playerNum = '2' name={p2CardName} suit={p2CardSuit} />
          </div>   
          <p>{roundWinner}</p>
          <p>Player 1 Wins: {p1Score}<br/>Player 2 Wins: {p2Score}<br/>Ties: {ties}</p>
          {dealButton ? <button className = "Deal-Button-style" onClick={this.dealCards} >Deal Cards</button> : null}
          {resetButton ? <button className = "Reset-Button-style" onClick={this.resetGame}> Reset Game</button> : null}
        </header>
      </div>
    );
  }
}

export default App;