import pathlib

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-001b.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')
        currCount = 0
        maxCount = 0

        for line in fp:
            line = line.strip()
            if line == "":
                if maxCount < currCount:
                    maxCount = currCount
                currCount = 0
            else:
                currCount += int(line)
            # print("Line length of \"" + line + "\": " + str(len(line)))

        print('Max calories:', maxCount)
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()