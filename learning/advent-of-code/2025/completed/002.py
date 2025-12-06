import pathlib
import re

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    # fileName = "input-002-sml.txt"
    fileName = "input-002.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        invalidIDSum = 0
        invalidIDSum2 = 0
        ids = []

        rowCount = 0
        for line in fp:
            rowCount += 1
            if line[-1] == "\n":
                line = line[:-1]
            ids += line.split(',')

        ids = list(filter(None, ids))

        for id in ids:
            splitID = id.split('-')
            for n in range(int(splitID[0]), int(splitID[1]) + 1):
                n = str(n)
                if (len(n) % 2) == 0 and n == n[0:len(n) // 2] * 2:
                    invalidIDSum += int(n)
                for i in range(1, len(n) // 2 + 1):
                    if (len(n) % i) == 0:
                        if n == n[0:i] * (len(n) // i):
                            invalidIDSum2 += int(n)
                            break

        print("part 1 solution:", invalidIDSum)
        print("part 2 solution:", invalidIDSum2)
        
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()