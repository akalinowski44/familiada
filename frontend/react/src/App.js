import React from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import ListOfQuestions from './components/ListOfQuestions'
import QuestionById from './components/QuestionById'
import QuestionForm from './components/QuestionForm'
import Game from './components/Game'
import GameQABlock from './components/GameQABlock'
import {Nav, Navbar} from "react-bootstrap";

function App() {

    let p = {
        q_id: 0
    };

    return (
        <Router>
                <NavigationBar/>
                <Route path="/game" component={Game}/>
                <Route path="/gameView" component={GameQABlock}/>

                <Route path="/questions" component={ListOfQuestions}/>
                <Route path="/questionForm" component={QuestionForm}/>
                <Route path="/question/random" render={() => <QuestionById {...p}/>}/>
        </Router>
    );
}


function NavigationBar() {
    return (
        <Navbar bg="dark" variant="dark" id="header" sticky="top">
            <Navbar.Brand href="/game">Familiada</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/questions">Lista pytań</Nav.Link>
                <Nav.Link href="/questionForm">Dodaj pytanie</Nav.Link>
            </Nav>
        </Navbar>
    );
}


export default App;