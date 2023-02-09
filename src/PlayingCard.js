import React from "react";
import "./PlayingCard.css";
require.context('./card-images', false, /\.(png|jpe?g|svg)$/);

function importAll(r) {
 let images = {};
  r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
 return images
}
const images = importAll(require.context('./card-images', false, /\.(png|jpe?g|svg)$/));


export default class PlayingCard extends React.Component {
  constructor(props) {
    super(props);
    
    this.props=({
      name:(props),
      suit:(props),
      playerNum: (props),
    })
  
  }

  render(){
    let cardName = this.props.name.toLowerCase();
    let cardSuit = this.props.suit.toLowerCase();
    let combinedName = `${cardName}_of_${cardSuit}.png`;
    let playerNum = this.props.playerNum;
    let output = '';
    if(cardName != ''){
      output = `Player ${playerNum}`;
    }
    console.log(combinedName);
    return(
      <div>
        <p>{output}</p>
        <img className = 'playing-card' src = {images[combinedName]} alt = ""/>
      </div>
    )
  }
}