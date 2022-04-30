const cell = document.querySelectorAll(".cell");
let cellStatus = ['0', '0', '0', '0', '0', '0', '0', '0', '0']
let winner = "";

const modalText = document.querySelector(".modalBox");

function select(value){
    // 이미 할당된 경우
    if(cell[value].classList[1])
        return;

    if(winner != ""){
        console.log(winner);
        return;
    }
    
    const X = document.createTextNode("X");
    cell[value].classList.add("selected");
    cell[value].classList.add("player");
    cellStatus[value] = 'Player';
    cell[value].appendChild(X);

    wincheck("Player");
     
    if(winner == "Player")
        return;
    else{
        let check1 = 0;
        cell.forEach((value, index)=>{
            if(value.classList[1]){
                check1++;
            }                
        });
        if(check1 == 9){
            modalOpen("Draw");
            return;
        }
    }

    let a=0;

    while(1){
        a = Math.floor(Math.random() * 9);
        if(cell[a].classList[1]){
            let check2 = 0;
            cell.forEach((value, index)=>{
                if(value.classList[1]){
                    check2++;
                }                
            });
            if(check2 == 9)
                break;
            continue;
        }
        
        else{
            const O = document.createTextNode("O");
            cell[a].classList.add("selected");
            cell[a].classList.add("computer");
            cellStatus[a] = 'Computer';
            cell[a].appendChild(O);
            break;
        }
        
    }

    wincheck("Computer");
}

function reset(){
    cell.forEach((value, index) => {
        value.textContent = "";
        value.classList.remove("selected");
        value.classList.remove("player");
        value.classList.remove("computer");
    });

    winner = "";

    for(let a=0; a<9; a++){
        cellStatus[a] = '0';
    }
    const temp = document.getElementById("1");
}

function wincheck(user){
    winCondition = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    winCondition.forEach((value, index) => {
        let c1 = cellStatus[value[0]];
        let c2 = cellStatus[value[1]];
        let c3 = cellStatus[value[2]];
        if(c1 === "0" || c2 === "0" || c3 === "0")
            console.log("skip");
            
        else if(c1 == c2 && c2 == c3 && c1 == user){
            modalOpen(user);
            winner = user;
        }
    })
    console.log(cellStatus);
}

function modalOpen(user){
    const tmp = document.createTextNode(user);
    const modal = document.querySelector(".modal");
    const modalBox = document.querySelector(".modalBox");
    modal.classList.remove("hidden");
    if(user == "Draw"){
        modalBox.innerHTML = `${user} <br/><br/><button class="button-2" onclick="modalClose()">Close</button>`;
    }
    else{
        modalBox.innerHTML = `${user} win <br/><br/><button class="button-2" onclick="modalClose()">Close</button>`;
    }
    
}

function modalClose(){
    const modal = document.querySelector(".modal");
    const modalBox = document.querySelector(".modalBox");
    modal.classList.add("hidden");

    modalBox.innerHTML = `<button class="button-2" onclick="modalClose()">Close</button>`;
}