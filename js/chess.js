// Later, we could implement Monte Carlo for robot logic, but that's WAY in the future
// For future note: consider object-oriented approach

let userName = "xXN00BSL4Y3RXx";
console.log(userName);

const msgDisplay = document.getElementById("turnMessages");
const playerTurnMsg = `Your turn, ${userName}.`;

msgDisplay.textContent = playerTurnMsg;
console.log(msgDisplay)
console.log(playerTurnMsg);


//Changes tiles back to their orig color after making move/deselecting piece
const func ={
removeGreenRed() {
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
    for (let i = 0; i < letters.length; i++) {
        for (let ii = 1; ii < 9;ii++){
            const curr = document.getElementById(ii + letters[i])
            if (curr.style.backgroundColor == "darkseagreen" ||curr.style.backgroundColor == "lightcoral" ||curr.style.backgroundColor == "chocolate" ) {
                if (curr.className == "a") {
                    curr.style.backgroundColor = "honeydew";
                } else {
                    curr.style.backgroundColor = "tan";
                }
            }
        }
    }
}
};

function isDeselected(spot) {
    return spot.style.backgroundColor == "darkseagreen" || spot.style.backgroundColor == "lightcoral";
}

const board = document.getElementById("board")
//Use to check who "owns" a piece
const arraywhite = ["♙", "♖","♘","♗","♕","♔"];
const arrayblack = ["♟", "♜","♞","♝","♛","♚"]

let gameOver = false

//Takes care of allllll the clicking action
let place;
board.addEventListener("click", function(event) {
    //If we select board instead of tile, do nothing
    if (event.target == board) {
        return;
    }
    //Don't register additional clicks after gameOver
    if (gameOver) {
        return;
    }
    //If we click a spot that was a valid move, move the piece
    // if (event.target.style.backgroundColor == "darkseagreen" || event.target.style.backgroundColor =="lightcoral") {
    if (isDeselected(event.target)) {

        //TODO: Handle Pawn Promoting 
        if (event.target.textContent == "♙" && event.target.id[0] =="8"){
            
        }
        if (event.target.textContent == "♟" && event.target.id[0] =="1"){

        }

        //Sets new tile character to move piece and remove the old piece
        let oldpiece = event.target.textContent
        event.target.textContent = place.textContent
        place.textContent = ""
        func.removeGreenRed()

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

    func.removeGreenRed()
    place = event.target;
    let id = event.target.id;
    let selectedPiece = place.textContent;
    let possibleMove;
    let piece;

    //If we select a piece, we want to highlight moves

    //This needs to be moved to a highlightMoves() function
    if (selectedPiece != ""){
        place.style.backgroundColor = "chocolate";

        //White
        if ( selectedPiece =="♙") {
            //forward moves
            if (id[0] == 2) {
                possibleMove = document.getElementById("3" + id[1])
                if (possibleMove.textContent.length ==0) {
                    possibleMove.style.backgroundColor = "darkseagreen";
                    possibleMove = document.getElementById("4" + id[1]);
                    if (possibleMove.textContent.length ==0) {
                        possibleMove.style.backgroundColor = "darkseagreen";
                    }
                }
            } else {
                possibleMove = document.getElementById((Number(id[0]) +1) + id[1])
                if (possibleMove.textContent.length ==0) {
                    possibleMove.style.backgroundColor = "darkseagreen";
                }
            }

            //side attacks
            if (id[1] != "a"){
                possibleMove = document.getElementById((Number(id[0]) +1) + String.fromCharCode(id[1].charCodeAt(0)-1));
                piece = possibleMove.textContent;
                if (arrayblack.includes(piece)) {
                    possibleMove.style.backgroundColor = "lightcoral";
                }
            }
            if (id[1] != "h"){
                possibleMove = document.getElementById((Number(id[0]) +1) + String.fromCharCode(id[1].charCodeAt(0)+1));
                piece = possibleMove.textContent;
                if (arrayblack.includes(piece)) {
                    possibleMove.style.backgroundColor = "lightcoral";
                }
            }
        }
        if ( selectedPiece =="♖") {
            //up
            let curr = id
            while (curr[0] < 8) {
                curr = (Number(curr[0]) +1) + curr[1];
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'white')) break;
            }
            //down
            curr = id
            while (curr[0] > 1) {
                curr = (Number(curr[0]) -1) + curr[1];
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'white')) break;
            }
            //right
            curr = id
            
            while (curr[1] < "h") {
                curr = curr[0] + String.fromCharCode(curr[1].charCodeAt(0)+1);
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'white')) break;
            }
            //right
            curr = id
            
            while (curr[1] > "a") {
                curr = curr[0] + String.fromCharCode(curr[1].charCodeAt(0)-1);
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'white')) break;
            }
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
             //upleft
            let curr = id
            while (curr[0] < 8 && curr[1] > "a") {
                curr = (Number(curr[0]) +1)+ String.fromCharCode(curr[1].charCodeAt(0)-1);
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'white')) break;
            }
            //down
            curr = id
            while (curr[0] < 8 && curr[1] < "h") {
                curr = (Number(curr[0]) +1) + String.fromCharCode(curr[1].charCodeAt(0)+1);
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'white')) break;
            }
            //right
            curr = id
            
            while (curr[0] > 1 && curr[1] > "a") {
                curr = (Number(curr[0]) -1) + String.fromCharCode(curr[1].charCodeAt(0)-1);
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'white')) break;
            }
            //right
            curr = id
            
            while (curr[0] > 1 && curr[1] < "h") {
                curr = (Number(curr[0]) -1) + String.fromCharCode(curr[1].charCodeAt(0)+1);
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'white')) break;
            }
        }
        if ( selectedPiece =="♕") {
             //up
            let curr = id
            while (curr[0] < 8) {
                curr = (Number(curr[0]) +1) + curr[1];
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'white')) break;
            }
            //down
            curr = id
            while (curr[0] > 1) {
                curr = (Number(curr[0]) -1) + curr[1];
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'white')) break;
            }
            //right
            curr = id
            
            while (curr[1] < "h") {
                curr = curr[0] + String.fromCharCode(curr[1].charCodeAt(0)+1);
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'white')) break;
            }
            //right
            curr = id
            
            while (curr[1] > "a") {
                curr = curr[0] + String.fromCharCode(curr[1].charCodeAt(0)-1);
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'white')) break;
            }
             //upleft
            curr = id
            while (curr[0] < 8 && curr[1] > "a") {
                curr = (Number(curr[0]) +1)+ String.fromCharCode(curr[1].charCodeAt(0)-1);
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'white')) break;
            }
            //down
            curr = id
            while (curr[0] < 8 && curr[1] < "h") {
                curr = (Number(curr[0]) +1) + String.fromCharCode(curr[1].charCodeAt(0)+1);
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'white')) break;
            }
            //right
            curr = id
            
            while (curr[0] > 1 && curr[1] > "a") {
                curr = (Number(curr[0]) -1) + String.fromCharCode(curr[1].charCodeAt(0)-1);
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'white')) break;
            }
            //right
            curr = id
            
            while (curr[0] > 1 && curr[1] < "h") {
                curr = (Number(curr[0]) -1) + String.fromCharCode(curr[1].charCodeAt(0)+1);
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'white')) break;
            }
        }
        if ( selectedPiece =="♔") {
            for (let i =-1; i < 2;i++) {
                for (let ii = -1; ii < 2; ii++) {
                    if (i == 0 && ii ==0) {
                        continue;
                    }
                    let curr = (Number(id[0]) +i) + String.fromCharCode(id[1].charCodeAt(0)+ii);
                    possibleMove = document.getElementById(curr);
                    if (!colorMove(possibleMove, 'white')) break;
                    //FIXME: Bug where the white king cannot move up unless the top left space is free
                }
            }
        }


        //Black
        if (selectedPiece == "♟") {
            if (id[0] == 7) {
                possibleMove = document.getElementById("6" + id[1])
                if (possibleMove.textContent.length ==0) {
                    possibleMove.style.backgroundColor = "darkseagreen";
                    possibleMove = document.getElementById("5" + id[1]);
                    if (possibleMove.textContent.length ==0) {
                        possibleMove.style.backgroundColor = "darkseagreen";
                    }
                }
            } else {
                possibleMove = document.getElementById((Number(id[0]) -1) + id[1])
                if (possibleMove.textContent.length ==0) {
                    possibleMove.style.backgroundColor = "darkseagreen";
                }
            }

            //side attacks
            if (id[1] != "a"){
                possibleMove = document.getElementById((Number(id[0]) -1) + String.fromCharCode(id[1].charCodeAt(0)-1));
                piece = possibleMove.textContent;
                if (arraywhite.includes(piece)) {
                    possibleMove.style.backgroundColor = "lightcoral";
                }
            }
            if (id[1] != "h"){
                possibleMove = document.getElementById((Number(id[0]) -1) + String.fromCharCode(id[1].charCodeAt(0)+1));
                piece = possibleMove.textContent;
                if (arraywhite.includes(piece)) {
                    possibleMove.style.backgroundColor = "lightcoral";
                }
            }
        }
        if (selectedPiece == "♜") {
            //up
            let curr = id
            while (curr[0] < 8) {
                curr = (Number(curr[0]) +1) + curr[1];
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'black')) break;
            }
            //down
            curr = id
            while (curr[0] > 1) {
                curr = (Number(curr[0]) -1) + curr[1];
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'black')) break;
            }
            //right
            curr = id
            
            while (curr[1] < "h") {
                curr = curr[0] + String.fromCharCode(curr[1].charCodeAt(0)+1);
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'black')) break;
            }
            //right
            curr = id
            
            while (curr[1] > "a") {
                curr = curr[0] + String.fromCharCode(curr[1].charCodeAt(0)-1);
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'black')) break;
            }
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
             //upleft
            let curr = id
            while (curr[0] < 8 && curr[1] > "a") {
                curr = (Number(curr[0]) +1)+ String.fromCharCode(curr[1].charCodeAt(0)-1);
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'black')) break;
            }
            //down
            curr = id
            while (curr[0] < 8 && curr[1] < "h") {
                curr = (Number(curr[0]) +1) + String.fromCharCode(curr[1].charCodeAt(0)+1);
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'black')) break;
            }
            //right
            curr = id
            
            while (curr[0] > 1 && curr[1] > "a") {
                curr = (Number(curr[0]) -1) + String.fromCharCode(curr[1].charCodeAt(0)-1);
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'black')) break;
            }
            //right
            curr = id
            
            while (curr[0] > 1 && curr[1] < "h") {
                curr = (Number(curr[0]) -1) + String.fromCharCode(curr[1].charCodeAt(0)+1);
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'black')) break;
            }
        }
        if (selectedPiece == "♛") {
             //up
            let curr = id
            while (curr[0] < 8) {
                curr = (Number(curr[0]) +1) + curr[1];
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'black')) break;
            }
            //down
            curr = id
            while (curr[0] > 1) {
                curr = (Number(curr[0]) -1) + curr[1];
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'black')) break;
            }
            //right
            curr = id
            
            while (curr[1] < "h") {
                curr = curr[0] + String.fromCharCode(curr[1].charCodeAt(0)+1);
                possibleMove = document.getElementById(curr);

                if (!colorMove(possibleMove, 'black')) break;
            }
            //right
            curr = id
            
            while (curr[1] > "a") {
                curr = curr[0] + String.fromCharCode(curr[1].charCodeAt(0)-1);
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'black')) break;
            }
             //upleft
            curr = id
            while (curr[0] < 8 && curr[1] > "a") {
                curr = (Number(curr[0]) +1)+ String.fromCharCode(curr[1].charCodeAt(0)-1);
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'black')) break;
            }
            //down
            curr = id
            while (curr[0] < 8 && curr[1] < "h") {
                curr = (Number(curr[0]) +1) + String.fromCharCode(curr[1].charCodeAt(0)+1);
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'black')) break;
            }
            //right
            curr = id
            
            while (curr[0] > 1 && curr[1] > "a") {
                curr = (Number(curr[0]) -1) + String.fromCharCode(curr[1].charCodeAt(0)-1);
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'black')) break;
            }
            //right
            curr = id
            
            while (curr[0] > 1 && curr[1] < "h") {
                curr = (Number(curr[0]) -1) + String.fromCharCode(curr[1].charCodeAt(0)+1);
                possibleMove = document.getElementById(curr);
                if (!colorMove(possibleMove, 'black')) break;
            }
        }
        if (selectedPiece == "♚") {
            for (let i =-1; i < 2;i++) {
                for (let ii = -1; ii < 2; ii++) {
                    if (i == 0 && ii ==0) {
                        continue;
                    }
                    let curr = (Number(id[0]) +i) + String.fromCharCode(id[1].charCodeAt(0)+ii);
                    possibleMove = document.getElementById(curr);
                    colorMove(possibleMove, 'black');


                }
            }
        }

    }
    
});

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
    if (spot.textContent.length ==0) { // TODO: Really PLEASE replace with a function for readibility
        spot.style.backgroundColor = "darkseagreen";
        return true;
    }
    else if (team == "black" && arraywhite.includes(spot.textContent)) {
        spot.style.backgroundColor = "lightcoral";
    }
    else if (team == "white" && arrayblack.includes(spot.textContent)) {
        spot.style.backgroundColor = "lightcoral";
    }
    return false;
}