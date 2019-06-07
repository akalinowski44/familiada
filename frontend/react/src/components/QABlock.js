import React from "react";
import {Card, ListGroup} from "react-bootstrap";

class QABlock extends React.Component {

    UnpackAnswers(answers) {
        let unpacked = [];
        for (let i = 0; i < answers.length; i++) {
            let id = 'ans' + i;
            unpacked.push(
                <ListGroup.Item key={id} action onClick={() => this.props.action(i)}>
                    {i + 1}. {answers[i]['content']} | score: {answers[i]['score']}
                </ListGroup.Item>)
        }
        return unpacked
    }

    render() {
        return (
            <Card className='qablock' style={{width: '18rem'}}>
                <Card.Header>{this.props.question['content']}</Card.Header>
                <ListGroup variant="flush">
                    {this.UnpackAnswers(this.props.question['answers'])}
                </ListGroup>
            </Card>
        )
    }
}

export default QABlock
