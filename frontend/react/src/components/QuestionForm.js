import React from "react";

class QuestionForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answers: [{content: '', score: ''}]
        };
    }

    handleChange = (e) => {
        if (['content', 'score'].includes(e.target.className)) {
            let answers = [...this.state.answers];
            answers[e.target.dataset.id][e.target.className] = e.target.value;
            this.setState({answers})
        } else {
            this.setState({[e.target.name]: e.target.value})
        }
    };

    addAnswer = (e) => {
        this.setState((prevState) => ({
            answers: [...prevState.answers, {content: '', score: ''}]
        }));
        e.preventDefault();
    };

    handleSubmit = (e) => {
        let data = {
            content: this.state.question,
            answers: this.state.answers
        };

        fetch('http://127.0.0.1:8000/api/questions/', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => console.log('Success:', JSON.stringify(response))) // JSON-string from `response.json()` call
            .catch(error => console.error('Error:', error));
        e.preventDefault()
    };



    render() {
        let {answers} = this.state;
        return (
            <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <label htmlFor="question">Question</label>
                <input type="text" name="question" id="question"/>
                <button onClick={this.addAnswer}>Add a new answer</button>

                {
                    answers.map((val, idx) => {
                        let ansId = `ans-${idx}`, scoreId = `score-${idx}`;
                        return (
                            <div key={idx}>
                                <label htmlFor={ansId}> {`Answer #${idx + 1}`}</label>
                                <input type="text" name={ansId} data-id={idx} id={ansId} className="content"/>
                                <label htmlFor={scoreId}>Score</label>
                                <input type="number" name={scoreId} data-id={idx} id={scoreId} className="score"/>
                            </div>
                        )
                    })
                }

                <input type="submit" value="Submit"/>
            </form>

        );
    }
}

export default QuestionForm
