// Later, we could implement Monte Carlo for robot logic, but that's WAY in the future

let userName = "xXN00BSL4Y3RXx";
console.log(userName);

const msgDisplay = document.getElementById("turnMessages");
const playerTurnMsg = `Your turn, ${userName}.`;

msgDisplay.textContent = playerTurnMsg;
console.log(msgDisplay)
console.log(playerTurnMsg);

const func ={
removeGreenRed() {
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
    for (let i = 0; i < letters.length; i++) {
        for (let ii = 1; ii < 9;ii++){
            const curr = document.getElementById(ii + letters[i])
            if (curr.style.backgroundColor == "darkseagreen" ||curr.style.backgroundColor == "lightcoral" ) {
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
    if (event.target.style.backgroundColor == "darkseagreen" ||event.target.style.backgroundColor =="lightcoral") {
        event.target.textContent = place.textContent
        place.textContent = ""
        func.removeGreenRed()
        return;
    }
    func.removeGreenRed()
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
                    new1.style.backgroundColor = "darkseagreen";
                    new1 = document.getElementById("4" + id[1]);
                    if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                        new1.style.backgroundColor = "darkseagreen";
                    }
                }
            } else {
                new1 = document.getElementById((Number(id[0]) +1) + id[1])
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "darkseagreen";
                }
            }

            //side attacks
            if (id[1] != "a"){
                new1 = document.getElementById((Number(id[0]) +1) + String.fromCharCode(id[1].charCodeAt(0)-1));
                piece = new1.textContent;
                if (arrayblack.includes(piece)) {
                    new1.style.backgroundColor = "lightcoral";
                }
            }
            if (id[1] != "h"){
                new1 = document.getElementById((Number(id[0]) +1) + String.fromCharCode(id[1].charCodeAt(0)+1));
                piece = new1.textContent;
                if (arrayblack.includes(piece)) {
                    new1.style.backgroundColor = "lightcoral";
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
                        new1.style.backgroundColor = "darkseagreen";
                        continue;
                    }
                else if (arrayblack.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                    
                } 
                break;
            }
            //down
            curr = id
            while (curr[0] > 1) {
                curr = (Number(curr[0]) -1) + curr[1];
                new1 = document.getElementById(curr);
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                        new1.style.backgroundColor = "darkseagreen";
                        continue;
                    }
                else if (arrayblack.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                    
                } 
                break;
            }
            //right
            curr = id
            
            while (curr[1] < "h") {
                curr = curr[0] + String.fromCharCode(curr[1].charCodeAt(0)+1);
                new1 = document.getElementById(curr);

                if (new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "darkseagreen";
                    continue;
                }
                else if (arrayblack.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                } 
                break;
            }
            //right
            curr = id
            
            while (curr[1] > "a") {
                curr = curr[0] + String.fromCharCode(curr[1].charCodeAt(0)-1);
                new1 = document.getElementById(curr);

                if (new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "darkseagreen";
                    continue;
                }
                else if (arrayblack.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                } 
                break;
            }
        }
        if ( text =="♘") {

        }
        if ( text =="♗") {
             //upleft
            let curr = id
            while (curr[0] < 8 && curr[1] > "a") {
                curr = (Number(curr[0]) +1)+ String.fromCharCode(curr[1].charCodeAt(0)-1);
                new1 = document.getElementById(curr);
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                        new1.style.backgroundColor = "darkseagreen";
                        continue;
                    }
                else if (arrayblack.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                    
                } 
                break;
            }
            //down
            curr = id
            while (curr[0] < 8 && curr[1] < "h") {
                curr = (Number(curr[0]) +1) + String.fromCharCode(curr[1].charCodeAt(0)+1);
                new1 = document.getElementById(curr);
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                        new1.style.backgroundColor = "darkseagreen";
                        continue;
                    }
                else if (arrayblack.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                    
                } 
                break;
            }
            //right
            curr = id
            
            while (curr[0] > 1 && curr[1] > "a") {
                curr = (Number(curr[0]) -1) + String.fromCharCode(curr[1].charCodeAt(0)-1);
                new1 = document.getElementById(curr);

                if (new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "darkseagreen";
                    continue;
                }
                else if (arrayblack.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                } 
                break;
            }
            //right
            curr = id
            
            while (curr[0] > 1 && curr[1] < "h") {
                curr = (Number(curr[0]) -1) + String.fromCharCode(curr[1].charCodeAt(0)+1);
                new1 = document.getElementById(curr);

                if (new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "darkseagreen";
                    continue;
                }
                else if (arrayblack.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                } 
                break;
            }
        }
        if ( text =="♕") {
             //up
            let curr = id
            while (curr[0] < 8) {
                curr = (Number(curr[0]) +1) + curr[1];
                new1 = document.getElementById(curr);
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                        new1.style.backgroundColor = "darkseagreen";
                        continue;
                    }
                else if (arrayblack.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                    
                } 
                break;
            }
            //down
            curr = id
            while (curr[0] > 1) {
                curr = (Number(curr[0]) -1) + curr[1];
                new1 = document.getElementById(curr);
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                        new1.style.backgroundColor = "darkseagreen";
                        continue;
                    }
                else if (arrayblack.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                    
                } 
                break;
            }
            //right
            curr = id
            
            while (curr[1] < "h") {
                curr = curr[0] + String.fromCharCode(curr[1].charCodeAt(0)+1);
                new1 = document.getElementById(curr);

                if (new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "darkseagreen";
                    continue;
                }
                else if (arrayblack.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                } 
                break;
            }
            //right
            curr = id
            
            while (curr[1] > "a") {
                curr = curr[0] + String.fromCharCode(curr[1].charCodeAt(0)-1);
                new1 = document.getElementById(curr);

                if (new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "darkseagreen";
                    continue;
                }
                else if (arrayblack.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                } 
                break;
            }
             //upleft
            curr = id
            while (curr[0] < 8 && curr[1] > "a") {
                curr = (Number(curr[0]) +1)+ String.fromCharCode(curr[1].charCodeAt(0)-1);
                new1 = document.getElementById(curr);
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                        new1.style.backgroundColor = "darkseagreen";
                        continue;
                    }
                else if (arrayblack.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                    
                } 
                break;
            }
            //down
            curr = id
            while (curr[0] < 8 && curr[1] < "h") {
                curr = (Number(curr[0]) +1) + String.fromCharCode(curr[1].charCodeAt(0)+1);
                new1 = document.getElementById(curr);
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                        new1.style.backgroundColor = "darkseagreen";
                        continue;
                    }
                else if (arrayblack.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                    
                } 
                break;
            }
            //right
            curr = id
            
            while (curr[0] > 1 && curr[1] > "a") {
                curr = (Number(curr[0]) -1) + String.fromCharCode(curr[1].charCodeAt(0)-1);
                new1 = document.getElementById(curr);

                if (new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "darkseagreen";
                    continue;
                }
                else if (arrayblack.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                } 
                break;
            }
            //right
            curr = id
            
            while (curr[0] > 1 && curr[1] < "h") {
                curr = (Number(curr[0]) -1) + String.fromCharCode(curr[1].charCodeAt(0)+1);
                new1 = document.getElementById(curr);

                if (new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "darkseagreen";
                    continue;
                }
                else if (arrayblack.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                } 
                break;
            }
        }
        if ( text =="♔") {
            for (let i =-1; i < 2;i++) {
                for (let ii = -1; ii < 2; ii++) {
                    if (i == 0 && ii ==0) {
                        continue;
                    }
                    let curr = (Number(id[0]) +i) + String.fromCharCode(id[1].charCodeAt(0)+ii);
                    new1 = document.getElementById(curr);
                    if (new1) {
                        if (new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                            new1.style.backgroundColor = "darkseagreen";
                            continue;
                        }
                        else if (arrayblack.includes(new1.textContent)) {
                            new1.style.backgroundColor = "lightcoral";
                        }
                    }
                }
            }
        }


        //Black
        if (text == "♟") {
            if (id[0] == 7) {
                new1 = document.getElementById("6" + id[1])
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "darkseagreen";
                    new1 = document.getElementById("5" + id[1]);
                    if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                        new1.style.backgroundColor = "darkseagreen";
                    }
                }
            } else {
                new1 = document.getElementById((Number(id[0]) -1) + id[1])
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "darkseagreen";
                }
            }

            //side attacks
            if (id[1] != "a"){
                new1 = document.getElementById((Number(id[0]) -1) + String.fromCharCode(id[1].charCodeAt(0)-1));
                piece = new1.textContent;
                if (arraywhite.includes(piece)) {
                    new1.style.backgroundColor = "lightcoral";
                }
            }
            if (id[1] != "h"){
                new1 = document.getElementById((Number(id[0]) -1) + String.fromCharCode(id[1].charCodeAt(0)+1));
                piece = new1.textContent;
                if (arraywhite.includes(piece)) {
                    new1.style.backgroundColor = "lightcoral";
                }
            }
        }
        if (text == "♜") {
            //up
            let curr = id
            while (curr[0] < 8) {
                curr = (Number(curr[0]) +1) + curr[1];
                new1 = document.getElementById(curr);
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                        new1.style.backgroundColor = "darkseagreen";
                        continue;
                    }
                else if (arraywhite.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                    
                } 
                break;
            }
            //down
            curr = id
            while (curr[0] > 1) {
                curr = (Number(curr[0]) -1) + curr[1];
                new1 = document.getElementById(curr);
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                        new1.style.backgroundColor = "darkseagreen";
                        continue;
                    }
                else if (arraywhite.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                    
                } 
                break;
            }
            //right
            curr = id
            
            while (curr[1] < "h") {
                curr = curr[0] + String.fromCharCode(curr[1].charCodeAt(0)+1);
                new1 = document.getElementById(curr);

                if (new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "darkseagreen";
                    continue;
                }
                else if (arraywhite.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                } 
                break;
            }
            //right
            curr = id
            
            while (curr[1] > "a") {
                curr = curr[0] + String.fromCharCode(curr[1].charCodeAt(0)-1);
                new1 = document.getElementById(curr);

                if (new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "darkseagreen";
                    continue;
                }
                else if (arraywhite.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                } 
                break;
            }
        }
            
        
        if (text == "♞") {
            
        }
        if (text == "♝") {
             //upleft
            let curr = id
            while (curr[0] < 8 && curr[1] > "a") {
                curr = (Number(curr[0]) +1)+ String.fromCharCode(curr[1].charCodeAt(0)-1);
                new1 = document.getElementById(curr);
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                        new1.style.backgroundColor = "darkseagreen";
                        continue;
                    }
                else if (arraywhite.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                    
                } 
                break;
            }
            //down
            curr = id
            while (curr[0] < 8 && curr[1] < "h") {
                curr = (Number(curr[0]) +1) + String.fromCharCode(curr[1].charCodeAt(0)+1);
                new1 = document.getElementById(curr);
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                        new1.style.backgroundColor = "darkseagreen";
                        continue;
                    }
                else if (arraywhite.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                    
                } 
                break;
            }
            //right
            curr = id
            
            while (curr[0] > 1 && curr[1] > "a") {
                curr = (Number(curr[0]) -1) + String.fromCharCode(curr[1].charCodeAt(0)-1);
                new1 = document.getElementById(curr);

                if (new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "darkseagreen";
                    continue;
                }
                else if (arraywhite.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                } 
                break;
            }
            //right
            curr = id
            
            while (curr[0] > 1 && curr[1] < "h") {
                curr = (Number(curr[0]) -1) + String.fromCharCode(curr[1].charCodeAt(0)+1);
                new1 = document.getElementById(curr);

                if (new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "darkseagreen";
                    continue;
                }
                else if (arraywhite.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                } 
                break;
            }
        }
        if (text == "♛") {
             //up
            let curr = id
            while (curr[0] < 8) {
                curr = (Number(curr[0]) +1) + curr[1];
                new1 = document.getElementById(curr);
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                        new1.style.backgroundColor = "darkseagreen";
                        continue;
                    }
                else if (arraywhite.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                    
                } 
                break;
            }
            //down
            curr = id
            while (curr[0] > 1) {
                curr = (Number(curr[0]) -1) + curr[1];
                new1 = document.getElementById(curr);
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                        new1.style.backgroundColor = "darkseagreen";
                        continue;
                    }
                else if (arraywhite.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                    
                } 
                break;
            }
            //right
            curr = id
            
            while (curr[1] < "h") {
                curr = curr[0] + String.fromCharCode(curr[1].charCodeAt(0)+1);
                new1 = document.getElementById(curr);

                if (new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "darkseagreen";
                    continue;
                }
                else if (arraywhite.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                } 
                break;
            }
            //right
            curr = id
            
            while (curr[1] > "a") {
                curr = curr[0] + String.fromCharCode(curr[1].charCodeAt(0)-1);
                new1 = document.getElementById(curr);

                if (new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "darkseagreen";
                    continue;
                }
                else if (arraywhite.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                } 
                break;
            }
             //upleft
            curr = id
            while (curr[0] < 8 && curr[1] > "a") {
                curr = (Number(curr[0]) +1)+ String.fromCharCode(curr[1].charCodeAt(0)-1);
                new1 = document.getElementById(curr);
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                        new1.style.backgroundColor = "darkseagreen";
                        continue;
                    }
                else if (arraywhite.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                    
                } 
                break;
            }
            //down
            curr = id
            while (curr[0] < 8 && curr[1] < "h") {
                curr = (Number(curr[0]) +1) + String.fromCharCode(curr[1].charCodeAt(0)+1);
                new1 = document.getElementById(curr);
                if ( new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                        new1.style.backgroundColor = "darkseagreen";
                        continue;
                    }
                else if (arraywhite.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                    
                } 
                break;
            }
            //right
            curr = id
            
            while (curr[0] > 1 && curr[1] > "a") {
                curr = (Number(curr[0]) -1) + String.fromCharCode(curr[1].charCodeAt(0)-1);
                new1 = document.getElementById(curr);

                if (new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "darkseagreen";
                    continue;
                }
                else if (arraywhite.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                } 
                break;
            }
            //right
            curr = id
            
            while (curr[0] > 1 && curr[1] < "h") {
                curr = (Number(curr[0]) -1) + String.fromCharCode(curr[1].charCodeAt(0)+1);
                new1 = document.getElementById(curr);

                if (new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                    new1.style.backgroundColor = "darkseagreen";
                    continue;
                }
                else if (arraywhite.includes(new1.textContent)) {
                    new1.style.backgroundColor = "lightcoral";
                } 
                break;
            }
        }
        if (text == "♚") {
            for (let i =-1; i < 2;i++) {
                for (let ii = -1; ii < 2; ii++) {
                    if (i == 0 && ii ==0) {
                        continue;
                    }
                    let curr = (Number(id[0]) +i) + String.fromCharCode(id[1].charCodeAt(0)+ii);
                    new1 = document.getElementById(curr);
                    if (new1) {
                        if (new1.textContent == null|| new1.textContent.length == undefined || new1.textContent.length ==0) {
                            new1.style.backgroundColor = "darkseagreen";
                            continue;
                        }
                        else if (arraywhite.includes(new1.textContent)) {
                            new1.style.backgroundColor = "lightcoral";
                        }
                    }
                }
            }
        }

    }
    
});


