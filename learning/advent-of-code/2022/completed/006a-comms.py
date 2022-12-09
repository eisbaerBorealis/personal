import pathlib
import re

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-006b.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        output = 0

        gettingSteps = False
        for line in fp:
            print(line)
            print(len(line))

            for i in range(3, len(line)-1):
                if(line[i-3] != line [i-2] and
                   line[i-3] != line [i-1] and
                   line[i-3] != line [i-0] and
                   line[i-2] != line [i-1] and
                   line[i-2] != line [i-0] and
                   line[i-1] != line [i-0]
                ):
                    output = i + 1
                    break
            
        print("output:", output)
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()