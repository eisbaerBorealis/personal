import pathlib

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-003b.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')
        prioritySum = 0

        for line in fp:
            line = line.strip()
            # print("Checking", line)

            halfLen = len(line) // 2
            found = False
            for i in range(halfLen):
                if found: break
                for j in range(halfLen):
                    if found: break
                    # print("  comparing", line[i], "and", line[j + halfLen])
                    if line[i] == line[j + halfLen]:
                        # print("    Found", line[i])
                        charCode = ord(line[i])
                        # print("      ord() is", charCode)
                        if charCode > 96:
                            prioritySum += charCode - 96
                        else:
                            prioritySum += charCode - 38
                        found = True
            # break

        print('Priority sum:', prioritySum)
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()