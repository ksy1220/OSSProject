let board = [];

let score = 0;

document.onkeydown = keyDownEventHandler;
function keyDownEventHandler(e){
    switch(e.keyCode){
        case 38: 
            moveUp();
            console.log("up");
            break;
        case 40:
            moveDown(); 
            break;
        case 37: 
            moveLeft(); 
            break;
        case 39:
            moveRight(); 
            break;
    }
}

function init(){
    score = 0;
    for(let i=0; i<16; i++){
        board[i] = 0;
    }

    for(let i=0; i<2; i++){
        let tmp = Math.floor(Math.random()*16);
        console.log(tmp);
        let generate4 = Math.floor(Math.random()*10);
        if(board[tmp] != 0){
            i--; 
            continue;
        }
        if(generate4 >= 8)
            board[tmp] = 4;
        else{
            board[tmp] = 2;
        }
    }

    loadBoard();
}
init();

function loadBoard(){
    for(i=0; i<16; i++){
        let td = document.querySelector(`#cell${i}`);
        td.innerHTML = board[i] == 0 ? "" : board[i];
    }
    changeColor();
    let curScore = document.querySelector("#score");
    curScore.innerHTML = "score: " + score;
    
}

function moveUp(){
    let i, j;
    let isPlused = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let isMoved = false;

    //두번째 줄부터 위방향으로 차례로 이동
    for(i=1; i<4; i++){
        for(j=0; j<4; j++){
            //현재칸 0이면 스킵
            if(board[i*4 + j] == 0)
                continue;

            //동일열 윗줄 안빈칸 찾기
            var closeNonZero = i-1;
            while(closeNonZero > 0 && board[closeNonZero*4 + j] == 0)
                closeNonZero--;
            console.log(closeNonZero);

            //윗칸 비었으면 윗칸으로 옮기기
            if(board[closeNonZero*4 + j] == 0){
                board[closeNonZero*4 + j] = board[i*4 + j];
                board[i*4 + j] = 0;
                isMoved = true;
            }
            
            //윗칸 안비었고, 합칠 수 없을 때
            else if(board[closeNonZero*4 + j] != board[i*4 + j]){
                //바로 아랫칸이면 그냥 놔둠
                if(closeNonZero+1 == i) 
                    continue;

                //아니면 윗칸 아래로 바로 옮기기
                board[(closeNonZero+1)*4 + j] = board[i*4 + j];
                board[i*4 + j] = 0;
                isMoved = true;
            }

            //윗칸 안비었고, 합칠 수 있을 때
            else{
                //이미 합친 칸인지 확인
                //합친 칸이면 그냥 바로아래로 옮기기만
                if(isPlused[closeNonZero*4 + j] != 0){
                    board[(closeNonZero+1)*4 + j] = board[i*4 + j];
                    board[i*4 + j] = 0;
                    isMoved = true;
                }

                //안 합친 칸이면 합치고, 합친 판이라고 표시
                else{
                    board[closeNonZero*4 + j] *= 2;
                    score += board[i*4 + j];
                    board[i*4 + j] = 0;
                    isPlused[closeNonZero*4 + j] = 1;
                    isMoved = true;
                }
            }            
        }
    }

    // 움직였으면 새로 판에 숫자 생성하고, 안 움직였으면 더 못움직이는지 확인
    if(isMoved){
        while(1){
            let tmpLoc = Math.floor(Math.random()*16);
            if(board[tmpLoc] == 0){
                let generate4 = Math.floor(Math.random()*10);
                if(generate4 >= 8)
                    board[tmpLoc] = 4;
                else{
                    board[tmpLoc] = 2;
                }
                break;
            }
        }
        loadBoard();
        
    }
    else{
        checkGameOver();
    }

}

function moveDown(){
    let i, j;
    let isPlused = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let isMoved = false;

    //두번째 줄부터 아래방향으로 차례로 이동
    for(i=2; i>=0; i--){
        for(j=0; j<4; j++){
            //현재칸 0이면 스킵
            if(board[i*4 + j] == 0)
                continue;

            //동일열 아래줄 안빈칸 찾기
            var closeNonZero = i+1;
            while(closeNonZero < 3 && board[closeNonZero*4 + j] == 0)
                closeNonZero++;
            console.log(closeNonZero);

            //아래칸 비었으면 아래칸으로 옮기기
            if(board[closeNonZero*4 + j] == 0){
                board[closeNonZero*4 + j] = board[i*4 + j];
                board[i*4 + j] = 0;
                isMoved = true;
            }
            
            //아래칸 안비었고, 합칠 수 없을 때
            else if(board[closeNonZero*4 + j] != board[i*4 + j]){
                //바로 윗칸이면 그냥 놔둠
                if(closeNonZero-1 == i) 
                    continue;

                //아니면 아래칸 위로 바로 옮기기
                board[(closeNonZero-1)*4 + j] = board[i*4 + j];
                board[i*4 + j] = 0;
                isMoved = true;
            }

            //아래칸 안비었고, 합칠 수 있을 때
            else{
                //이미 합친 칸인지 확인
                //합친 칸이면 그냥 바로위로 옮기기만
                if(isPlused[closeNonZero*4 + j] != 0){
                    board[(closeNonZero-1)*4 + j] = board[i*4 + j];
                    board[i*4 + j] = 0;
                    isMoved = true;
                }

                //안 합친 칸이면 합치고, 합친 판이라고 표시
                else{
                    board[closeNonZero*4 + j] *= 2;
                    score += board[i*4 + j];
                    board[i*4 + j] = 0;
                    isPlused[closeNonZero*4 + j] = 1;
                    isMoved = true;
                }
            }            
        }
    }

    // 움직였으면 새로 판에 숫자 생성하고, 안 움직였으면 더 못움직이는지 확인
    if(isMoved){
        while(1){
            let tmpLoc = Math.floor(Math.random()*16);
            if(board[tmpLoc] == 0){
                let generate4 = Math.floor(Math.random()*10);
                if(generate4 >= 8)
                    board[tmpLoc] = 4;
                else{
                    board[tmpLoc] = 2;
                }
                break;
            }
        }
        loadBoard();
        
    }
    else{
        checkGameOver();
    }
}

function moveLeft(){
    let i, j;
    let isPlused = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let isMoved = false;

    //두번째 열부터 왼쪽방향으로 차례로 이동
    for(j=1; j<4; j++){
        for(i=0; i<4; i++){
            //현재칸 0이면 스킵
            if(board[i*4 + j] == 0)
                continue;

            //동일행 왼쪽열 안빈칸 찾기
            var closeNonZero = j-1;
            while(closeNonZero > 0 && board[i*4 + closeNonZero] == 0)
                closeNonZero--;
            console.log(closeNonZero);

            //왼칸 비었으면 왼칸으로 옮기기
            if(board[i*4 + closeNonZero] == 0){
                board[i*4 + closeNonZero] = board[i*4 + j];
                board[i*4 + j] = 0;
                isMoved = true;
            }
            
            //왼칸 안비었고, 합칠 수 없을 때
            else if(board[i*4 + closeNonZero] != board[i*4 + j]){
                //바로 오른칸이면 그냥 놔둠
                if(closeNonZero+1 == j) 
                    continue;

                //아니면 왼칸 오른쪽로 바로 옮기기
                board[i*4 + closeNonZero + 1] = board[i*4 + j];
                board[i*4 + j] = 0;
                isMoved = true;
            }

            //왼칸 안비었고, 합칠 수 있을 때
            else{
                //이미 합친 칸인지 확인
                //합친 칸이면 그냥 바로 오른쪽으로 옮기기만
                if(isPlused[i*4 + closeNonZero] != 0){
                    board[i*4 + closeNonZero + 1] = board[i*4 + j];
                    board[i*4 + j] = 0;
                    isMoved = true;
                }

                //안 합친 칸이면 합치고, 합친 판이라고 표시
                else{
                    board[i*4 + closeNonZero] *= 2;
                    score += board[i*4 + j];
                    board[i*4 + j] = 0;
                    isPlused[i*4 + closeNonZero] = 1;
                    isMoved = true;
                }
            }            
        }
    }

    // 움직였으면 새로 판에 숫자 생성하고, 안 움직였으면 더 못움직이는지 확인
    if(isMoved){
        while(1){
            let tmpLoc = Math.floor(Math.random()*16);
            if(board[tmpLoc] == 0){
                let generate4 = Math.floor(Math.random()*10);
                if(generate4 >= 8)
                    board[tmpLoc] = 4;
                else{
                    board[tmpLoc] = 2;
                }
                break;
            }
        }
        loadBoard();
        
    }
    else{
        checkGameOver();
    }
}

function moveRight(){
    let i, j;
    let isPlused = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let isMoved = false;

    //두번째 열부터 오른쪽방향으로 차례로 이동
    for(i=0; i<4; i++){
        for(j=2; j>=0; j--){
            //현재칸 0이면 스킵
            if(board[i*4 + j] == 0)
                continue;

            //동일행 오른쪽열 안빈칸 찾기
            var closeNonZero = j+1;
            while(closeNonZero < 3 && board[i*4 + closeNonZero] == 0)
                closeNonZero++;
            console.log("[" + i + ", " + j + "] , board: "+ board[i*4 + j] + ", "+ closeNonZero);

            //오른칸 비었으면 오른칸으로 옮기기
            if(board[i*4 + closeNonZero] == 0){
                board[i*4 + closeNonZero] = board[i*4 + j];
                board[i*4 + j] = 0;
                isMoved = true;
            }
            
            //오른칸 안비었고, 합칠 수 없을 때
            else if(board[i*4 + closeNonZero] != board[i*4 + j]){
                //바로 왼칸이면 그냥 놔둠
                if(closeNonZero - 1 == j) 
                    continue;

                //아니면 오른칸 왼쪽으로 바로 옮기기
                board[i*4 + closeNonZero - 1] = board[i*4 + j];
                board[i*4 + j] = 0;
                isMoved = true;
            }

            //오른칸 안비었고, 합칠 수 있을 때
            else{
                //이미 합친 칸인지 확인
                //합친 칸이면 그냥 바로 왼쪽으로 옮기기만
                if(isPlused[i*4 + closeNonZero] != 0){
                    board[i*4 + closeNonZero - 1] = board[i*4 + j];
                    board[i*4 + j] = 0;
                    isMoved = true;
                }

                //안 합친 칸이면 합치고, 합친 판이라고 표시
                else{
                    board[i*4 + closeNonZero] *= 2;
                    score += board[i*4 + j];
                    board[i*4 + j] = 0;
                    isPlused[i*4 + closeNonZero] = 1;
                    isMoved = true;
                }
            }            
        }
    }

    // 움직였으면 새로 판에 숫자 생성하고, 안 움직였으면 더 못움직이는지 확인
    if(isMoved){
        while(1){
            let tmpLoc = Math.floor(Math.random()*16);
            if(board[tmpLoc] == 0){
                let generate4 = Math.floor(Math.random()*10);
                if(generate4 >= 8)
                    board[tmpLoc] = 4;
                else{
                    board[tmpLoc] = 2;
                }
                break;
            }
        }
        loadBoard();
        
    }
    else{
        checkGameOver();
    }
}

function checkGameOver(){
    let i, j;
    //다른 방향으로 이동했을때 움직일수 있으면 게임오버 아님, 빈칸 있으면 게임오버 아님

    //빈칸 체크
    for(i=0 ; i<4; i++){
        for(j=0; j<4; j++){
            if(board[i*4 + j] == 0 )
                return;
        }
    }
    
    //먼저 좌우 이동 체크(인접한 숫자가 같으면 합칠 수 있음)
    for(i=0; i<4; i++){
        let rowCheck = board[i*4];
        for(j=1; j<4; j++){
            if(rowCheck == board[i*4 + j])
                return;
            else
                rowCheck = board[i*4 + j];
        }
    }
    for(j=0; j<4; j++){
        let colCheck = board[j];
        for(i=1; i<4; i++){
            if(colCheck == board[i*4 + j])
                return;
            else
                colCheck = board[i*4 + j];
        }
    }
    end();
}

function end(){
    
    maxScore = localStorage.getItem("2048Score")
    if(maxScore){
        if(parseInt(maxScore)  < score){
            localStorage.setItem("2048Score", score);
            maxScore = score;
        }
    }
    else{
        localStorage.setItem("2048Score", score);
        maxScore = score;
    }

    alert("Game over\nMax score: " + maxScore + "\nScore: " + score);
    init();
}

function changeColor(){
    
//색상
/*2-eee4da / 776e65
4-eee1c9 / 776e65
8-f3b27a / f9f6f2
16-f69664 / f9f6f2
32-f67c60 / f9f6f2
64-f65e3b / f9f6f2
128-edcf73 / f9f6f2
256-edcc62 / f9f6f2
512-edc850 / f9f6f2
1024-edc53f / f9f6f2
2048-edc22d / f9f6f2
*/   
    for(i=0; i<16; i++){
        let td = document.querySelector(`#cell${i}`);

        switch(board[i]){
            case 0: 
                td.style.background = "#cdc1b4";
                break;
            case 2:
                td.style.background = "#eee4da";
                td.style.color = "#776e65"
                break;
            case 4:
                td.style.background = "#eee1c9";
                td.style.color = "#776e65"
                break;
            case 8:
                td.style.background = "#f3b27a";
                td.style.color = "#776e65"
                break;
            case 16:
                td.style.background = "#f69664";
                td.style.color = "#f9f6f2"
                break;
            case 32:
                td.style.background = "#f67c60";
                td.style.color = "#f9f6f2"
                break;
            case 64:
                td.style.background = "#f65e3b";
                td.style.color = "#f9f6f2"
                break;
            case 128:
                td.style.background = "#edcf73";
                td.style.color = "#f9f6f2"
                break;
            case 256:
                td.style.background = "#edcc62";
                td.style.color = "#f9f6f2"
                break;
            case 512:
                td.style.background = "#edc850";
                td.style.color = "#f9f6f2"
                break;
            case 1024:
                td.style.background = "#edc53f";
                td.style.color = "#f9f6f25"
                break;
            default:
                td.style.background = "#edc22d";
                td.style.color = "#f9f6f2"
                break;
            
        }
    }

}