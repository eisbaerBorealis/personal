import pathlib
import re

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-000.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        data = []
        visCount = 0

        for line in fp:
            if line[-1] == "\n":
                line = line[:-1]
            # data.append([int(i) for i in line])
            data.append(line)
        # print("trees:")
        for row in data:
            print(row)

        # for i in range(len(data)):
        
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()