import React, { Component } from 'react';
import './App.css';
import {questionBank} from './api/index.js';

export default class App extends Component {
  
  state = {
    score: 0,
    questionIndex: 0,
    questionIndices: [0],
    answerIndices: [2, 3, 1, 0],
    questions: [
      {
        question: "",
        answers: ["", "", "", ""],
        correct: "",
        questionId: ""
      }
    ]
  }


  async componentDidMount() {
    
    let chosenQuestions = [];
    let randomQuestionIndices = [];
    for (let i = 0; i < questionBank.length; i++) {
      randomQuestionIndices.push(i);
    }
    this.shuffle(randomQuestionIndices);
    
    let randomAnswerIndices = [0, 1, 2, 3];
    this.shuffle(randomAnswerIndices);

    for (let i = 0; i < questionBank.length; i++) {
      chosenQuestions.push(questionBank[i]);
    }
    
  
    await this.setState({
      questions: chosenQuestions,
      answerIndices: randomAnswerIndices,
      questionIndices: randomQuestionIndices,
    });
    
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

  answerClicked(answerIndex) {

    let randomIndices = [0, 1, 2, 3];
    this.shuffle(randomIndices);
    let currentIndex = this.state.questionIndex;
    let {score} = this.state;
    
    if (answerIndex === -1 && currentIndex < this.state.questions.length - 1) {
      console.log(`Your score = ${score}`);
      // this.setState({
      //   questionIndex: ++currentIndex
      // });
      return;
    }

    if (this.state.questions[currentIndex].answers[answerIndex] === this.state.questions[currentIndex].correct) {
      score++;
      console.log('correct');
    }
    if (currentIndex < this.state.questions.length - 1) {
      this.setState({
        score: score,
        questionIndex: ++currentIndex
      });
      
    }
    
  }


  render() {
    const {questionIndex, questions, answerIndices, questionIndices, score} = this.state;
    return (
      <div className="App">
        <div className="main-container">
          <header>
            <h1>Quizaroni</h1>
          </header>
              <div className="question">
                <h6>{questionIndex + 1} / {questions.length}</h6>
                <p>{questions[questionIndices[questionIndex]].question}</p> 
              </div>
              <div className="answers">
                <div onClick={() => this.answerClicked(answerIndices[0])}><p>{questions[questionIndices[questionIndex]].answers[answerIndices[0]]}</p></div>
                <div onClick={() => this.answerClicked(answerIndices[1])}><p>{questions[questionIndices[questionIndex]].answers[answerIndices[1]]}</p></div>
                <div onClick={() => this.answerClicked(answerIndices[2])}><p>{questions[questionIndices[questionIndex]].answers[answerIndices[2]]}</p></div>
                <div onClick={() => this.answerClicked(answerIndices[3])}><p>{questions[questionIndices[questionIndex]].answers[answerIndices[3]]}</p></div>
              </div>
            <footer>
                <button onClick={() => this.answerClicked(-1)}>End</button>
            </footer>
          
        </div>
      </div>
    )
  }
}
