import React from "react";
import QABlock from './QABlock'

class ListOfQuestions extends React.Component {
    state = {
        endpoint: 'http://127.0.0.1:8000/api/questions',
        questions: []
    };

    componentDidMount() {
        fetch(this.state.endpoint)
            .then(data => data.json())
            .then(data => this.setState({questions: data}))
    }

    GenerateListOfQuestions() {
        let numberOfQuestions = this.state.questions.length;
        let questions = [];

        for (let i = 0; i < numberOfQuestions; i++) {
            let one = this.state.questions[i];
            questions.push(
                <QABlock key={i} question={one}/>
            );
        }

        return questions;
    }

    render() {

        return (
            <div className="container">
                {this.GenerateListOfQuestions()}
            </div>
        );

    }
}

export default ListOfQuestions