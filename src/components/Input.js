import './Input.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { getRandomWord } from '../services/RandomWordService';

class Input extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            input: '', 
            singleSpoon: 'Wello Horld',
            doubleSpoon: 'Hollo Werld',
            tripleSpoon: 'Worldo Hell',
            simpleReverse: 'olleH dlroW',
            fullReverse: 'dlroW olleH',
            hasError: false,
            errorMessage: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getRandomWords = this.getRandomWords.bind(this);
    }

    handleChange(event) {
        this.setState({
            input: event.target.value,
            hasError: false
        });
    }

    handleSubmit(event) {
        this.updateSpoonResult();
        event.preventDefault();
    }

    updateSpoonResult(){
        var singleSpoonResult = this.singleSpoonInput(this.state.input);
        var doubleSpoonResult = this.doubleSpoonInput();
        var tripleSpoonResult = this.tripleSpoonInput();
        var simpleReverseResult = this.simpleReverseInput();
        var fullReverseResult = this.fullReverseInput();

        this.setState({
            singleSpoon: singleSpoonResult,
            doubleSpoon: doubleSpoonResult,
            tripleSpoon: tripleSpoonResult,
            simpleReverse: simpleReverseResult,
            fullReverse: fullReverseResult
        });
    }

    singleSpoonInput(input) {
        var words = input.trim().split(/\s+/);
        if (!this.validateInput(words)){
            return words.join(" ");
        }

        return this.spoonInput(words, 1);
    }

    doubleSpoonInput() {
        var words = this.state.input.trim().split(/\s+/);
        if (!this.validateInput(words)){
            return this.state.input;
        }

        return this.spoonInput(words, 2);
    }

    tripleSpoonInput() {
        var words = this.state.input.trim().split(/\s+/);
        if (!this.validateInput(words)){
            return this.state.input;
        }

        return this.spoonInput(words, 3);
    }

    spoonInput(words, spoons) {
        var word1 = words[0];
        var word2 = words[1];

        if ((this.startsWithVowel(word1) && !this.startsWithVowel(word2)) ||
            (!this.startsWithVowel(word1) && this.startsWithVowel(word2)))
        {
            this.setState({
                hasError: true,
                errorMessage: "Both starting with either consonant or vowel works best"
            });
            return this.state.input;
        }

        var splittedWord1 = this.splitWord(word1);
        var splittedWord2 = this.splitWord(word2);

        if (splittedWord1.length < spoons || splittedWord2.length < spoons){
            return "n/a";
        }

        var word1DoubleStart = splittedWord1.splice(0, spoons).join("");
        var word2DoubleStart = splittedWord2.splice(0, spoons).join("");
        var word1End = splittedWord1.join("");
        var word2End = splittedWord2.join("");

        return `${word2DoubleStart}${word1End} ${word1DoubleStart}${word2End}`;
    }


    validateInput(words){
        if (words.length != 2)
        {
            this.setState({
                hasError: true,
                errorMessage: "Spoons go by 2..."
            });
            return false;
        }

        return true;
    }

    //#region Word helpers
    startsWithVowel(word){
        return this.isVowel(word[0]);
    }

    isVowel(x) { 
        return ("aeiouAEIOU".indexOf(x) != -1); 
    }

    
    splitWord(word){
        // in is "hello", out is array [ "h", "e", "ll", "o" ] splitted into vowels/consonants
        var result = [];
        var isVowelSwitchOn = this.startsWithVowel(word);
        var partialResult = [];

        for (let i = 0; i <= word.length; i++) {
            if (i == word.length) {
                result.push(partialResult.join(""));
                continue;
            }

            const ch = word[i];
            var isVowel = this.isVowel(word[i]);
            
            if ((isVowelSwitchOn == isVowel)){
                partialResult.push(ch);
            }
            else {
                // change from vowel to cons / vice versa
                isVowelSwitchOn = !isVowelSwitchOn;
                result.push(partialResult.join(""));
                // clean partial result and create new with current char
                partialResult = [ ch ];
            }
        }

        return result;
    }
    //#endregion

    //#region Reverse
    simpleReverseInput() {
        var words = this.state.input.trim().split(/\s+/);
        for (let i = 0; i < words.length; i++) {
            words[i] =  this.reverseString(words[i]);
        }
        
        return words.join(" ");
    }

    fullReverseInput() {
        var simpleReverse = this.simpleReverseInput();
        return simpleReverse.split(" ").reverse().join(" ");
    }

    reverseString(str) {
        return str.split("").reverse().join("");
    }
    //#endregion

    //#region Random words
    getRandomWords(){
        var adjective = "Hey";//this.getUsableWord("adjective");
        var noun = "World";//this.getUsableWord("noun");

        var randomInput = adjective + " " + noun;
        //console.log("Random: ", randomInput);
        this.setState({
            input: randomInput
        }, () => this.updateSpoonResult());
    }

    // getRandomAdjective = () => {
    //     const fetchWord = async () => {
    //         const response = await fetch("https://api.api-ninjas.com/v1/randomword?type=adjective");
    //         const {word} = await response.json();
    //         console.log('GetRandom',word);
    //         this.setState({
    //             adjective: word
    //         });
    //     };
    //     fetchWord();
    //     console.log("Adj set:", this.state.adjective);
    // }

    getUsableWord(type){
        console.log("getting word");
        var word = "a";
        while (this.isVowel(word[0])){
            getRandomWord(type)
            .then(result => {
                console.log('res', result.word);
                this.setState({
                    input: result.word
                });
            });
        }
        return word;
    }
    //#endregion

    render() {
        return (
            <div>
                {/* <Button variant="outline-primary" 
                        type="button"
                        onClick={this.getRandomWords}>
                    Random words
                </Button> */}
                <br/>
                <Form className="spoonForm" onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="userInput" autoComplete="new-password">
                        <Form.Label className="txt-light">Input</Form.Label>
                        <Form.Control type="text" 
                                      placeholder="Hello World"
                                      autoComplete="off" 
                                      value={this.state.input} 
                                      onChange={this.handleChange} />
                    </Form.Group>
        
                    <Button variant="primary" type="submit" >
                    Submit
                    </Button>
                </Form>
                <br/>
                <p className="errormessage">{this.state.hasError ? this.state.errorMessage : ''}</p>
                
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Lvl</th>
                            <th>Output</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Single Spoon</td>
                            <td>{this.state.singleSpoon}</td>
                        </tr>
                        <tr>
                            <td>Double Spoon</td>
                            <td>{this.state.doubleSpoon}</td>
                        </tr>
                        <tr>
                            <td>Triple Spoon</td>
                            <td>{this.state.tripleSpoon}</td>
                        </tr>
                        <tr>
                            <td>Simple Reverse</td>
                            <td>{this.state.simpleReverse}</td>
                        </tr>
                        <tr>
                            <td>Full Reverse</td>
                            <td>{this.state.fullReverse}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Input;