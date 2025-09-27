let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#btn2");
let newGameBtn = document.querySelector("#btn1");
let msg = document.querySelector("#msg");
let hide = document.querySelector(".hide")
let turn0 = true;
let moveCount = 0;

let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0 === true) {
            box.innerText = "0";
            turn0 = false;
        }
        else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        moveCount++;

        checkWin();

    });
});

let disabledBoxes = (() => {
    for (let box of boxes) {
        box.disabled = true;
    }
});

let enableBoxes = (() => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("win-highlight");
    }
});

let showWinner = ((winner, winningPattern) => {
    msg.innerText = `Congratulatiuons, the winner is player ${winner}`
    hide.classList.remove("hide");
    disabledBoxes();
    for (let index of winningPattern) {
        boxes[index].classList.add("win-highlight");
    }
});

let drawGame = (() => {
    msg.innerText = `Sorry, Draw the Game! Please Try Again...`
    hide.classList.remove("hide");
    disabledBoxes();
});

let checkWin = (() => {
    let isWinner = false;
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val == pos2Val && pos2Val == pos3Val) {
                showWinner(pos1Val, pattern);
                isWinner = true;
                break;
            }

        }

    }

    if (moveCount === 9 && !isWinner) {
        drawGame();
    }

});



let reset = (() => {
    turn0 = true;
    enableBoxes();
    hide.classList.add("hide");
    moveCount = 0;

});

newGameBtn.addEventListener("click", reset);
resetBtn.addEventListener("click", reset);





