import pathlib
import re

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-006b.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        output = 0
        packetLen = 14

        gettingSteps = False
        for line in fp:
            # print(line)
            # print(len(line))

            for i in range(packetLen - 1, len(line) - 1):
                pairFound = False
                for j in range(i - packetLen + 1, i):
                    if pairFound:
                        break
                    for k in range(j + 1, i + 1):
                        # print(i,j,k)
                        if line[j] == line[k]:
                            # print("  Found pair")
                            pairFound = True
                if not pairFound:
                    output = i + 1
                    break
            
            print("output:", output)
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()