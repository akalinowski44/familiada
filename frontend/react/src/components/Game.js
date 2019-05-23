import React from "react";
import QuestionById from "./QuestionById";

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            team1: {
                score: 0,
                mistakes: 0
            },
            team2: {
                score: 0,
                mistakes: 0
            },
            roundscore: 0,
            question: {'content': '', 'answers': []}
        };
    }

    render() {
        return (
            <div className="Game">
                <QuestionById q_id={0} />
            </div>
        )
    }
}

export default Game
