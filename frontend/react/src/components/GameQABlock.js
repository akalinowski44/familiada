import React from "react";
import {Col, Container, Row} from "react-bootstrap";

class GameQABlock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            teams: [
                {name: 'team1', score: 0, mistakes: 0},
                {name: 'team2', score: 0, mistakes: 0}
            ],
            roundScore: 0,
            answers: []
        }
    }

    componentDidMount() {
        window.addEventListener('storage', (e) => {
            let data = e.storageArea;
            this.setState({
                answers: JSON.parse(data['answers']),
                roundScore: data['roundScore'],
                teams: JSON.parse(data['teams'])
            })
        });

        document.getElementById("header").style.display = "none";

    }

    UnpackAnswers(answers) {
        let unpacked = [];
        for (let i = 0; i < answers.length; i++) {
            unpacked.push(<li key={i}>{answers[i]['content'].padEnd(20, '.')} {answers[i]['score']}</li>)
        }
        return unpacked;
    }


    showTeamStatus = (teamIndex) => {
        return (
            <table>
                <tbody>
                <tr>
                    <td>{this.state.teams[teamIndex]['name']}</td>
                </tr>
                <tr>
                    <td align="center">punkty: {this.state.teams[teamIndex]['score']}</td>
                </tr>
                <tr>
                    <td align="center">utraty: {this.state.teams[teamIndex]['mistakes']}</td>
                </tr>
                </tbody>
            </table>
        )
    };

    render() {
        return (


            <Container className="game clearfix">

                <Row className="justify-content-md-center">
                    <Col sm="auto">
                        <h3>Suma: {this.state.roundScore}</h3>
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col sm="auto">
                        {this.showTeamStatus(0)}
                    </Col>
                    <Col>
                        <div className="tablica">
                            <ol>
                                {this.UnpackAnswers(this.state.answers)}
                            </ol>
                        </div>
                    </Col>
                    <Col sm="auto">
                        {this.showTeamStatus(1)}
                    </Col>
                </Row>

            </Container>
        )
    }
}

export default GameQABlock
