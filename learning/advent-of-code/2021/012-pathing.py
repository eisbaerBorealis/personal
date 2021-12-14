import pathlib
import re

# 1st guess: 

mapkey = {}
paths = []

def pathIsFast(path):
    isFast = True
    # "Is fast" is a bad name, probably.
    # this shows whether there is a duplicate small cave
    for cave in path:
        if cave == 'start' or cave == 'end':
            pass
        elif re.search('[a-z]+', cave):
            # e.g., cave == 'a'
            if len([char for char in path if char == cave]) > 1:
                # if isFast: print('    debug, isFast is now False')
                isFast = False

    return isFast

def getPathes(path):
    # path is ['start']
    global mapkey
    for option in mapkey[path[-1]]:
        # options are 'A' and 'b' and will eventually be 'end'
        newPath = [cave for cave in path]
        # print('debug: newPath is', newPath)
        if option == 'end':
            global paths
            newPath.append(option)
            paths.append(newPath)
        elif option == 'start':
            pass
        else:
            if re.search('[A-Z]+', option):
                newPath.append(option)
                getPathes(newPath)
            elif re.search('[a-z]+', option) and (pathIsFast(newPath) or not (option in newPath)):
                newPath.append(option)
                getPathes(newPath)
            # elif re.search('[a-z]+', option):
            #     testPath = [cave for cave in newPath]
            #     testPath.append(option)
            #     if pathIsFast(testPath) or not (option in newPath):
            #         getPathes(testPath)

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-012.txt"

    debug = True
    success = False

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        global mapkey

        for line in fp:
            line = line.strip()
            # input = [int(num) for num in line.split(',')]
            pieces = line.split('-')
            # input.append(line.split('-'))
            if not (pieces[0] in mapkey):
                mapkey[pieces[0]] = []
            if not (pieces[1] in mapkey):
                mapkey[pieces[1]] = []

            mapkey[pieces[0]].append(pieces[1])
            mapkey[pieces[1]].append(pieces[0])

        success = True
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

    if success:
        if debug: print('debug: mapkey is', mapkey)

        getPathes(['start'])

        global paths
        paths.sort()
        # if debug:
        #     print('debug: paths are')
        #     for path in paths:
        #         print(','.join(path))
        
        print('Answer:', len(paths))

main()