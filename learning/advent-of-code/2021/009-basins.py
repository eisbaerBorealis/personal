import pathlib

# 1st guess: 1557

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-009.txt"

    debug = True
    success = False

    input = []

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        for line in fp:
            line = line.strip()
            input.append([int(num) for num in line])

        success = True
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

    if success:
        # if debug: print('debug: input is', input)
        # if debug:
        #     print('~~debug: input:')
        #     for row in input:
        #         print(''.join([str(num) for num in row]))

        h = len(input)
        l = len(input[0])

        lowPoints = []
        riskTotal = 0

        for i in range(h):
            for j in range(l):
                isLow = True
                val = input[i][j]

                if i > 0 and input[i-1][j] <= val:
                    isLow = False
                if j > 0 and input[i][j-1] <= val:
                    isLow = False
                if i < h-1 and input[i+1][j] <= val:
                    isLow = False
                if j < l-1 and input[i][j+1] <= val:
                    isLow = False

                if isLow:
                    lowPoints.append((i, j))
                    riskTotal += val + 1
        
        topBasins = []
        # basinSizes = []
        for low in lowPoints:
            tempBasin = []
            tempRow = '.' * l
            for i in range(h):
                tempBasin.append([char for char in tempRow])

            # if debug: print('debug: low is', low)
            basinSize = 1
            tempBasin[low[0]][low[1]] = 'X'
            tempSpots = [(low[0], low[1])]

            while len(tempSpots) > 0:
                y = tempSpots[0][0]
                x = tempSpots[0][1]

                if y > 0 and tempBasin[y-1][x] == '.' and input[y-1][x] < 9:
                    tempBasin[y-1][x] = 'X'
                    tempSpots.append((y-1, x))
                    basinSize += 1
                if x > 0 and tempBasin[y][x-1] == '.' and input[y][x-1] < 9:
                    tempBasin[y][x-1] = 'X'
                    tempSpots.append((y, x-1))
                    basinSize += 1
                if y < h-1 and tempBasin[y+1][x] == '.' and input[y+1][x] < 9:
                    tempBasin[y+1][x] = 'X'
                    tempSpots.append((y+1, x))
                    basinSize += 1
                if x < l-1 and tempBasin[y][x+1] == '.' and input[y][x+1] < 9:
                    tempBasin[y][x+1] = 'X'
                    tempSpots.append((y, x+1))
                    basinSize += 1

                # tempSpots.remove(0)
                del tempSpots[0]

            topBasins.append(basinSize)
            if debug: print('debug: added', basinSize, 'to topBasins')

            while len(topBasins) > 3:
                topBasins.remove(min(topBasins))

            # if debug:
            #     print('debug: low is', low)
            #     print('~~debug: tempBasin:')
            #     for row in tempBasin:
            #         print(''.join(row))

        # if debug: print('debug: lowPoints is', lowPoints)
        if debug: print('debug: topBasins is', topBasins)
        
        print('Answer:', topBasins[0] * topBasins[1] * topBasins[2])

main()