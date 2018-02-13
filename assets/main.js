(() => {
    let state = {
        currentWord: "",
        wordStatus : "",
        wrongGuesses : 0,
        wrongGuessesList : [],
        words: ["javascript", "python", "fortran", "coldfusion"]
    };

    let elements = {
        list: document.querySelector(".dash-list"),
        item : "li",
        playAgain : "button",
        game : document.querySelector(".game-body"),
        guessList : document.querySelector(".you-guessed-list"),
        winner : document.createElement("h2"),
        loser : document.createElement("li"),
        status : document.querySelector(".game-body .status"),

        classes : {
            playAgain : "play-again-btn",
            item : "dash",
            guess : "player-guess",
            status : {
                default : "status",
                success : "success",
                failure : "failure"
            }
        },

        text : {
            success : "Success: <em>true</em>",
            failure : "Success: <em>false</em>"
        }
    }

    let chooseWord = ( choices ) => {
        return choices[Math.floor(Math.random() * choices.length)];
    }

    let writeWord = word => {
        elements.list.innerHTML = "";

        let html = word.split("").forEach((item, index) => {
            let element = document.createElement(elements.item);
            element.innerHTML = item === "_" ? " " : item;
            element.className = elements.classes.item;
            elements.list.appendChild(element);
        }, "");
    }

    let reset = () => {
        let playButton = document.createElement(elements.playAgain);
        playButton.innerText = "Play Again";
        playButton.className = elements.classes.playAgain;
        playButton.addEventListener( "click", () => init() );
        elements.game.appendChild(playButton);
        document.removeEventListener("keyup", keyHandler);        
    }

    let keyHandler = event => {
        if( state.currentWord.indexOf( event.key ) !== -1 ){
            let wordIndexes = state.currentWord.split("")
                .map( (char, index) => char === event.key ? index : false )
                .filter( item => item > -1 && item !== false );

            state.wordStatus = state.currentWord.split("")
                .map((character, index) => wordIndexes.indexOf(index) !== -1 || state.wordStatus[index] !== "_" ? character : "_")
                .join("");

            writeWord( state.wordStatus );

            if( state.wordStatus.indexOf("_") === -1 ){
                elements.status.className = elements.classes.status.default + " " + elements.classes.status.success;
                elements.status.innerHTML = elements.text.success;
                reset()
            }
        }
        else{
            if( state.wrongGuessesList.indexOf( event.key ) === -1 ){
                let guessItem = document.createElement(elements.item);
                guessItem.className = elements.classes.guess;
                guessItem.innerText = event.key;
                elements.guessList.appendChild(guessItem);
    
                state.wrongGuessesList.push(event.key);
    
                if( (++state.wrongGuesses) === 9 ){
                    let loser = elements.loser;
                    loser.className = "loser";
                    loser.innerHTML = "Word was <em>" + state.currentWord + "</em>";
                    elements.guessList.appendChild(elements.loser);
                    elements.status.className = elements.classes.status.default + " " + elements.classes.status.failure;
                    elements.status.innerHTML = elements.text.failure;
                    reset();
                }
            }
        }
    }

    let init = () => {
        let existingPlayButton = document.querySelector("." + elements.classes.playAgain)

        if( existingPlayButton )
            existingPlayButton.remove();

        state.currentWord = chooseWord(state.words);
        state.words = state.words.filter(word => word !== state.currentWord);
        state.wrongGuesses = 0;
        state.wrongGuessesList = [];
        elements.guessList.innerHTML = "";
        elements.status.className = elements.classes.status.default;

        if( state.words.length !== 0 ){
            state.wordStatus = state.currentWord.split("").reduce( carry => carry += "_", "");

            writeWord(state.wordStatus);
    
            document.addEventListener("keyup", keyHandler);
        }
    }

    window.setTimeout(init, 500);

    window.state = state;
})()

