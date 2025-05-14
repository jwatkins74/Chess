// Later, we could implement Monte Carlo for robot logic, but that's WAY in the future

let userName = "xXN00BSL4Y3RXx";
console.log(userName);

const msgDisplay = document.getElementById("turnMessages");
const playerTurnMsg = `Your turn, ${userName}.`;

msgDisplay.textContent = playerTurnMsg;
console.log(msgDisplay)
console.log(playerTurnMsg);

const board = document.getElementById("board")

let piece;
board.addEventListener("click", function(event) {
    if (event.target == board) {
        return;
    }
    if (piece != null){
        if (piece.className == "a") {
            piece.style.backgroundColor = "honeydew";
        } else {
            piece.style.backgroundColor = "tan";
        }
    }
    if (event.target.style.backgroundColor == "green") {
        event.target.textContent = piece.textContent
        piece.textContent = ""
        return;
    }
    piece = event.target;
    let id = event.target.id;
    let text = piece.textContent;
    let new1;
    if (text != ""){
        piece.style.backgroundColor = "chocolate";
        if ( text =="♙") {
            if (id)
            if (id[0] == 2) {
                new1 = document.getElementById("3" + id[1])
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "green";
                    new1 = document.getElementById("4" + id[1]);
                    if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                        new1.style.backgroundColor = "green";
                    }
                }
            } else {
                new1 = document.getElementById("3" + id[1])
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "green";
                }
            }
        }
        if ( text =="♖") {

        }
        if ( text =="♘") {

        }
        if ( text =="♗") {

        }
        if ( text =="♕") {
            
        }
        if ( text =="♔") {

        }


        //Black
        if (text == "♟") {

        }
        if (text == "♜") {
            
        }
        if (text == "♞") {
            
        }
        if (text == "♝") {
            
        }
        if (text == "♛") {
            
        }
        if (text == "♚") {
            
        }

    }
    
});

//Tries to highlight good moves ;(
