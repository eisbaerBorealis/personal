import pathlib

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    # fileName = "input-003-sml.txt"
    fileName = "input-003.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        solution1 = 0
        solution2 = 0

        rowCount = 0
        for line in fp:
            rowCount += 1
            if line[-1] == "\n":
                line = line[:-1]
            highestNumI = 0
            i = 1
            while i < len(line) - 1:
                if line[i] > line[highestNumI]:
                    highestNumI = i
                i += 1
            
            highestNumI2 = highestNumI + 1
            i = highestNumI2 + 1
            while i < len(line):
                if line[i] > line[highestNumI2]:
                    highestNumI2 = i
                i += 1

            solution1 += int(line[highestNumI] + line[highestNumI2])

            nextBankValue = ""
            nextHighestI = -1
            for i in range(12): # 0-11
                nextHighestI += 1
                j = nextHighestI + 1
                while j <= len(line) - (12 - i):
                    if line[j] > line[nextHighestI]:
                        nextHighestI = j
                    j += 1
                nextBankValue += line[nextHighestI]
            solution2 += int(nextBankValue)

        print("part 1 solution:", solution1)
        print("part 2 solution:", solution2)
        
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()