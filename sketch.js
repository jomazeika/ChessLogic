function setup() {
    createCanvas(640, 640);
}

function drawLine(cell1x, cell1y, cell2x, cell2y)
{
    line(80*cell1x+40,80*cell1y+40,80*cell2x+40,80*cell2y+40);
    var theta = atan((cell1x-cell2x)/(cell1y-cell2y));
    line(80*cell1x+40-(2*cos(theta)),80*cell1y+40+(2*sin(theta)),80*cell2x+40,80*cell2y+40);
    line(80*cell1x+40+(2*cos(theta)),80*cell1y+40-(2*sin(theta)),80*cell2x+40,80*cell2y+40);
}

function isValidCell(x,y)
{
    return (x >= 0) && (x < 8) && (y >= 0) && (y < 8);
}

function containsAlly(board,x,y,color)
{
    if (isValidCell(x,y))
    {
        return (board[y][x] != null) && (board[y][x].color == color);
    }
    else {
      {
        return false;
      }
    }
}

function containsEnemy(board,x,y,color)
{
    if (isValidCell(x,y))
    {
        return (board[y][x] != null) && (board[y][x].color != color);
    }
    else {
      {
        return false;
      }
    }
}

function getThreatLocs(board,cellx,celly)
{
    piece = board[celly][cellx];
    if( piece == null) {return null;}
    outs = null;
    if (piece.type == 'p')
    {
        outs = [];
        y_target = (piece.color == 'w') ? celly+1 : celly-1
        containsEnemy(board,cellx+1,y_target,piece.color) ? outs.push([cellx+1,y_target]) : outs;
        containsEnemy(board,cellx-1,y_target,piece.color) ? outs.push([cellx-1,y_target]) : outs;
    }
    else if(piece.type == "q")
    {
        //gotta test the diagonals
        directions = [[1,0],[0,-1],[0,1],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]];
        outs = [];
        for (var i = 0; i < directions.length; i++)
        {
            var offSet = 0;
            var foundTarget = false;
            var dx = directions[i][0];
            var dy = directions[i][1];
            while(isValidCell(cellx+dx*offSet,celly+dy*offSet) & !foundTarget)
            {
                offSet += 1;
                if(containsEnemy(board,cellx+dx*offSet,celly+dy*offSet,piece.color))
                {
                    outs.push([cellx+dx*offSet,celly+dy*offSet]);
                    foundTarget = true;
                }
                if( containsAlly(board,cellx+dx*offSet,celly+dy*offSet,piece.color))
                {
                    foundTarget = true;
                }
            }
        }
    }
    else if(piece.type == "k")
    {
          outs = [];
          toTest = [[cellx+1,celly+1],[cellx-1,celly+1],[cellx+1,celly-1],[cellx-1,celly-1],[cellx,celly+1],[cellx,celly+1],[cellx+1,celly],[cellx-1,celly]]
          for (var i = 0; i < toTest.length; i++)
          {
              containsEnemy(board,toTest[i][0],toTest[i][1],piece.color) ? outs.push([toTest[i][0],toTest[i][1]]) : outs;
          }
    }
    else if(piece.type == "n")
    {
        outs = [];
        toTest = [[cellx+1,celly+2],[cellx-1,celly+2],[cellx+1,celly-2],[cellx-1,celly-2],[cellx+2,celly+1],[cellx-2,celly+1],[cellx+2,celly-1],[cellx-2,celly-1]]
        for (var i = 0; i < toTest.length; i++)
        {
            containsEnemy(board,toTest[i][0],toTest[i][1],piece.color) ? outs.push([toTest[i][0],toTest[i][1]]) : outs;
        }
    }
    else if(piece.type == "b")
    {
        //gotta test the diagonals
        directions = [[1,1],[1,-1],[-1,1],[-1,-1]];
        outs = [];
        for (var i = 0; i < directions.length; i++)
        {
            var offSet = 0;
            var foundTarget = false;
            var dx = directions[i][0];
            var dy = directions[i][1];
            while(isValidCell(cellx+dx*offSet,celly+dy*offSet) & !foundTarget)
            {
                offSet += 1;
                if( containsEnemy(board,cellx+dx*offSet,celly+dy*offSet,piece.color))
                {
                    outs.push([cellx+dx*offSet,celly+dy*offSet]);
                    foundTarget = true;
                }
                if( containsAlly(board,cellx+dx*offSet,celly+dy*offSet,piece.color))
                {
                    foundTarget = true;
                }
            }
        }
    }
    else if(piece.type == "r")
    {
        //gotta test the diagonals
        directions = [[1,0],[0,-1],[0,1],[-1,0]];
        outs = [];
        for (var i = 0; i < directions.length; i++)
        {
            var offSet = 0;
            var foundTarget = false;
            var dx = directions[i][0];
            var dy = directions[i][1];
            while(isValidCell(cellx+dx*offSet,celly+dy*offSet) & !foundTarget)
            {
                offSet += 1;
                if( containsEnemy(board,cellx+dx*offSet,celly+dy*offSet,piece.color))
                {
                    outs.push([cellx+dx*offSet,celly+dy*offSet]);
                    foundTarget = true;
                }
                if( containsAlly(board,cellx+dx*offSet,celly+dy*offSet,piece.color))
                {
                    foundTarget = true;
                }
            }
        }
    }
    return outs;
}

function getSupportLocs(board,cellx,celly)
{
    piece = board[celly][cellx];
    if( piece == null) {return null;}
    outs = null;
    if (piece.type == 'p')
    {
        outs = [];
        y_target = (piece.color == 'w') ? celly+1 : celly-1
        containsAlly(board,cellx+1,y_target,piece.color) ? outs.push([cellx+1,y_target]) : outs;
        containsAlly(board,cellx-1,y_target,piece.color) ? outs.push([cellx-1,y_target]) : outs;
    }
    else if(piece.type == "q")
    {
        //gotta test the diagonals
        directions = [[1,0],[0,-1],[0,1],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]];
        outs = [];
        for (var i = 0; i < directions.length; i++)
        {
            var offSet = 0;
            var foundTarget = false;
            var dx = directions[i][0];
            var dy = directions[i][1];
            while(isValidCell(cellx+dx*offSet,celly+dy*offSet) & !foundTarget)
            {
                offSet += 1;
                if(containsAlly(board,cellx+dx*offSet,celly+dy*offSet,piece.color))
                {
                    outs.push([cellx+dx*offSet,celly+dy*offSet]);
                    foundTarget = true;
                }
                if( containsEnemy(board,cellx+dx*offSet,celly+dy*offSet,piece.color))
                {
                    foundTarget = true;
                }
            }
        }
    }
    else if(piece.type == "k")
    {
          outs = [];
          toTest = [[cellx+1,celly+1],[cellx-1,celly+1],[cellx+1,celly-1],[cellx-1,celly-1],[cellx,celly+1],[cellx,celly+1],[cellx+1,celly],[cellx-1,celly]]
          for (var i = 0; i < toTest.length; i++)
          {
              containsAlly(board,toTest[i][0],toTest[i][1],piece.color) ? outs.push([toTest[i][0],toTest[i][1]]) : outs;
          }
    }
    else if(piece.type == "n")
    {
        outs = [];
        toTest = [[cellx+1,celly+2],[cellx-1,celly+2],[cellx+1,celly-2],[cellx-1,celly-2],[cellx+2,celly+1],[cellx-2,celly+1],[cellx+2,celly-1],[cellx-2,celly-1]]
        for (var i = 0; i < toTest.length; i++)
        {
            containsAlly(board,toTest[i][0],toTest[i][1],piece.color) ? outs.push([toTest[i][0],toTest[i][1]]) : outs;
        }
    }
    else if(piece.type == "b")
    {
        //gotta test the diagonals
        directions = [[1,1],[1,-1],[-1,1],[-1,-1]];
        outs = [];
        for (var i = 0; i < directions.length; i++)
        {
            var offSet = 0;
            var foundTarget = false;
            var dx = directions[i][0];
            var dy = directions[i][1];
            while(isValidCell(cellx+dx*offSet,celly+dy*offSet) & !foundTarget)
            {
                offSet += 1;
                if( containsAlly(board,cellx+dx*offSet,celly+dy*offSet,piece.color))
                {
                    outs.push([cellx+dx*offSet,celly+dy*offSet]);
                    foundTarget = true;
                }
                if( containsEnemy(board,cellx+dx*offSet,celly+dy*offSet,piece.color))
                {
                    foundTarget = true;
                }
            }
        }
    }
    else if(piece.type == "r")
    {
        //gotta test the diagonals
        directions = [[1,0],[0,-1],[0,1],[-1,0]];
        outs = [];
        for (var i = 0; i < directions.length; i++)
        {
            var offSet = 0;
            var foundTarget = false;
            var dx = directions[i][0];
            var dy = directions[i][1];
            while(isValidCell(cellx+dx*offSet,celly+dy*offSet) & !foundTarget)
            {
                offSet += 1;
                if( containsAlly(board,cellx+dx*offSet,celly+dy*offSet,piece.color))
                {
                    outs.push([cellx+dx*offSet,celly+dy*offSet]);
                    foundTarget = true;
                }
                if( containsEnemy(board,cellx+dx*offSet,celly+dy*offSet,piece.color))
                {
                    foundTarget = true;
                }
            }
        }
    }
    return outs;
}

function drawDetailedBoard(board)
{
    for(var i = 0; i < 8; i++)
    {
        for(var j = 0; j < 8; j++)
        {
            if(board[j][i] != null)
            {
                if(board[j][i].type == "p")
                {
                    fill(0,255,0);
                }
                else if(board[j][i].type == "q")
                {
                    fill(0,0,255);
                }
                else if(board[j][i].type == "r")
                {
                    fill(255,0,255);
                }
                else if(board[j][i].type == "b")
                {
                    fill(0,255,255);
                }
                else if(board[j][i].type == "k")
                {
                    fill(255,255,0);
                }
                else
                {
                    fill(255,0,0);
                }
                if (board[j][i].color == "w")
                {
                    ellipse(80*i+40,80*j+40, 20, 20);
                }
                else
                {
                    rect(80*i+30,80*j+30, 20, 20);
                }
            }
            else
            {
                fill(0,0,0);
                ellipse(80*i+40,80*j+40, 20, 20);
            }
        }
    }
}

function drawBoard(board)
{
    for(var i = 0; i < 8; i++)
    {
        for(var j = 0; j < 8; j++)
        {
            if(board[j][i] != null)
            {
                if (board[j][i].color == "w")
                {
                    fill(255,255,255);
                    ellipse(80*i+40,80*j+40, 10, 10);
                }
                else
                {
                    fill(0,0,0);
                    ellipse(80*i+40,80*j+40, 10, 10);
                }
            }
            else
            {
                fill(0,0,0);
                ellipse(80*i+40,80*j+40, 2, 2);
            }
        }
    }
}

function drawSupport(board)
{
    for (var i =0; i < board.length;i++)
    {
        for (var j = 0; j < board[i].length;j++)
        {
            var toDraw = getThreatLocs(board,j,i);
            if( toDraw != null)
            {
                for (var d = 0; d < toDraw.length; d++)
                {
                    stroke(150,0,0);
                    strokeWeight(2);
                    drawLine(j,i,toDraw[d][0],toDraw[d][1]);
                }
            }
        }
    }
}

function drawThreat(board)
{
    for (var i =0; i < board.length;i++)
    {
        for (var j = 0; j < board[i].length;j++)
        {
            var toDraw = getSupportLocs(board,j,i);
            if( toDraw != null)
            {
                for (var d = 0; d < toDraw.length; d++)
                {
                    stroke(0,150,0);
                    strokeWeight(2);
                    drawLine(j,i,toDraw[d][0],toDraw[d][1]);
                }
            }
        }
    }
}

function draw() {
   background(200);
    board = buildBoard(chess);
    drawSupport(board);
    drawThreat(board);
    noStroke();
    drawBoard(board);
}

function squareToArray(square)
{
    //Input: 'a1' -> 'h8'
    var col = square.charCodeAt(0) - 97; //Gets the ASCII value of the column letter
    var row = parseInt(square[1]) - 1; //Takes the row number
    return([row,col]);
}

function mouseClicked()
{
  var moves = chess.moves();
  var move = moves[Math.floor(Math.random() * moves.length)];
  chess.move(move);
}

function buildBoard(game)
{
    board = []
    for (var i = 0; i < 8; i++)
    {
        board[i] = Array(8);
    }
    for (var i = 0; i < game.SQUARES.length; i++)
    {
        curSquare = game.SQUARES[i];
        index = squareToArray(curSquare);
        board[index[0]][index[1]] = game.get(curSquare);
    }
    return board;
}

var chess = new Chess();

console.log(chess);

console.log(buildBoard(chess));

gameSample = ['[Event "Casual Game"]',
       '[Site "Berlin GER"]',
       '[Date "1852.??.??"]',
       '[EventDate "?"]',
       '[Round "?"]',
       '[Result "1-0"]',
       '[White "Adolf Anderssen"]',
       '[Black "Jean Dufresne"]',
       '[ECO "C52"]',
       '[WhiteElo "?"]',
       '[BlackElo "?"]',
       '[PlyCount "47"]',
       '',
       '1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.b4 Bxb4 5.c3 Ba5 6.d4 exd4 7.O-O',
       'd3 8.Qb3 Qf6 9.e5 Qg6 10.Re1 Nge7 11.Ba3 b5 12.Qxb5 Rb8 13.Qa4',
       'Bb6 14.Nbd2 Bb7 15.Ne4 Qf5 16.Bxd3 Qh5 17.Nf6+ gxf6 18.exf6',
       'Rg8 19.Rad1 Qxf3 20.Rxe7+ Nxe7 21.Qxd7+ Kxd7 22.Bf5+ Ke8',
       '23.Bd7+ Kf8 24.Bxe7# 1-0'].join('\n');

/*while (!chess.game_over()) {
  var moves = chess.moves();
  var move = moves[Math.floor(Math.random() * moves.length)];
  chess.move(move);
}
console.log(chess.pgn());*/
