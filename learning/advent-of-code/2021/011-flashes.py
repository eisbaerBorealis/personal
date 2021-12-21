import pathlib

# 1st guess: 

flashes = 0

def flash(map, y, x):
    h = len(map)
    l = len(map[0])

    global flashes
    flashes += 1
    map[y][x] = 1000

    upGood = y > 0
    downGood = y < h - 1
    leftGood = x > 0
    rightGood = x < l - 1

    if upGood:
        map[y-1][x] += 1
        newE = map[y-1][x]
        if newE > 9 and newE < 100:
            flash(map, y-1, x)
        if rightGood:
            map[y-1][x+1] += 1
            newE = map[y-1][x+1]
            if newE > 9 and newE < 100:
                flash(map, y-1, x+1)

    if rightGood:
        map[y][x+1] += 1
        newE = map[y][x+1]
        if newE > 9 and newE < 100:
            flash(map, y, x+1)
        if downGood:
            map[y+1][x+1] += 1
            newE = map[y+1][x+1]
            if newE > 9 and newE < 100:
                flash(map, y+1, x+1)

    if downGood:
        map[y+1][x] += 1
        newE = map[y+1][x]
        if newE > 9 and newE < 100:
            flash(map, y+1, x)
        if leftGood:
            map[y+1][x-1] += 1
            newE = map[y+1][x-1]
            if newE > 9 and newE < 100:
                flash(map, y+1, x-1)

    if leftGood:
        map[y][x-1] += 1
        newE = map[y][x-1]
        if newE > 9 and newE < 100:
            flash(map, y, x-1)
        if upGood:
            map[y-1][x-1] += 1
            newE = map[y-1][x-1]
            if newE > 9 and newE < 100:
                flash(map, y-1, x-1)

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-011.txt"

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

        h = len(input)
        l = len(input[0])
        # for i in range(100):
        step = 0
        syncFound = False
        while not syncFound:
            step += 1
            for y in range(h):
                for x in range(l):
                    input[y][x] += 1
                    if input[y][x] > 9 and input[y][x] < 100:
                        flash(input, y, x)

            allFlashed = True
            for y in range(h):
                for x in range(l):
                    if input[y][x] > 9:
                        input[y][x] = 0
                    else:
                        allFlashed = False

            syncFound = allFlashed

        # global flashes
        print('Answer:', step)

main()