import './Input.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Table from 'react-bootstrap/Table';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '', 
            output1: 'Wello Horld',
            output2: 'olleH dlroW',
            hasError: false,
            errorMessage: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            input: event.target.value,
            hasError: false
        });
    }

    handleSubmit(event) {
        var result1 = this.simpleSpoonInput(this.state.input);
        var result2 = this.reverseInput(this.state.input);

        this.setState({
            output1: result1,
            output2: result2 
        });

        event.preventDefault();
    }

    simpleSpoonInput(input) {
        var words = input.trim().split(/\s+/);
        if (words.length < 2)
        {
            this.setState({
                hasError: true,
                errorMessage: "Please fill in at least 2 words"
            });
            return input;
        }

        if (words.length > 2) {
            this.setState({
                hasError: true,
                errorMessage: "More than 2 words not supported atm..."
            });
            return input;
        }

        var word1 = words[0];
        var word2 = words[1];

        if(this.startsWithVowel(word1) || this.startsWithVowel(word2)){
            this.setState({
                hasError: true,
                errorMessage: "Both starting with consonant works best"
            });
            return input;
        }

        var new2Start = "";
        var word1VowelIndex = 0;
        for (let i = 0; !this.isVowel(word1[i]); i++) {
            word1VowelIndex++;       
            new2Start += word1[i];
        }
        var new1End = word1.substring(word1VowelIndex);

        var new1Start = "";
        var word2VowelIndex = 0;
        for (let i = 0; !this.isVowel(word2[i]); i++) {
            word2VowelIndex++;       
            new1Start += word2[i];
        }
        var new2End = word2.substring(word2VowelIndex);

        var newFirstWord = new1Start + new1End;
        var newSecondWord = new2Start + new2End;

        var simpleSpoon = newFirstWord + " " + newSecondWord;

        return simpleSpoon;
    }

    startsWithVowel(word){
        return this.isVowel(word[0]);
    }

    isVowel(x) { 
        return ("aeiouAEIOU".indexOf(x) != -1); 
    }

    reverseInput(input) {

    }

    render() {
        return (
            <div>
                <Form className="spoonForm" onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="userInput">
                        <Form.Label className="txt-light">Input</Form.Label>
                        <Form.Control type="text" 
                                      placeholder="Hello world" 
                                      value={this.state.input} 
                                      onChange={this.handleChange} />
                    </Form.Group>
        
                    <Button variant="primary" type="submit" >
                    Submit
                    </Button>
                </Form>
                <br/>
                {this.state.hasError ? this.state.errorMessage : ''}
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Lvl</th>
                            <th>Output</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>{this.state.output1}</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>{this.state.output2}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Input;