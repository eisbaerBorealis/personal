import pathlib
import re

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-001.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        currPos = 50
        totalZeroes = 0
        totalZeroClicks = 0

        linenum = 0

        for line in fp:
            linenum += 1
            if line[-1] == "\n":
                line = line[:-1]
            dir = line[0]
            dist = int(line[1:])
            
            if dir == "L":
                if currPos == 0:
                    totalZeroClicks -= 1
                currPos -= dist
            elif dir == "R":
                currPos += dist
            else:
                print("  Error: invalid direction \"{0}\"".format(dir))
            
            while currPos < 0:
                currPos += 100
                totalZeroClicks += 1
            while currPos >= 100:
                currPos -= 100
                totalZeroClicks += 1

            if currPos == 0:
                totalZeroes += 1
                totalZeroClicks += 1
                if dir == "R":
                    totalZeroClicks -= 1

        print("part 1 solution:", totalZeroes)
        print("part 2 solution:", totalZeroClicks)
        
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()