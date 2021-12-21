import pathlib

# 1st guess: 

def isWinner(board):
    won = False

    for i in range(5):
        hor = 0
        ver = 0
        for j in range(5):
            if board[i][j] == 'X':
                hor += 1
            if board[j][i] == 'X':
                ver += 1
        if hor == 5:
            won = True
            print('debug: found horizontal win')
        if ver == 5:
            won = True
            print('debug: found vertical win')

    return won

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-004.txt"

    debug = False
    success = False

    calls = []
    boards = []

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        tempBoard = []
        for line in fp:
            line = line.strip()

            if calls == []:
                calls = [int(num) for num in line.split(',')]
                if debug: print('debug: calls is', calls)
            elif line == '':
                if debug: print('  debug: empty line')
                if not(tempBoard == []):
                    boards.append(tempBoard)
                    tempBoard = []
            else:
                boardLine = [int(num) for num in line.split()]
                if debug: print('debug: boardLine is', boardLine)
                tempBoard.append(boardLine)
        if not(tempBoard == []):
            boards.append(tempBoard)
        success = True
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

    if success:
        if debug: print('debug: len(boards) is', len(boards))
        if debug:
            print('   debug: boards is...')
            for board in boards:
                print('     debug: board is...')
                for row in board:
                    print('     ', row)
        
        winner = -1
        call = 0
        while winner == -1:
            if debug: print('debug: calls[call] is', calls[call])
            winnerList = []
            for i in range(len(boards)):
                if i < len(boards):
                    board = boards[i]
                    for y in range(5):
                        for x in range(5):
                            if board[y][x] == calls[call]:
                                
                                board[y][x] = 'X'
                    if isWinner(board):
                        if len(boards) == 1:
                            winner = 0
                            if debug: print('debug: last winner found')
                            call -= 1
                        else:
                            winnerList.insert(0, i)
            for i in range(len(winnerList)):
                if debug: print('debug: deletion, i is', i)
                if debug: print('debug: deletion, winnerList[i] is', winnerList[i])
                del boards[winnerList[i]]
            call += 1
        
        score = 0
        winBoard = boards[winner]
        for y in range(5):
            for x in range(5):
                if not (winBoard[y][x] == 'X'):
                    score += winBoard[y][x]
        
        if debug: print('debug: prescore is', score)

        if debug:
            print('   debug: boards is...')
            for board in boards:
                print('     debug: board is...')
                for row in board:
                    print('     ', row)

        score *= calls[call]
        print('Answer:', score)

main()