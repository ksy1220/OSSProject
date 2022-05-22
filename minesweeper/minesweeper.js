let board = [];
let level;
let bombCnt = 0;
let gameEnd = 0;

let d = new Date();
let h = d.getHours();
let m = d.getMinutes();
let s = d.getSeconds();
let time
let timer;

let cellSize = 50;

document.body.setAttribute('oncontextmenu', "return false");

function init(level){
    gameEnd = 0;
    board = [];
    bombCnt = 0;
    let i, j;

    document.querySelector("#wrap").style.width = `${level * cellSize + 100}px`;

    for(i=0; i<level; i++){
        board.push([]);
        for(j=0; j<level; j++)
            board[i].push(0);
    }
    
    while(bombCnt < Math.floor(level*level / 10 )){
        let tmp = Math.floor(Math.random() * level * level);
        let x = Math.floor(tmp / level);
        let y = tmp % level;

        if(board[x][y] == 0){
            board[x][y] = -10;
            bombCnt++;
        }
        
    }
    

    boardFill(level);

    let htmlString = "<table>";
    for(i=0; i<level; i++){
        htmlString += "<tr>"
        for(j=0; j<level; j++){
            htmlString += `<td id='cell${i}-${j}' onclick='check(${i}, ${j}, ${level})' onauxclick='rc(${i}, ${j}, ${level})'></td>`;
        }
        htmlString += "</tr>"
    }
    time = document.querySelector("#time");
    time.style.display = "block";
    d = new Date();
    h = d.getHours();
    m = d.getMinutes();
    s = d.getSeconds();
    timeRelease(time);

    let container = document.querySelector("#container");
    container.innerHTML = htmlString;

    console.log(board);
}

function boardFill(level){
    let i, j;
    for(i=0; i<level; i++){
        for(j=0; j<level; j++){
            if(board[i][j] < 0){
                if(i-1 >= 0){
                    if(j-1 >= 0)
                        board[i-1][j-1]++;
                    board[i-1][j]++;
                    if(j+1 < level)
                        board[i-1][j+1]++;
                }
                if(i+1 < level){
                    if(j-1 >= 0)
                        board[i+1][j-1]++;
                    board[i+1][j]++;
                    if(j+1 < level)
                        board[i+1][j+1]++;
                }
                if(j-1 >= 0)
                    board[i][j-1]++;
                if(j+1 < level)
                    board[i][j+1]++;            
            }
        }
    }
}

function check(i, j, level){
    if(gameEnd == 1)
        return;
    if(board[i][j] < 0){
        gameEnd = 1;    
    
        alert("Game over");
        update(level);
        for(i=0; i<level; i++){
            for(j=0; j<level; j++){
                let cell = document.querySelector(`#cell${i}-${j}`);
                if(board[i][j] < 0){
                    cell.innerHTML = "<img src='mines.png'></img>"
                }
            }
        }
    }
    else{
        let cell = document.querySelector(`#cell${i}-${j}`);
        cell.classList.add("clicked");
        if(board[i][j] == 0)
            revealEmpty(i, j, level);
        
        update(level);
        checkwin(level);
        
    }
}


function checkwin(level){
    let i, j, cnt = 0;
    for(i=0; i<level; i++){
        for(j=0; j<level; j++){
            let cell = document.querySelector(`#cell${i}-${j}`);
            if(board[i][j] < 0){
                cnt++;
            }
            else if(cell.classList.contains('clicked')){
                cnt++;
            }
        }
    }

    if(cnt == level*level){
        let td = new Date();
        let th = td.getHours();
        let tm = td.getMinutes();
        let ts = td.getSeconds();
        let totalSec = (th-h)*3600 + (tm-m)*60 + (ts-s);
        maxScore = localStorage.getItem(`maxScore${level}`);
        if(maxScore){
            if(parseInt(maxScore) > totalSec){
                localStorage.setItem(`maxScore${level}`, totalSec);
                maxScore = totalSec;    
            }
        }
        else{
            localStorage.setItem(`maxScore${level}`, totalSec);
            maxScore = totalSec;
        }
        alert("You win!\nMax score: " + maxScore + "\nScore: " + totalSec);
        init(level);
    }
        
}

function update(level){
    let i, j;
    for(i=0; i<level; i++){
        for(j=0; j<level; j++){
            let cell = document.querySelector(`#cell${i}-${j}`);
            
            if(cell.classList.contains('clicked')){
                cell.innerHTML = board[i][j] == 0 ? "" : board[i][j];
                if(board[i][j] == 2){
                    cell.style.color = 'blue'
                }
                else if(board[i][j] == 3){
                    cell.style.color = 'green'
                }
                else if(board[i][j] > 3){
                    cell.style.color = 'red'
                }
            }
            else if(cell.classList.contains("rclicked")){
                cell.innerHTML = "<img src='flag.png'></img>"
            }
            else{
                cell.innerHTML = "";
            }
            
        }
    }   
}

function revealEmpty(i, j, level){
    let k, l;
    let cell = document.querySelector(`#cell${i}-${j}`);
    cell.classList.add('clicked');
    if(board[i][j] != 0){
        return;
    }

    for(k=i-1; k<=i+1; k++){
        for(l=j-1; l<=j+1; l++){
            if(k < 0 || k >= level || l < 0 || l >= level){
                continue;
            }
            if(k==i && l==j)
                continue;
            let tmpCell = document.querySelector(`#cell${k}-${l}`);
            if(board[k][l] >= 0 && !tmpCell.classList.contains('clicked')){
                revealEmpty(k, l, level)
            }
        }
    }
}


function timeRelease(time){    
    let td = new Date();
    let th = td.getHours();
    let tm = td.getMinutes();
    let ts = td.getSeconds();
    let totalSec = (th-h)*3600 + (tm-m)*60 + (ts-s);
    time.innerHTML = "Score: " + totalSec;
    timer = setTimeout(timeRelease, 1000, time)
}

function rc(i, j, level){
    let cell = document.querySelector(`#cell${i}-${j}`);
    if(cell.classList.contains("rclicked")){
        cell.classList.remove("rclicked");
    }
    else
        cell.classList.add("rclicked");
    update(level);
}

