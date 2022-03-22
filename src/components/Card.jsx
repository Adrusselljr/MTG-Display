import React from 'react'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function Card(props) {
    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src={props.cardsArrayProps.imageUrl} alt={props.cardsArrayProps.name} />
                </div>
                <div className="flip-card-back">
                    <h5 className='title'>{props.cardsArrayProps.name}</h5>
                    <p>{props.cardsArrayProps.originalText}</p>
                    <h6>Mana Cost: {props.cardsArrayProps.manaCost}</h6>
                    <h6 className='power'>Power: {props.cardsArrayProps.power} / {props.cardsArrayProps.toughness} :Toughness</h6>
                    <h6 className='type'>{props.cardsArrayProps.type}</h6>
                </div>
            </div>
        </div>
    )
}

export default Card