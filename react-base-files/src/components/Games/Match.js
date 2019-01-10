import React from 'react';

class Match extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            direction: '',
            flip: false,
            playersTurn: false,
            cursor: [],
            board: [],
            cardSelected: false,
            cardValue: ''
        };
    }

    componentDidMount() {
        this.props.socket.on('turn', (data) => {
            // if next in state is the clients username
            if (data.next[0] === this.props.userState.username) {
                this.setState({
                    playersTurn: true,
                    cursor: data.cursor,
                    board: data.board
                });
            } else {
                this.setState({ playersTurn: false });
            }
            console.log(data);
        });

        this.props.socket.on('flip', (data) => {
            console.log('flip');
            this.interval = setInterval(() => this.flipCard(), 5000);
            this.setState({
                flip: true,
                playersTurn: false
            });
        });

        this.props.socket.on('cursor', (data) => {
            console.log(data);
            this.setState({ cursor: data });
        });

        this.props.socket.on('timeout', (data) => {
            console.log('timeout');
        });
    }

    submitDirection = (direction) => {       
        this.setState({ direction: direction }, () => {
            this.props.socket.emit(`${this.state.direction}`);   
        });      
    }

    selectCard = () => {
        this.setState({
            cardValue: this.state.board[this.state.cursor[0]][this.state.cursor[1]],
            cardSelected: true
        });
        this.props.socket.emit('select');
    }

    flipCard = () => {       
        this.setState({ flip: false }, () => {
            clearInterval(this.interval);
            this.interval = setInterval(() => this.hideBox(), 1000);     
        });
    }

    hideBox = () => {
        clearInterval(this.interval);
        this.setState({ cardSelected: false });
    }
    
    render() {
        return (
            <div className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className="columns is-centered">
                            <div className="column is-4">
                                <div className={this.state.cardSelected === true ? "box" : "box is-hidden" }>
                                    <div className={this.state.flip === true ? "flip-container flip" : "flip-container"}>
                                        <div className="flipper">
                                            <div className="front">
                                                <img src={"/images/cards/card_back.png"} alt="Card Back" />
                                            </div>
                                            <div className="back">
                                                <img
                                                    src={`/images/cards/card_${this.state.cardValue}.png`}
                                                    alt={`Card ${this.state.cardValue}`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={this.state.cardSelected === false ? "box" : "box is-hidden" }>
                                    <h2 className="title is-2">Select A Card</h2>
                                </div> 
                                <div className="box">
                                    <div className="field is-grouped is-grouped-centered">
                                        <div className="control">
                                            <button className="button is-large noButton" disabled></button>
                                        </div>
                                        <div className="control">
                                            <button
                                                className="button is-info is-large"
                                                disabled={this.state.playersTurn === false}
                                                onClick={() => this.submitDirection("up")}
                                            >
                                                <img src="/images/up_chevron.png" alt="UP" />
                                            </button>
                                        </div>
                                        <div className="control">
                                            <button className="button is-large noButton" disabled></button>
                                        </div>
                                    </div>
                                    <div className="field is-grouped is-grouped-centered">
                                        <div className="control">
                                            <button
                                                className="button is-info is-large"
                                                disabled={this.state.playersTurn === false}
                                                onClick={() => this.submitDirection("left")}
                                            >
                                                <img src="/images/left_chevron.png" alt="LEFT" />
                                            </button>
                                        </div>
                                        <div className="control">
                                            <button
                                                className="button is-info is-large"
                                                disabled={this.state.playersTurn === false}
                                                onClick={this.selectCard}
                                            >
                                                <img src="/images/dot_and_circle.png" alt="SUBMIT" />
                                            </button>
                                        </div>
                                        <div className="control">
                                            <button
                                                className="button is-info is-large"
                                                disabled={this.state.playersTurn === false}
                                                onClick={() => this.submitDirection("right")}
                                            >
                                                <img src="/images/right_chevron.png" alt="RIGHT" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="field is-grouped is-grouped-centered">
                                        <div className="control">
                                            <button className="button is-large noButton" disabled></button>
                                        </div>
                                        <div className="control">
                                            <button 
                                                className="button is-info is-large"
                                                disabled={this.state.playersTurn === false}
                                                onClick={() => this.submitDirection("down")}
                                            >
                                                <img src="/images/down_chevron.png" alt="DOWN" />
                                            </button>
                                        </div>
                                        <div className="control">
                                            <button className="button is-large noButton" disabled></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>  
            </div>
        );
    }
}

export default Match;