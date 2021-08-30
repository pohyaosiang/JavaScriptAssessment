const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const rowNum = 10,
    colNum = 10;
var myX = 0
var myY = 0

class Field {
    constructor() {
        this._field = Array(rowNum).fill().map(() => Array(colNum));
        this._locationX = 0;
        this._locationY = 0;
    }



    generateField(percentage) {

        for (let y = 0; y < rowNum; y++) {
            for (let x = 0; x < colNum; x++) {
                const prob = Math.random();
                this._field[y][x] = prob > percentage ? fieldCharacter : hole;
            }
        }

        //Set the "hat" location : Object
        const hatLocation = {
            x: Math.floor(Math.random() * colNum),
            y: Math.floor(Math.random() * rowNum)
        };

        //Make sure the "hat" is not at the starting point
        while (hatLocation.x == 0 && hatLocation.y == 0) {
            hatLocation.x = Math.floor(Math.random() * colNum);
            hatLocation.y = Math.floor(Math.random() * rowNum);
        }

        this._field[hatLocation.y][hatLocation.x] = hat;

        //Set the "home" position before the game starts
        this._field[0][0] = pathCharacter;
    }

    runGame() {
        let playing = true;
        console.log("Start Game");
        //print the field
        this.print();
        this.askQuestion();
    }

    print() {
        const displayString = this._field.map(row => {
            return row.join('');
        }).join('\n');

        console.log(displayString);
    }

    askQuestion() {

        const direction = prompt('Which way?').toUpperCase();

        if (direction.toUpperCase() === 'W') {
            myY -= 1

            if (myY < 0) {
                console.log("Out of bounds - Game End!")
            } else if (this._field[myY][myX] === hole) {
                console.log("You dropped into the hole, You lose.")
            } else if (this._field[myY][myX] === hat) {
                console.log("Congrats, You win !")
            } else {
                this._field[myY][myX] = pathCharacter;
                this.print();
                this.askQuestion();
            }

        } else if (direction.toUpperCase() === 'S') {
            myY += 1
            if (myY > 9) {
                console.log("Out of bounds - Game End!")
            } else if (this._field[myY][myX] === hole) {
                console.log("You dropped into the hole, You lose.")
            } else if (this._field[myY][myX] === hat) {
                console.log("Congrats, You win !")
            } else {
                this._field[myY][myX] = pathCharacter;
                this.print();
                this.askQuestion();
            }

        } else if (direction.toUpperCase() === 'A') {
            myX -= 1
            if (myX < 0) {
                console.log("Out of bounds - Game End!")
            } else if (this._field[myY][myX] === hole) {
                console.log("You dropped into the hole, You lose.")
            } else if (this._field[myY][myX] === hat) {
                console.log("Congrats, You win !")
            } else {
                this._field[myY][myX] = pathCharacter;
                this.print();
                this.askQuestion();
            }

        } else if (direction.toUpperCase() === 'D') {
            myX += 1
            if (myX > 9) {
                console.log("Out of bounds - Game End!")
            } else if (this._field[myY][myX] === hole) {
                console.log("You dropped into the hole, You lose.")
            } else if (this._field[myY][myX] === hat) {
                console.log("Congrats, You win !")
            } else {
                this._field[myY][myX] = pathCharacter;
                this.print();
                this.askQuestion();
            }
        }
    }
}


//Create an instance of Field Class Object
const myfield = new Field();
myfield.generateField(0.3);
myfield.runGame();