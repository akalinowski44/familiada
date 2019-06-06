import React from "react";
import QABlock from './QABlock'
import getQuestionById from './functions'
import {Button, Col, Container, Row} from "react-bootstrap";

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            teams: [
                {name: 'team1', score: 0, mistakes: 0},
                {name: 'team2', score: 0, mistakes: 0}
            ],
            roundScore: 0,
            activeTeam: 0,
            question: {'content': '', 'answers': []},
            gameAnswers: [],
            remainingAnswers: 0
        };

    }

    randomQuestion = () => {
        localStorage.clear();
        getQuestionById(0)
            .then(data => this.setState({question: data}))
            .then(() => {
                let ans = this.state.question['answers'];
                let gameAns = [];
                let numberOfAnswers = ans.length;
                for (let i = 0; i < numberOfAnswers; i++) {
                    gameAns.push({
                        content: '#########################',
                        score: '--'
                    });
                }
                this.setState({
                    gameAnswers: gameAns,
                    remainingAnswers: numberOfAnswers,
                    roundScore: 0,
                })
            })
            .then(() => this.populateStorage());
    };


    switchActiveTeam = () => {
        if (this.state.activeTeam === 0) {
            this.setState({activeTeam: 1})
        } else {
            this.setState({activeTeam: 0})
        }
    };

    givePointsToRoundWinner = async (teamNumber) => {
        let teams = this.state.teams;
        teams[teamNumber]['score'] += this.state.roundScore;
        for (let i = 0; i < 2; i++) {
            teams[i]['mistakes'] = 0;
        }
        await this.setState({
            teams: teams,
            roundScore: 0,
        });
        this.populateStorage();

    };

    addMistake = async (teamNumber) => {
        let teams = this.state.teams;
        teams[teamNumber]['mistakes'] += 1;
        await this.setState({teams: teams});
        this.populateStorage()
    };

    resetMistakes = async (teamNumber) => {
        let teams = this.state.teams;
        teams[teamNumber]['mistakes'] = 0;
        await this.setState({teams: teams});
        this.populateStorage();
    };


    showAnswer = async (index) => {
        let answer = this.state.question['answers'][index];
        let points = answer['score'];

        let roundScore = this.state.roundScore;
        roundScore += points;

        let gameAnswers = this.state.gameAnswers;

        if (gameAnswers[index]['score'] === '--') {
            gameAnswers[index] = answer;
            var remainingAnswers = this.state.remainingAnswers - 1;
            await this.setState({
                gameAnswers: gameAnswers,
                roundScore: roundScore,
                remainingAnswers: remainingAnswers
            });

            this.populateStorage();

        }

    };

    populateStorage = () => {
        localStorage.setItem('answers', JSON.stringify(this.state.gameAnswers));
        localStorage.setItem('roundScore', this.state.roundScore);
        localStorage.setItem('teams', JSON.stringify(this.state.teams));
    };


    handleShowAnswer = (e) => {
        let index = e.target.elements.ansIndex.value;
        if (index > 0 && index <= this.state.gameAnswers.length) {
            this.showAnswer(index);
        }
        e.target.elements.ansIndex.value = '';
        e.preventDefault();
    };

    openGameWindow = () => {
        window.open('http://localhost:3000/gameView', 'gameView', '');
    };

    render() {
        return (

            <Container className="qablock">

                <Row>
                    <Col>
                        <h3>{ this.state.teams[0].name }</h3>
                        <Button className="options" size="sm" variant="danger" onClick={() => this.addMistake(0)}>Add
                            Mistake</Button>
                        <Button className="options" size="sm" variant="outline-danger"
                                onClick={() => this.resetMistakes(0)}>Reset Mistakes</Button>
                        <Button className="options" size="sm" variant="success"
                                onClick={() => this.givePointsToRoundWinner(0)}>Give this round points</Button>
                    </Col>
                    <Col>
                        <Button className="options" size="sm" variant="primary" onClick={this.randomQuestion}>Random
                            Question</Button>

                        <QABlock question={this.state.question} action={this.showAnswer}/>

                        <form onSubmit={this.handleShowAnswer}>
                            <input type="number" name="ansIndex" id="ansIndex"/>
                            <Button className="options" size="sm" variant="outline-primary" type="submit">Show this
                                answer</Button>
                        </form>
                        <Button className="options" size="lg" variant="outline-primary" onClick={this.openGameWindow}>Open Game window</Button>
                    </Col>
                    <Col>
                        <h3>{ this.state.teams[1].name }</h3>
                        <Button className="options" size="sm" variant="danger" onClick={() => this.addMistake(1)}>Add
                            Mistake</Button>
                        <Button className="options" size="sm" variant="outline-danger"
                                onClick={() => this.resetMistakes(1)}>Reset Mistakes</Button>
                        <Button className="options" size="sm" variant="success"
                                onClick={() => this.givePointsToRoundWinner(1)}>Give this round points</Button>
                    </Col>
                </Row>

            </Container>

        )
    }
}

export default Game
