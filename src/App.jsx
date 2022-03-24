import React, { Component } from 'react'
import './App.css'
import Card from './components/Card'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from './images/logo.jpeg'
import cardKingdom from './images/cardKingdom.png'
import magicArena from './images/magicarena.jpeg'

let url = `https://api.magicthegathering.io/v1/cards`


export class App extends Component {
    
    state = {
        pageNum: 1,
        cardsArray: [],
        filterType: "All",
        filterColor: "All",
        errorMessage: ""
    }
    
    displayCards = async() => {
        const fetchedData = await fetch(`${url}?page=${this.state.pageNum}`)
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
        this.setState({
            filterColor: "All",
            filterType: "All",
            pageNum: this.state.pageNum + 1
        }, () => {
            return this.displayCards()
        })
        window.scrollTo(0, 0)
    }

    clickHandlerPagePrevious = () => {
        this.setState(prevState => {
            return {
                filterColor: "All",
                filterType: "All",
                pageNum: prevState.pageNum - 1
            }
        }, () => {
            return this.displayCards()
        })
        window.scrollTo(0, 0)
    }

    changeSearchType = e => {
        this.setState({
            filterType: e.target.value
        })
    }

    changeSearchColor = e => {
        this.setState({
            filterColor: e.target.value
        })
    }

    clickFilterType = () => {
        let newCardsArray = []
        this.state.cardsArray.forEach(card => {
            if(card.types.includes(this.state.filterType)) {
                newCardsArray.push(card)
            }
            if(this.state.filterType === "All") {
                this.displayCards()
            }
        })
        this.setState({
            cardsArray: newCardsArray
        }, () => {
            if(this.state.cardsArray.length === 0) {
                this.setState({
                    errorMessage: "Cannot proccess your request at this time!"
                })
                setTimeout(() => {
                    this.setState({
                        errorMessage: "",
                        filterType: "All"
                    })
                    this.displayCards()
                }, 1500)
            }
        })
    }

    clickFilterColor = () => {
        let newCardsArray = []
        this.state.cardsArray.forEach(card => {
            if(card.colors.includes(this.state.filterColor)) {
                newCardsArray.push(card)
            }
            if(this.state.filterColor === "All") {
                this.displayCards()
            }
            if(newCardsArray.length === 0) {
                this.setState({
                    errorMessage: "Cannot proccess your request at this time!"
                })
            }
        })
        this.setState({
            cardsArray: newCardsArray
        }, () => {
            if(this.state.cardsArray.length === 0) {
                this.setState({
                    errorMessage: "Cannot proccess your request at this time!"
                })
                setTimeout(() => {
                    this.setState({
                        errorMessage: "",
                        filterType: "All"
                    })
                    this.displayCards()
                }, 1500)
            }
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
                    <label>Filter by Type:</label>
                        <select onChange={ this.changeSearchType } id='types' value={ this.state.filterType }>
                            <option value="All">All</option>
                            <option value="Artifact">Artifact</option>
                            <option value="Conspiracy">Conspiracy</option>
                            <option value="Creature">Creature</option>
                            <option value="Dragon">Dragon</option>
                            <option value="Elemental">Elemental</option>
                            <option value="Enchantment">Enchantment</option>
                            <option value="Goblin">Goblin</option>
                            <option value="Hero">Hero</option>
                            <option value="instant">instant</option>
                            <option value="Instant">Instant</option>
                            <option value="Jaguar">Jaguar</option>
                            <option value="Knights">Knights</option>
                            <option value="Land">Land</option>
                            <option value="Phenomenon">Phenomenon</option>
                            <option value="Plane">Plane</option>
                            <option value="Planeswalker">Planeswalker</option>
                            <option value="Scheme">Scheme</option>
                            <option value="Sorcery">Sorcery</option>
                            <option value="Specter">Specter</option>
                            <option value="Summon">Summon</option>
                            <option value="Tribal">Tribal</option>
                            <option value="Vanguard">Vanguard</option>
                            <option value="Wolf">Wolf</option>
                            <option value="You'll">You'll</option>
                        </select>
                    <button onClick={ this.clickFilterType } className='btn btn-primary'>Submit</button>

                    <label>Filter by Color:</label>
                        <select onChange={ this.changeSearchColor } id='colors' value={ this.state.filterColor }>
                            <option value="All">All</option>
                            <option value="White">White</option>
                            <option value="Black">Black</option>
                            <option value="Blue">Blue</option>
                            <option value="Green">Green</option>
                            <option value="Red">Red</option>
                        </select>
                    <button onClick={ this.clickFilterColor } className='btn btn-primary'>Submit</button>
                </div>
            </div>

            <div className="section">
                <div className="adLeft">
                <a href="https://www.cardkingdom.com/"><img className='kingdom' src={ cardKingdom } alt="Card Kingdom" /></a>
                </div>

                <div className="cards">
                    <div className='errorParent'>
                        <p className='error'>{this.state.errorMessage}</p>
                    </div>

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

            <div className="pageBtns">
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