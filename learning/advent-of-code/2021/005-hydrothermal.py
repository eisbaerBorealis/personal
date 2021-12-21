import pathlib

# 1st guess: 

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-005.txt"

    debug = False
    success = False

    input = []

    width = 0

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        for line in fp:
            line = line.strip()
            pieces = line.split(' -> ')
            points = [[int(num) for num in piece.split(',')] for piece in pieces]
            if debug: print('debug: points is', points)
            input.append(points)
            maxNum = max(points[0][0], points[0][1], points[1][0], points[1][1]) + 1
            if maxNum > width:
                width = maxNum

        # print('debug: width is', width)

        success = True
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

    if success:
        if debug: print('debug: input is', input)

        map = []
        for i in range(width):
            map.append(['.'] * width)

        if debug: print('debug: map is', map)

        for points in input:
            if debug: print('debug: points is', points)
            if points[0][0] == points[1][0]:
                # x's match
                if debug: print('  debug: x\'s match')
                minY = min(points[0][1], points[1][1])
                maxY = max(points[0][1], points[1][1])
                x = points[0][0]
                # if debug: print('  debug: x is', x)
                for y in range(minY, maxY + 1):
                    # if debug: print('  debug: y is', y)
                    if map[y][x] == '.':
                        map[y][x] = 1
                    else:
                        map[y][x] += 1
            elif points[0][1] == points[1][1]:
                # y's match
                if debug: print('  debug: y\'s match')
                minY = min(points[0][0], points[1][0])
                maxY = max(points[0][0], points[1][0])
                y = points[0][1]
                # if debug: print('  debug: y is', y)
                for x in range(minY, maxY + 1):
                    # if debug: print('  debug: x is', x)
                    if map[y][x] == '.':
                        map[y][x] = 1
                    else:
                        map[y][x] += 1
            else:
                # diagonal
                if debug: print('  debug: diagonal line')
                if points[0][0] - points[1][0] == points[0][1] - points[1][1]:
                    # forward diagonal
                    if debug: print('    debug: forward diagonal line')
                    diff = points[1][0] - points[0][0]
                    if diff < 0:
                        points[0], points[1] = points[1], points[0]
                        diff *= -1
                    x = points[0][0]
                    y = points[0][1]
                    for i in range(diff + 1): # e.g. 0-8
                        x2 = x + i
                        y2 = y + i
                        if debug: print('      debug: forward diag, x2 is', x2, ' & y2 is', y2)
                        if map[y2][x2] == '.':
                            map[y2][x2] = 1
                        else:
                            map[y2][x2] += 1
                else:
                    if debug: print('    debug: backward diagonal line')
                    diff = points[1][0] - points[0][0]
                    if diff < 0:
                        points[0], points[1] = points[1], points[0]
                        diff *= -1
                    x = points[0][0]
                    y = points[0][1]
                    for i in range(diff + 1): # e.g. 0-8
                        x2 = x + i
                        y2 = y - i
                        if debug: print('      debug: backward diag, x2 is', x2, ' & y2 is', y2)
                        if map[y2][x2] == '.':
                            map[y2][x2] = 1
                        else:
                            map[y2][x2] += 1

        total = 0
        for y in range(width):
            for x in range(width):
                if not(map[y][x] == '.') and map[y][x] > 1:
                    total += 1

        if debug:
            print('  debug: map is')
            for y in range(width):
                for x in range(width):
                    if not(map[y][x] == '.'):
                        map[y][x] = str(map[y][x])
                print(''.join(map[y]))
        
        print('Answer:', total)

main()