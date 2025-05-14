// Later, we could implement Monte Carlo for robot logic, but that's WAY in the future

let userName = "xXN00BSL4Y3RXx";
console.log(userName);

const msgDisplay = document.getElementById("turnMessages");
const playerTurnMsg = `Your turn, ${userName}.`;

msgDisplay.textContent = playerTurnMsg;
console.log(msgDisplay)
console.log(playerTurnMsg);

const func ={
removeGreen() {
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
    for (let i = 0; i < letters.length; i++) {
        for (let ii = 1; ii < 9;ii++){
            const curr = document.getElementById(ii + letters[i])
            if (curr.style.backgroundColor == "green") {
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

const board = document.getElementById("board")
const arraywhite = ["♙", "♖","♘","♗","♕","♔"];
const arrayblack = ["♟", "♜","♞","♝","♛","♚"]
let place;
board.addEventListener("click", function(event) {
    if (event.target == board) {
        return;
    }
    if (place != null){
        if (place.className == "a") {
            place.style.backgroundColor = "honeydew";
        } else {
            place.style.backgroundColor = "tan";
        }
    }
    if (event.target.style.backgroundColor == "green") {
        event.target.textContent = place.textContent
        place.textContent = ""
        func.removeGreen()
        return;
    }
    func.removeGreen()
    place = event.target;
    let id = event.target.id;
    let text = place.textContent;
    let new1;
    let piece;
    if (text != ""){
        place.style.backgroundColor = "chocolate";

        //White
        if ( text =="♙") {
            //forward moves
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
                new1 = document.getElementById((Number(id[0]) +1) + id[1])
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "green";
                }
            }

            //side attacks
            if (id[1] != "a"){
                new1 = document.getElementById((Number(id[0]) +1) + String.fromCharCode(id[1].charCodeAt(0)-1));
                piece = new1.textContent;
                if (arrayblack.includes(piece)) {
                    new1.style.backgroundColor = "green";
                }
            }
            if (id[1] != "h"){
                new1 = document.getElementById((Number(id[0]) +1) + String.fromCharCode(id[1].charCodeAt(0)+1));
                piece = new1.textContent;
                if (arrayblack.includes(piece)) {
                    new1.style.backgroundColor = "green";
                }
            }
        }
        if ( text =="♖") {
            //up
            let curr = id
            while (curr[0] < 8) {
                curr = (Number(curr[0]) +1) + curr[1];
                new1 = document.getElementById(curr);
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                        new1.style.backgroundColor = "green";
                        continue;
                    }
                else if (arrayblack.includes(new1.textContent)) {
                    new1.style.backgroundColor = "green";
                    
                } 
                break;
            }
            //down
            curr = id
            while (curr[0] > 1) {
                curr = (Number(curr[0]) -1) + curr[1];
                new1 = document.getElementById(curr);
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                        new1.style.backgroundColor = "green";
                        continue;
                    }
                else if (arrayblack.includes(new1.textContent)) {
                    new1.style.backgroundColor = "green";
                    
                } 
                break;
            }
            //right
            curr = id
            
            while (curr[1] < "h") {
                curr = curr[0] + String.fromCharCode(curr[1].charCodeAt(0)+1);
                new1 = document.getElementById(curr);

                if (new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "green";
                    continue;
                }
                else if (arrayblack.includes(new1.textContent)) {
                    new1.style.backgroundColor = "green";
                } 
                break;
            }
            //right
            curr = id
            
            while (curr[1] > "a") {
                curr = curr[0] + String.fromCharCode(curr[1].charCodeAt(0)-1);
                new1 = document.getElementById(curr);

                if (new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "green";
                    continue;
                }
                else if (arrayblack.includes(new1.textContent)) {
                    new1.style.backgroundColor = "green";
                } 
                break;
            }
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
            if (id[0] == 7) {
                new1 = document.getElementById("6" + id[1])
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "green";
                    new1 = document.getElementById("5" + id[1]);
                    if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                        new1.style.backgroundColor = "green";
                    }
                }
            } else {
                new1 = document.getElementById((Number(id[0]) -1) + id[1])
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "green";
                }
            }

            //side attacks
            if (id[1] != "a"){
                new1 = document.getElementById((Number(id[0]) -1) + String.fromCharCode(id[1].charCodeAt(0)-1));
                piece = new1.textContent;
                if (arraywhite.includes(piece)) {
                    new1.style.backgroundColor = "green";
                }
            }
            if (id[1] != "h"){
                new1 = document.getElementById((Number(id[0]) -1) + String.fromCharCode(id[1].charCodeAt(0)+1));
                piece = new1.textContent;
                if (arraywhite.includes(piece)) {
                    new1.style.backgroundColor = "green";
                }
            }
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


