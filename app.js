'use strict';


/////////////////
// Variables//
/////////////////
var inquirer = ('inquirer');
var fs = ('fs');
var basic = require("./BasicCard");
var cloze = require("./ClozeCard");
var input = process.argv[2];
var questions = [];
var clozeQuestions = [];





////////////////////////
 // Beginning of App  //
 ///////////////////////
if (input === undefined) {
    /*******************
     * When input is undefined and user inputs no process move user into error prompt for proper input
     ********************/

    console.log('Please input command either "Basic" or "Cloze" to select the type of flash card you would like to save.');

} else if (input.toLowerCase() === "basic") {
    /*******************
     * When input is "basic" move user into prompts to save basic Flash Cards
     ********************/

    // testing that basic if statement has been entered by user
    console.log('You chose to make a Basic flashcard!');

    // Creating user prompts to creat flash cards
    var questionPrompts = [{
        type: "input",
        name: "question",
        message: "What is the front of the card?"
    }, {
        type: "input",
        name: "answer",
        message: "What is the back of the card?"
    }];

    // handle the first repsonse input from the user
    var handleQuestionResponse = function(answers) {
        var newQuestion = new Basic(answers.question, answers.answer);
        newQuestion.printInfo();
        var newQuestionJSON = JSON.stringify(newQuestion);
        questions.push(newQuestionJSON);
        fs.appendFile('basicflashcard.txt', newQuestionJSON + "\n");

        // Checks to see if user wanted to input more than one flash card at a time
        return inquirer.prompt([{
            name: "another",
            message: "add another?",
            type: "confirm",
            default: true
        }]);
    };

    // handler for multiple repsonses from user
    var handleAnotherResponse = function(cont) {
        if (cont.another) {
            promptForQuestion();
        } else {
            console.log("Number of Flashcards added to database: " + questions.length + ".");
        }
    };

    // error checker and response given
    var handleError = function(err) {
        console.log("There has been an error.");
    };

    // compiles all user input
    var promptForQuestion = function() {
        inquirer.prompt(questionPrompts)
            .then(handleQuestionResponse, handleError)
            .then(handleAnotherResponse, handleError);
    };