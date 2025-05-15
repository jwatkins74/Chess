//Notes:
// Later, we could implement Monte Carlo for robot logic, but that's WAY in the future
// For future note: consider object-oriented approach booo
//------------------------------------------------------------------------------------------------------------------
//Includes const values 
const arraywhite = ["♙", "♖","♘","♗","♕","♔"];
const arrayblack = ["♟", "♜","♞","♝","♛","♚"];

const enemyColor = "lightcoral"
const emptyColor = "darkseagreen"
const clickColor = "chocolate"
//------------------------------------------------------------------------------------------------------------------
//Player
let userName = "xXN00BSL4Y3RXx";
console.log(userName);

const msgDisplay = document.getElementById("turnMessages");
const playerTurnMsg = `Your turn, ${userName}.`;

msgDisplay.textContent = playerTurnMsg;
console.log(msgDisplay)
console.log(playerTurnMsg);

//-------------------------------------------------------------------------------------------------------------------
//Board Stuff

const board = document.getElementById("board")
//Use to check who "owns" a piece


let gameOver = false

//Takes care of allllll the clicking action
let place;
board.addEventListener("click", function(event) {
    //If we select board instead of tile, or game is over, do nothing
    if (event.target == board || gameOver) {
        return;
    }
    
    
    //If we click a spot that was a valid move, move the piece
    // if (event.target.style.backgroundColor == emptyColor || event.target.style.backgroundColor ==enemyColor) {
    if (avaliableMove(event.target)) {

        //TODO: Handle Pawn Promoting 
        if (event.target.textContent == "♙" && event.target.id[0] =="8"){
            
        }
        if (event.target.textContent == "♟" && event.target.id[0] =="1"){

        }

        //Sets new tile character to move piece and remove the old piece
        let oldpiece = event.target.textContent
        event.target.textContent = place.textContent
        place.textContent = ""
        revertColors()

        //Check checkmate
        if (oldpiece == "♔"){
            alert("Black Wins!!!");
            gameOver = true;
        } else if (oldpiece == "♚") {
            alert("White Wins!!!");
            gameOver = true;
        }
        return;
    }

    revertColors()
    place = event.target;
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
        place.style.backgroundColor = clickColor;

        //White
        if ( selectedPiece =="♙") {
            //forward moves
            if (id[0] == 2) {
                possibleMove = document.getElementById("3" + id[1])
                if (empty(possibleMove)) {
                    colorMove(possibleMove, "white")
                    possibleMove = document.getElementById("4" + id[1]);
                    if (empty(possibleMove)) {
                        colorMove(possibleMove, "white")
                    }
                }
            } else {
                possibleMove = document.getElementById((Number(id[0]) +1) + id[1])
                if (empty(possibleMove)) {
                    colorMove(possibleMove, "white")
                }
            }

            //side attacks
            if (id[1] != "a"){
                possibleMove = document.getElementById((Number(id[0]) +1) + String.fromCharCode(id[1].charCodeAt(0)-1));
                piece = possibleMove.textContent;
                if (arrayblack.includes(piece)) {
                    possibleMove.style.backgroundColor = enemyColor;
                }
            }
            if (id[1] != "h"){
                possibleMove = document.getElementById((Number(id[0]) +1) + String.fromCharCode(id[1].charCodeAt(0)+1));
                piece = possibleMove.textContent;
                if (arrayblack.includes(piece)) {
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
                    colorMove(possibleMove, 'white')

                    curr = (Number(id[0]) +i) + String.fromCharCode(id[1].charCodeAt(0)-1);
                    possibleMove = document.getElementById(curr);
                    colorMove(possibleMove, 'white')
                } else {
                    let curr = (Number(id[0]) +i) + String.fromCharCode(id[1].charCodeAt(0)+2);
                    possibleMove = document.getElementById(curr);
                    colorMove(possibleMove, 'white')

                    curr = (Number(id[0]) +i) + String.fromCharCode(id[1].charCodeAt(0)-2);
                    possibleMove = document.getElementById(curr);
                    colorMove(possibleMove, 'white')
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
                if (arraywhite.includes(piece)) {
                    possibleMove.style.backgroundColor = enemyColor;
                }
            }
            if (id[1] != "h"){
                possibleMove = document.getElementById((Number(id[0]) -1) + String.fromCharCode(id[1].charCodeAt(0)+1));
                piece = possibleMove.textContent;
                if (arraywhite.includes(piece)) {
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
                    colorMove(possibleMove, 'black')

                    curr = (Number(id[0]) +i) + String.fromCharCode(id[1].charCodeAt(0)-1);
                    possibleMove = document.getElementById(curr);
                    colorMove(possibleMove, 'black')
                } else {
                    let curr = (Number(id[0]) +i) + String.fromCharCode(id[1].charCodeAt(0)+2);
                    possibleMove = document.getElementById(curr);
                    colorMove(possibleMove, 'black')

                    curr = (Number(id[0]) +i) + String.fromCharCode(id[1].charCodeAt(0)-2);
                    possibleMove = document.getElementById(curr);
                    colorMove(possibleMove, 'black')
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
            colorMove(nextEle, team);
            
        } else {
            while (colorMove(nextEle, team)) {
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
function colorMove(spot, team) {
    if (!spot) {
        return false;
    }
    if (empty(spot)) { // TODO: Really PLEASE replace with a function for readibility
        spot.style.backgroundColor = emptyColor;
        return true;
    }
    else if (team == "black" && arraywhite.includes(spot.textContent)) {
        spot.style.backgroundColor = enemyColor;
    }
    else if (team == "white" && arrayblack.includes(spot.textContent)) {
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
                if (curr.className == "a") {
                    curr.style.backgroundColor = "honeydew";
                } else {
                    curr.style.backgroundColor = "tan";
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
    return spot.textContent.length == 0;
}

function avaliableMove(spot) {
    return spot.style.backgroundColor == emptyColor || spot.style.backgroundColor == enemyColor;
}