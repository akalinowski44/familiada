import React from "react";
import QABlock from './QABlock'

class QuestionById extends React.Component {

    state = {
        endpoint: 'http://127.0.0.1:8000/api/question/' + this.props.q_id,
        question: {'content': '', 'answers': []}
    };

    componentDidMount() {
        fetch(this.state.endpoint)
            .then(data => data.json())
            .then(data => this.setState({question: data}))
    }

    render() {
        return (<QABlock question={this.state.question}/>);
    }
}

export default QuestionById
