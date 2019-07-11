// Array holding to the letters of the alphabet
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
// Object Game will hold on to everything I need
var game = {
    // game.letter will hold the letter to guess
    letter: "",
    // game.guesses will hold the number of guesses left
    guesses: 8,
    // game.wins will hold the number of time I won
    wins: 0,
    // game.losses will hold the number of times I lost
    losses: 0,
    // game.addOnKeyUp adds the document.onkeyup function when the game starts
    addOnKeyUp: function() {
        var that = this; //this is a neat trick that allows you to hold on to this even in a different scope
        document.onkeyup = function(event) {
            if (alphabet.includes(event.key.toLowerCase())){
                if (that.letter === event.key.toLowerCase()){
                    that.win();
                }
                else {
                    that.guesses--;
                    if (that.guesses === 0) {
                        that.lose();
                    }
                }
            }
        }
    },
    // game.removeOnKeyUp removes the document.onkeyup function when the game ends
    removeOnKeyUp: function() {
        // by setting document.onkeyup to null I am removing the function that I added in the game.addOnKeyUp function
        document.onkeyup = null;
    },
    // game.selectRandomLetter sets game.letter to be a random letter of the alphabet
    selectRandomLetter: function() {
        this.letter = alphabet[Math.floor(Math.random()*alphabet.length)];
    },
    // game.resetGame invokes all the functions needed to restart the game and removes the reset button
    resetGame: function() {
        // reseting the number of guesses
        this.guesses = 8;
        this.selectRandomLetter();
        this.addOnKeyUp();
        var container = document.getElementById("container");
        // removing the reset button
        var resetButton = document.getElementById("reset-button");
        container.removeChild(resetButton);
    },
    // game.addResetButton adds a reset button that will restart the game when clicked
    addResetButton: function() {
        var that = this; // same trick to hold on to this inside the different scope
        // we need to create a reset button and put it in the container
        var container = document.getElementById("container");
        var newButton = document.createElement("button");
        newButton.textContent = "Reset Game";
        newButton.setAttribute("id", "reset-button");
        // add a click event listener to call on game.resetGame when someone clicks on the button
        newButton.addEventListener("click", function() {
            that.resetGame();
        });
        container.appendChild(newButton);
    },
    // game.win will be called when the game is won
    win: function() {
        // increasing the number of win
        this.wins ++;
        // changing the display to reflect the new number of win
        document.getElementById("win-count").textContent = `Wins: ${this.wins}`;
        this.removeOnKeyUp();
        this.addResetButton();
        // alert the user that they won
        alert(`You Win! The letter was "${this.letter.toUpperCase()}".`);
    },
    // game.lose will be called when the game is lost
    lose: function() {
        // increasing the number of losses
        this.losses ++;
        // changing the display to reflect the new number of win
        document.getElementById("loss-count").textContent = `Losses: ${this.losses}`;
        this.removeOnKeyUp();
        this.addResetButton();
        // alert the user that they lost
        alert(`You Lose! The letter was "${this.letter.toUpperCase()}".`);
    },
    // game.startGame will be the function we will call outside of the object in order to start the game
    startGame: function() {
        this.selectRandomLetter();
        this.addOnKeyUp();
    }
}
// start the game
game.startGame();