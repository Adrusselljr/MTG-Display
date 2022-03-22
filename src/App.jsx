import React, { Component } from 'react'
import './App.css'
import Card from './components/Card'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from './images/logo.jpeg'
import cardKingdom from './images/cardKingdom.png'
import magicArena from './images/magicarena.jpeg'

let url = `https://api.magicthegathering.io/v1/cards?page=`


export class App extends Component {
    
    state = {
        pageNum: 1,
        cardsArray: []
    }
    
    displayCards = async() => {
        const fetchedData = await fetch(`${url}${this.state.pageNum}`)
        const parsedData = await fetchedData.json()

        this.setState({
            cardsArray: parsedData.cards
        })

        console.log(parsedData.cards)
        return parsedData
    }

    componentDidMount() {
        this.displayCards()
    }

    clickHandlerPageNext = () => {
        console.log("Next page ", this.state.pageNum)
        this.setState({
            pageNum: this.state.pageNum + 1
        }, () => {
            return this.displayCards()
        })
    }

    clickHandlerPagePrevious = () => {
        console.log("previous page ", this.state.pageNum)
        this.setState((prevState) => {
            return {
                pageNum: prevState.pageNum - 1
            }
        }, () => {
            return this.displayCards()
        })
    }

    render() {
        return (
        <div className='wrapper'>

            <div className='header'>
                <div className="imgHeader">
                    <img className='logo' src={ logo } alt="Logo" />
                </div>
                <div className="inputs">
                    <label>SEARCH 1</label>
                    <input className='search' type="text" name=""/>
                    <button className='searchBtn'>Submit</button>
                    <label> SEARCH 2</label>
                    <input className='search' type="text" name=""/>
                    <button className='searchBtn'>Submit</button>
                </div>
            </div>

            <div className="section">
                <div className="adLeft">
                <a href="https://www.cardkingdom.com/"><img className='kingdom' src={ cardKingdom } alt="Card Kingdom" /></a>
                </div>

                <div className="cards">
                    { this.state.cardsArray.map(elm => {
                        return <Card
                        key={ elm.id }
                        cardsArrayProps={ elm }
                        />
                    }) }
                </div>

                <div className="adRight">
                    <a href="https://magic.wizards.com/en/mtgarena?v=6jyHesgkkNFEWkYf9WYY5w"><img className='arena' src={ magicArena } alt="Magic The Gathering Arena" /></a>
                </div>
            </div>

            <br/>

            <div className="btns">
                {this.state.pageNum === 1
                ? ""
                : <button onClick={ this.clickHandlerPagePrevious } className='btn btn-primary'>Previous Page</button>
                }
                <button onClick={ this.clickHandlerPageNext } className='btn btn-primary'>Next Page</button>
            </div>

        </div>
        )
    }
}

export default App