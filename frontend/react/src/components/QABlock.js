import React from "react";

class QABlock extends React.Component {

    UnpackAnswers(answers) {
        let unpacked = [];
        for (let i = 0; i < answers.length; i++) {
            unpacked.push(<li key={i}>{answers[i]['content']} | score: {answers[i]['score']}</li>)
        }
        return unpacked
    }

    render() {
        return (
            <div className="question">
                <h2>Question: {this.props.question['content']}</h2>
                <ol>
                    <h3>Answers:</h3>
                    {this.UnpackAnswers(this.props.question['answers'])}
                </ol>
            </div>
        )
    }
}

export default QABlock
