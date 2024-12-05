import pathlib
import re

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-002.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        levels = []

        for line in fp:
            if line[-1] == "\n":
                line = line[:-1]
            line = [int(i) for i in line.split(" ")]
            levels.append(line)

        safeCount = 0
        toleratedSafeCount = 0

        for line in levels:
            safe = True
            toleratedSafe = False
            direction = None
            for i in range(len(line) - 1):
                diff = line[i+1] - line[i]
                if direction == None:
                    direction = diff
                else:
                    if direction * diff <= 0:
                        safe = False
                if abs(diff) == 0 or abs(diff) > 3:
                    safe = False
            if safe:
                safeCount += 1
                toleratedSafeCount += 1
            else:
                for j in range(len(line)):
                    newList = [lev for lev in line]
                    newList.pop(j)
                    tempSafe = True
                    direction = None
                    for k in range(len(newList) - 1):
                        diff = newList[k+1] - newList[k]
                        if direction == None:
                            direction = diff
                        else:
                            if direction * diff <= 0:
                                tempSafe = False
                        if abs(diff) == 0 or abs(diff) > 3:
                                tempSafe = False
                    if tempSafe:
                        toleratedSafeCount += 1
                        break

        print("part 1 solution:", safeCount)
        print("part 2 solution:", toleratedSafeCount)
        
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()