import React from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import ListOfQuestions from './components/ListOfQuestions'
import QuestionById from './components/QuestionById'
import QuestionForm from './components/QuestionForm'
import Game from './components/Game'
import GameQABlock from './components/GameQABlock'

function App() {

    let p = {
        q_id: 0
    };

    return (
        <Router>
            <div>

                <Header/>
                <Route path="/game" component={Game}/>
                <Route path="/gameView" component={GameQABlock}/>

                <Route path="/questions" component={ListOfQuestions}/>
                <Route path="/questionForm" component={QuestionForm}/>
                <Route path="/question/random" render={() => <QuestionById {...p}/>}/>
                <Scripts/>
            </div>
        </Router>
    );
}


function Header() {
    return (

        <ul>
            <li>
                <Link to="/game">Start Game</Link>
            </li>
            <li>
                <Link to="/questions">Questions</Link>
            </li>
            <li>
                <Link to="/questionForm">Question Form</Link>
            </li>
        </ul>
    );
}

function Scripts() {
    return (
      <div>
          <script src="https://unpkg.com/react/umd/react.production.js" crossOrigin/>

          <script
              src="https://unpkg.com/react-dom/umd/react-dom.production.js"
              crossOrigin
          />

          <script
              src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
              crossOrigin
          />

          <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
              crossOrigin="anonymous"
          />

          <script>var Alert = ReactBootstrap.Alert;</script>
      </div>
    );
}


export default App;