(() => {
    let state = {
        currentWord: "",
        words: ["javascript", "python", "fortran", "coldfusion"]
    };

    let elements = {
        list: document.querySelector(".dash-list"),
        item : "<li class='dash'></li>"
    }

    let chooseWord = ( choices ) => {
        return choices[Math.floor(Math.random() * choices.length)];
    }

    let keyHandler = event => {
        
    }

    let buildBoard = () => {}

    let init = () => {
        state.currentWord = chooseWord(state.words);
        state.words = state.words.filter(word => word !== state.currentWord);

        elements.list.innerHTML = state.currentWord.split("").reduce( carry => carry += elements.item, "");

        document.addEventListener("keyup", keyHandler);
    }

    init();

    window.state = state;
})()

