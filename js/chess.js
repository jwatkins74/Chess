/*
Notes:
Later, we could implement Monte Carlo for robot logic, but that's WAY in the future
For future note: consider object-oriented approach booo

Thigns to fix/add:
-Centering board
-Pawn Promotions
-Mine Map? Idk if we should have an extra grid for the bombs, as trying to put the minesweeper numbers on the same grid is eww
-Future- Add one player (Ai will be hard to make), Add online?

*/
//------------------------------------------------------------------------------------------------------------------
//Includes const values 
const pieces = [["♙", "♟"], ["♖", "♜"], ["♘", "♞"], ["♗", "♝"], ["♕", "♛"], ["♔", "♚"]]
const whitePieces = ["♙", "♖","♘","♗","♕","♔"];
const blackPieces = ["♟", "♜","♞","♝","♛","♚"];

const enemyColor = "lightcoral";   // color of tiles where moves do kill
const emptyColor = "darkseagreen"; // color of tiles where moves don't kill
const clickColor = "chocolate";    // clicked tile color
const aColor     = "honeydew";     // A tile colors
const bColor     = "tan";          // B tile colors

const mineProb = 0.2;              //Prob of mine, each center tile
const mineVis = false;              //For us to test
const mineColor = "red";           //vis mine color
//------------------------------------------------------------------------------------------------------------------
//Player
let turn = "white";
const msgDisplay = document.getElementById("turnMessages");
msgDisplay.textContent = `${turn}'s turn.`;

//-------------------------------------------------------------------------------------------------------------------
//Mines
//j is vertical
let bombs = [];
for (let j = 3; j < 7; j++) {
    for (let k = 0; k < 8; k++) {
        if (Math.random() < mineProb) {
            let s = j + String.fromCharCode("a".charCodeAt(0)+k);
            if (mineVis) {
                const bomb = document.getElementById(s);
                bomb.style.backgroundColor = mineColor;
            }
            
            bombs.push(s)
        }
    }
}
//-------------------------------------------------------------------------------------------------------------------
let flipped = false
let flipOn = true;
const flipButton = document.getElementById("flip");
flipButton.addEventListener("click", function(event) {
    flipOn = !flipOn;
    if (flipOn && turn == "black") {
        flip();
    } 
    if (flipOn) {
        flipButton.textContent = "Flip is on!"
    }
    if (!flipOn) {
        flipButton.textContent = "Flip is off!"
    }

    });
    /**
 * Function to flip tiles
 * @param {*} piece Piece to be moved
 * @returns If move is valid.
 */
function flip() {
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
    for (let i = 0; i < letters.length; i++) {
        for (let ii = 1; ii < 9;ii++){
            const curr = document.getElementById(ii + letters[i])
            if (flipped) {
                curr.style.transform="rotate(0deg)";
            } else {
                curr.style.transform = "rotate(180deg)";
            }
            
        }
    }
    if (flipped) {
        board.style.transform = "rotate(0deg)";
        flipped = false;
    } else {
        board.style.transform = "rotate(180deg)";
        flipped = true;
    }
}
//-------------------------------------------------------------------------------------------------------------------
//Board Stuff

const board = document.getElementById("board");
//Use to check who "owns" a piece


let gameOver = false;
let oldSelected;
board.addEventListener("click", function(event) {
    //If we select board instead of tile, or game is over, do nothing
    if (event.target == board || gameOver) {
        return;
    }

    //If we click a spot that was a valid move, move the piece (bombs)
    // if (event.target.style.backgroundColor == emptyColor || event.target.style.backgroundColor ==enemyColor) {
    if (avaliableMove(event.target)) {
        if (!turnflag(oldSelected.textContent)) {
            alert(`It is ${turn}'s turn!`)
            return;
        }
        //This means we are good to swap!

        //swap turn
        if (turn == "white") {
            turn = "black";
        } else {
            turn = "white";
        }
        msgDisplay.textContent = `${turn}'s turn.`;

        //Blow up if goes to mine
        if (bombs.includes(event.target.id)){
            oldSelected.textContent = "";
            let index = bombs.findIndex(spot => mine(spot, event.target.id));
            bombs.splice(index, 1);
            revertColors();
            if (flipOn) {
                flip();
            }
            return
        }
        //Sets new tile character to move piece and remove the old piece
        let oldpiece = event.target.textContent
        event.target.textContent = oldSelected.textContent
        oldSelected.textContent = ""

        //Handle Pawn Promotion
        if (event.target.textContent == "♙" && event.target.id[0] == "8"){
            event.target.textContent = promotePawn("white");
        }
        if (event.target.textContent == "♟" && event.target.id[0] =="1"){
            event.target.textContent = promotePawn("black");
        }
        revertColors()


        //Check checkmate
        if (oldpiece == "♔"){
            alert("Black Wins!!!");
            gameOver = true;
            if (flipped) {
                flip();
            }
        } else if (oldpiece == "♚") {
            alert("White Wins!!!");
            gameOver = true;
            if (flipped) {
                flip();
            }
        } else {
            if (flipOn) {
                flip();
            }
            
        }
        return;
    }

    revertColors()
    oldSelected = event.target;
    let possibleMove;
    let piece;

    //If we select a piece, we want to highlight moves
    highlightMoves(event.target);
    });
//-------------------------------------------------------------------------------------------------------------------
//Functions
/**
 * This determines the piece - sends directions to allDirections()
 * @param {*} spot The current location of the piece
 */
function highlightMoves(spot) {
    if (!spot) {
        return;
    }
    let id = spot.id;
    let selectedPiece = spot.textContent;
    if (selectedPiece != ""){
        oldSelected.style.backgroundColor = clickColor;

        //White
        if ( selectedPiece =="♙") {
            //forward moves
            if (id[0] == 2) {
                possibleMove = document.getElementById("3" + id[1])
                if (empty(possibleMove)) {
                    colorPossibleMoves(possibleMove, "white")
                    possibleMove = document.getElementById("4" + id[1]);
                    if (empty(possibleMove)) {
                        colorPossibleMoves(possibleMove, "white")
                    }
                }
            } else {
                possibleMove = document.getElementById((Number(id[0]) +1) + id[1])
                if (empty(possibleMove)) {
                    colorPossibleMoves(possibleMove, "white")
                }
            }

            //side attacks
            if (id[1] != "a"){
                possibleMove = document.getElementById((Number(id[0]) +1) + String.fromCharCode(id[1].charCodeAt(0)-1));
                piece = possibleMove.textContent;
                if (blackPieces.includes(piece)) {
                    possibleMove.style.backgroundColor = enemyColor;
                }
            }
            if (id[1] != "h"){
                possibleMove = document.getElementById((Number(id[0]) +1) + String.fromCharCode(id[1].charCodeAt(0)+1));
                piece = possibleMove.textContent;
                if (blackPieces.includes(piece)) {
                    possibleMove.style.backgroundColor = enemyColor;
                }
            }
        }
        if ( selectedPiece =="♖") {
            allDirections(id, "white", [[1,0],[-1,0],[0,1],[0,-1]], false);
        }
        if ( selectedPiece =="♘") {
            for (let i = -2; i < 3; i++) {
                if (i==0){
                    continue;
                }
                if (i > 1 || i < -1) {
                    let curr = (Number(id[0]) +i) + String.fromCharCode(id[1].charCodeAt(0)+1);
                    possibleMove = document.getElementById(curr);
                    colorPossibleMoves(possibleMove, 'white')

                    curr = (Number(id[0]) +i) + String.fromCharCode(id[1].charCodeAt(0)-1);
                    possibleMove = document.getElementById(curr);
                    colorPossibleMoves(possibleMove, 'white')
                } else {
                    let curr = (Number(id[0]) +i) + String.fromCharCode(id[1].charCodeAt(0)+2);
                    possibleMove = document.getElementById(curr);
                    colorPossibleMoves(possibleMove, 'white')

                    curr = (Number(id[0]) +i) + String.fromCharCode(id[1].charCodeAt(0)-2);
                    possibleMove = document.getElementById(curr);
                    colorPossibleMoves(possibleMove, 'white')
                }

            }
        }
        if ( selectedPiece =="♗") {
            allDirections(id, "white", [[1,1],[-1,1],[1,-1],[-1,-1]], false);
        }
        if ( selectedPiece =="♕") {
            allDirections(id, "white", [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]], false);
        }
        if ( selectedPiece =="♔") {
            allDirections(id, "white", [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]], true);
        }


        //Black
        if (selectedPiece == "♟") {
            if (id[0] == 7) {
                possibleMove = document.getElementById("6" + id[1])
                if (empty(possibleMove)) {
                    possibleMove.style.backgroundColor = emptyColor;
                    possibleMove = document.getElementById("5" + id[1]);
                    if (empty(possibleMove)) {
                        possibleMove.style.backgroundColor = emptyColor;
                    }
                }
            } else {
                possibleMove = document.getElementById((Number(id[0]) -1) + id[1])
                if (empty(possibleMove)) {
                    possibleMove.style.backgroundColor = emptyColor;
                }
            }

            //side attacks
            if (id[1] != "a"){
                possibleMove = document.getElementById((Number(id[0]) -1) + String.fromCharCode(id[1].charCodeAt(0)-1));
                piece = possibleMove.textContent;
                if (whitePieces.includes(piece)) {
                    possibleMove.style.backgroundColor = enemyColor;
                }
            }
            if (id[1] != "h"){
                possibleMove = document.getElementById((Number(id[0]) -1) + String.fromCharCode(id[1].charCodeAt(0)+1));
                piece = possibleMove.textContent;
                if (whitePieces.includes(piece)) {
                    possibleMove.style.backgroundColor = enemyColor;
                }
            }
        }
        if (selectedPiece == "♜") {
            allDirections(id, "black", [[1,0],[-1,0],[0,1],[0,-1]], false);
        }
        if (selectedPiece == "♞") {
            for (let i = -2; i < 3; i++) {
                if (i==0){
                    continue;
                }
                if (i > 1 || i < -1) {
                    let curr = (Number(id[0]) +i) + String.fromCharCode(id[1].charCodeAt(0)+1);
                    possibleMove = document.getElementById(curr);
                    colorPossibleMoves(possibleMove, 'black')

                    curr = (Number(id[0]) +i) + String.fromCharCode(id[1].charCodeAt(0)-1);
                    possibleMove = document.getElementById(curr);
                    colorPossibleMoves(possibleMove, 'black')
                } else {
                    let curr = (Number(id[0]) +i) + String.fromCharCode(id[1].charCodeAt(0)+2);
                    possibleMove = document.getElementById(curr);
                    colorPossibleMoves(possibleMove, 'black')

                    curr = (Number(id[0]) +i) + String.fromCharCode(id[1].charCodeAt(0)-2);
                    possibleMove = document.getElementById(curr);
                    colorPossibleMoves(possibleMove, 'black')
                }

            }
        }
        if (selectedPiece == "♝") {
            allDirections(id, "black", [[1,1],[-1,1],[1,-1],[-1,-1]], false);
        }
        if (selectedPiece == "♛") {
            allDirections(id, "black", [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]], false);
        }
        if (selectedPiece == "♚") {
            allDirections(id, "black", [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]], true);
        }
    }
    
}
/**
 * This uses colorMove to highlight all tiles for a piece given its directions, doesnt work for knight or pawn 
 * @param {string} spot The current location of the piece
 * @param {string} team The team of the chessboard TODO: We can just have black passed in depending on the piece instead of manual input
 * @param {number[][]} directions The Directions,[move1:[vertical,horizontal],move2...[]] ex: [[0,1],[-1,1]] -> piece can only move right and down-right 
 * @param {boolean} slow - tue means piece can only move one in the direction
 */
function allDirections(spot, team, directions, slow) {
    if (!spot) {
        return;
    }
    for (let i = 0; i < directions.length; i++) {
        let vertDirection = directions[i][0];
        let horDirection = directions[i][1];
        let nextPost = (Number(spot[0]) + vertDirection)+ String.fromCharCode(spot[1].charCodeAt(0)+horDirection);
        let nextEle = document.getElementById(nextPost);
        if (slow) {
            colorPossibleMoves(nextEle, team);
            
        } else {
            while (colorPossibleMoves(nextEle, team)) {
                nextPost = (Number(nextPost[0]) + vertDirection)+ String.fromCharCode(nextPost[1].charCodeAt(0)+horDirection);
                nextEle = document.getElementById(nextPost);
            } 
        }
    }
    
}

/**
 * This colors all possible moves for a piece after clicking on it.
 * @param {*} spot The current place on the board we're checking
 * @param {*} team The team of the chessboard TODO: We can just have black passed in depending on the piece instead of manual input
 * @returns Whether the piece would be able to move further in that direction. If false, then the piece 
 * will continue checking further spots in that direction to see if they are valid moves.
 */
function colorPossibleMoves(spot, team) {
    if (!spot) {
        return false;
    }
    if (empty(spot)) {
        spot.style.backgroundColor = emptyColor;
        return true;
    }
    else if (team == "black" && whitePieces.includes(spot.textContent)) {
        spot.style.backgroundColor = enemyColor;
    }
    else if (team == "white" && blackPieces.includes(spot.textContent)) {
        spot.style.backgroundColor = enemyColor;
    }
    return false;
}
/**
 * This changes back the color of all tiles
 */
function revertColors() {
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
    for (let i = 0; i < letters.length; i++) {
        for (let ii = 1; ii < 9;ii++){
            const curr = document.getElementById(ii + letters[i])
            if (curr.style.backgroundColor == emptyColor ||curr.style.backgroundColor == enemyColor ||curr.style.backgroundColor == clickColor ) {
                if (mineVis && bombs.includes(curr.id)) {
                    curr.style.backgroundColor = mineColor;
                }else if (curr.className == "a") {
                    curr.style.backgroundColor = aColor;
                } else {
                    curr.style.backgroundColor = bColor;
                }
            }
        }
    }
}

/**
 * Checks if tile is empty
 * @param {*} spot The current place on the board we're checking
 * @returns True if spot is empty, false else.
 */
function empty(spot) {
    return spot.textContent.length == 0 && spot != null;
}

function avaliableMove(spot) {
    return spot.style.backgroundColor == emptyColor || spot.style.backgroundColor == enemyColor;
}
/**
 * Function needed to check where an array holds the value target
 * @param {*} spot The array input
 * @param {*} target The target
 * @returns If the target is found
 */
function mine(spot, target) {
    return spot == target;
}
/**
 * Function to check if piece can be moved, based on turn order
 * @param {*} piece Piece to be moved
 * @returns If move is valid.
 */
function turnflag(piece) {
    if (turn == "white" && whitePieces.includes(piece)) {
        return true;
    }else if (turn == "black" && blackPieces.includes(piece)) {
        return true;
    }
    return false;
}
/**
 * Promotes a pawn to another piece using browser alerts
 * TODO: Implement proper GUI later
 * @param {*} team The team of the current pawn being replaced
 * @returns The new piece the pawn will be replaced with.
 */
function promotePawn(team) {
    if (team == "white") team = 0;
    else team = 1;
    let piece = "none";
    while (!(blackPieces.includes(piece) || whitePieces.includes(piece))) {
        let choice = prompt("What new piece would you like to select?").toLowerCase();
        switch (choice){
            case "pawn": return pieces[0][team];
            case "rook": return pieces[1][team];
            case "knight": return pieces[2][team];
            case "bishop": return pieces[3][team];
            case "queen": return pieces[4][team];
            case "king": return pieces[5][team];
            default: alert("Invalid Choice!");
        }
    }
}