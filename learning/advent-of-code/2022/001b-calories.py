import pathlib

# kinda sad, I need there to be two blank lines at the end of the input for it to work

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-001b.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')
        currCount = 0
        topA = 0
        topB = 0
        topC = 0

        for line in fp:
            line = line.strip()
            if line == "":
                if topA < currCount:
                    topC = topB
                    topB = topA
                    topA = currCount
                elif topB < currCount:
                    topC = topB
                    topB = currCount
                elif topC < currCount:
                    topC = currCount
                currCount = 0
            else:
                currCount += int(line)
            # print("    Line is: " + line)

        print("  topA is", topA)
        print("  topB is", topB)
        print("  topC is", topC)
        print('Max calories:', topA + topB + topC)
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()