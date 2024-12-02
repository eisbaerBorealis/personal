import pathlib
import re

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-001.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        firstNums = []
        secondNums = []

        for line in fp:
            if line[-1] == "\n":
                line = line[:-1]
            line = [int(i) for i in line.split("  ")]
            firstNums.append(line[0])
            secondNums.append(line[1])

        totalDist = 0
        totalSim = 0

        firstNums = sorted(firstNums, key=int)
        secondNums = sorted(secondNums, key=int)

        for i in range(len(firstNums)):
            totalDist += abs(firstNums[i] - secondNums[i])
            totalSim += firstNums[i] * secondNums.count(firstNums[i])

        print("part 1 solution:", totalDist)
        print("part 2 solution:", totalSim)
        
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()