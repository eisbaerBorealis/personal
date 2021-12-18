import pathlib

# 1st guess: 2990

def getFullMap(map):
    fullMap = []
    for line in map:
        fullMap.append([num for num in line])
    
    h = len(map)
    l = len(map[0])

    # for i in range(8):
    for i in range(4):
        # if i < 4: # 0-3
            for j in range(h):
                newLine = [(num % 9) + 1 for num in fullMap[i * h + j]]
                fullMap.append([num for num in newLine])
                for k in range(i + 1): # 0-(0-3)
                    fullMap[k * h + j] += [num for num in newLine]
        # else: # 4-7
        #     pass

    for i in range(4):
        for j in range(h):
            newLine = [(num % 9) + 1 for num in fullMap[4 * h + j][0-l:]]
            fullMap[4 * h + j] += [num for num in newLine]
            for k in range(3 - i): # 0-(3-0)
                fullMap[(k + 1 + i) * h + j] += [num for num in newLine]

    return fullMap

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-015.txt"

    debug = False
    success = False

    map = []

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        for line in fp:
            line = line.strip()
            map.append([int(num) for num in line])

        success = True
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

    if success:
        # print('debug: old map was', len(map), 'x', len(map[0]))
        map = getFullMap(map)
        if debug:
            print('debug: map is')
            for line in map:
                print(' ', ''.join([str(num) for num in line]))
        
        # debugLengths = []
        # for line in map:
        #     debugLengths.append(len(line))
        # print('debug: debugLengths is', debugLengths)

        # print('debug: new map is', len(map), 'x', len(map[0]))
        # risk = 0
        
        h = len(map)
        l = len(map[0])

        riskMap = []
        for x in range(h):
            riskMap.append(['.' for x in range(l)])
        
        # if debug:
        #     print('debug: riskMap is')
        #     for line in riskMap:
        #         print(' ', ''.join([str(num) for num in line]))

        # riskMap[0][0] = map[0][0]
        riskMap[0][0] = 0

        # coords = [(0,0)]
        coords = [(0,1), (1,0)]

        while len(coords) > 0:
            y = coords[0][0]
            x = coords[0][1]

            min = -1
            if x > 0:
                if riskMap[y][x-1] == '.':
                    if not ((y, x-1) in coords):
                        coords.append((y, x-1))
                else:
                    newVal = riskMap[y][x-1]
                    if min == -1 or min > newVal:
                        min = newVal
            if x < l - 1:
                if riskMap[y][x+1] == '.':
                    if not ((y, x+1) in coords):
                        coords.append((y, x+1))
                else:
                    newVal = riskMap[y][x+1]
                    if min == -1 or min > newVal:
                        min = newVal
            if y > 0:
                if riskMap[y-1][x] == '.':
                    if not ((y-1, x) in coords):
                        coords.append((y-1, x))
                else:
                    newVal = riskMap[y-1][x]
                    if min == -1 or min > newVal:
                        min = newVal
            if y < h - 1:
                if riskMap[y+1][x] == '.':
                    if not ((y+1, x) in coords):
                        coords.append((y+1, x))
                else:
                    newVal = riskMap[y+1][x]
                    if min == -1 or min > newVal:
                        min = newVal
            
            riskMap[y][x] = map[y][x] + min
            
            del coords[0]

        changes = 1
        while changes > 0:
            changes = 0

            for y in range(h):
                for x in range(l):
                    risk = map[y][x]
                    min = riskMap[y][x]
                    if x > 0:
                        tempRisk = riskMap[y][x-1] + risk
                        if min > tempRisk:
                            min = tempRisk
                            changes += 1
                    if x < l - 1:
                        tempRisk = riskMap[y][x+1] + risk
                        if min > tempRisk:
                            min = tempRisk
                            changes += 1
                        # if x == 3 and y == 3: print('debug: tempRisk is', tempRisk, 'and min is', min)
                    if y > 0:
                        tempRisk = riskMap[y-1][x] + risk
                        if min > tempRisk:
                            min = tempRisk
                            changes += 1
                    if y < h - 1:
                        tempRisk = riskMap[y+1][x] + risk
                        if min > tempRisk:
                            min = tempRisk
                            changes += 1
                    if min < riskMap[y][x]:
                        riskMap[y][x] = min
            print(changes, 'changes this round')
        
        if debug:
            print('debug: riskMap is')
            for line in riskMap:
                print(' ', line)

        # if debug: print('debug: len(coords) is', len(coords))
        
        print('Answer:', riskMap[-1][-1])

main()