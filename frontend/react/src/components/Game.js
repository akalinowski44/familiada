import React from "react";
import QABlock from './QABlock'
import getQuestionById from './functions'
import {Button, Col, Container, Dropdown, DropdownButton, Row} from "react-bootstrap";

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            teams: [
                {name: 'team1', score: 0, mistakes: 0},
                {name: 'team2', score: 0, mistakes: 0}
            ],
            roundScore: 0,
            question: {'content': '', 'answers': []},
            gameAnswers: [],
            multiplier: 1,
            questionsId: [21, 24, 19, 20, 23, 22, 17, 18, 25, 26]
        };

    }

    nextQuestion = () => {
        localStorage.clear();
        let questionsId = this.state.questionsId;
        let questionId = 0;

        if (questionsId.length > 0) {
            questionId = questionsId.pop();
        }

        getQuestionById(questionId)
            .then(data => this.setState({question: data}))
            .then(() => {
                let ans = this.state.question['answers'];
                let gameAns = [];
                let numberOfAnswers = ans.length;
                for (let i = 0; i < numberOfAnswers; i++) {
                    gameAns.push({
                        content: '.........................',
                        score: '--'
                    });
                }
                this.setState({
                    gameAnswers: gameAns,
                    roundScore: 0,
                })
            })
            .then(() => this.populateStorage());
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

        let audio = document.getElementById("winRound");
        audio.play();

        this.populateStorage();

    };

    addMistake = async (teamNumber) => {
        let teams = this.state.teams;
        teams[teamNumber]['mistakes'] += 1;
        await this.setState({teams: teams});
        this.populateStorage();
        let audio = document.getElementById("badAnswer");
        audio.play();
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
        roundScore += points * this.state.multiplier;

        let gameAnswers = this.state.gameAnswers;

        if (gameAnswers[index]['score'] === '--') {
            gameAnswers[index] = answer;
            await this.setState({
                gameAnswers: gameAnswers,
                roundScore: roundScore,
            });

            let audio = document.getElementById("goodAnswer");
            audio.play();

            this.populateStorage();

        }


    };

    populateStorage = () => {
        localStorage.setItem('answers', JSON.stringify(this.state.gameAnswers));
        localStorage.setItem('roundScore', this.state.roundScore);
        localStorage.setItem('teams', JSON.stringify(this.state.teams));
    };

    openGameWindow = () => {
        window.open('http://localhost:3000/gameView', 'gameView', '');

    };


    handleMultiplier = (multi) => {
        this.setState({multiplier: multi});
    };


    playIntroSound = () => {
        let audio = document.getElementById("welcomeSong");
        audio.play();
    };

    render() {
        return (

            <Container className="qablock">

                <Row>
                    <Col>
                        <DropdownButton id="dropdown-basic-button" title="Set multiplier" size="sm" variant="warning">

                            <Dropdown.Item action onClick={() => this.handleMultiplier(1)}>x1</Dropdown.Item>
                            <Dropdown.Item action onClick={() => this.handleMultiplier(2)}>x2</Dropdown.Item>
                            <Dropdown.Item action onClick={() => this.handleMultiplier(3)}>x3</Dropdown.Item>

                        </DropdownButton>

                        <p>Current multiplier: x{this.state.multiplier}</p>
                    </Col>

                    <Col>

                        <Button className="options" size="sm" variant="primary" onClick={this.nextQuestion}>Next
                            Question</Button>


                    </Col>

                    <Col>
                        <Button className="options" size="sm" variant="outline-success" onClick={this.playIntroSound}>Play
                            intro song</Button>
                        <Button className="options" size="sm" variant="outline-primary" onClick={this.openGameWindow}>Open
                            game window</Button>
                    </Col>
                </Row>


                <Row>

                    <Col>
                        <h3>{this.state.teams[0].name}</h3>
                        <Button className="options" size="sm" variant="danger" onClick={() => this.addMistake(0)}>Add
                            Mistake</Button>
                        <Button className="options" size="sm" variant="outline-danger"
                                onClick={() => this.resetMistakes(0)}>Reset Mistakes</Button>
                        <Button className="options" size="sm" variant="success"
                                onClick={() => this.givePointsToRoundWinner(0)}>Give this round points</Button>
                    </Col>


                    <Col>


                        <QABlock className="randblock" question={this.state.question} action={this.showAnswer}/>


                    </Col>


                    <Col>
                        <h3>{this.state.teams[1].name}</h3>
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
