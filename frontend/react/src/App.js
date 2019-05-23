import React from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import ListOfQuestions from './components/ListOfQuestions'
import QuestionById from './components/QuestionById'
import QuestionForm from './components/QuestionForm'
import Game from './components/Game'

function App() {

    let p = {
        q_id: 0
    };

    return (
        <Router>
            <div>
                <Header/>
                <Route exact path="/" component={Home}/>
                <Route path="/game" component={Game}/>
                <Route path="/questions" component={ListOfQuestions}/>
                <Route path="/questionForm" component={QuestionForm}/>
                <Route path="/question/random" render={() => <QuestionById {...p}/>}/>
            </div>
        </Router>
    );
}


function Header() {
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/game">Start Game</Link>
            </li>
            <li>
                <Link to="/questions">Questions</Link>
            </li>
            <li>
                <Link to="/questionForm">Question Form</Link>
            </li>
            <li>
                <Link to="/question/random">Random Question</Link>
            </li>
        </ul>
    );
}

function Home() {
    return <h2>Home</h2>;
}


export default App;