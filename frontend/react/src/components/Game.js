import React from "react";
import QABlock from './QABlock'
import getQuestionById from './functions'

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
                        content: '----------',
                        score: '--'
                    });
                }
                this.setState({
                    gameAnswers: gameAns,
                    remainingAnswers: numberOfAnswers
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

    givePointsToRoundWinner = async () => {
        let teams = this.state.teams;
        teams[this.state.activeTeam]['score'] += this.state.roundScore;
        for (let i = 0; i < 2; i++) {
            teams[i]['mistakes'] = 0;
        }
        await this.setState({
            teams: teams,
            roundScore: 0,
        });
        this.populateStorage();

    };

    addMistake = async () => {
        let teams = this.state.teams;
        teams[this.state.activeTeam]['mistakes'] += 1;
        await this.setState({teams: teams});
        this.populateStorage()
    };

    resetMistakes = () => {
        let teams = this.state.teams;
        for (let i = 0; i < 2; i++) {
            teams[i]['mistakes'] = 0;
        }
        this.setState({teams: teams});
    };


    showAnswer = async (index) => {
        index -= 1;
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
            <div className="container">
                <button onClick={this.randomQuestion}>Random Question</button>

                <form onSubmit={this.handleShowAnswer}>
                    <input type="number" name="ansIndex" id="ansIndex"/>
                    <input type="submit" value="Show answer"/>
                </form>

                <button onClick={this.switchActiveTeam}>Switch Active Team</button>
                <button onClick={this.givePointsToRoundWinner}>Give Round Points to active Team</button>

                <button onClick={this.addMistake}>Add Mistake</button>
                <button onClick={this.resetMistakes}>Reset Mistakes</button>

                <h2>Active team: {this.state.teams[this.state.activeTeam]['name']}</h2>
                <h3>Remaining answers: {this.state.remainingAnswers}</h3>
                <QABlock question={this.state.question}/>

                <button onClick={this.openGameWindow}>Open Game window</button>

            </div>

        )
    }
}

export default Game
