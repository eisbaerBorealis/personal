import pathlib

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-003b.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')
        prioritySum = 0
        sackCount = 0

        lineA = ""
        lineB = ""
        lineC = ""
        for line in fp:
            line = line.strip()
            # print("Checking", line)

            if sackCount % 3 == 0:
                lineA = line
            elif sackCount % 3 == 1:
                lineB = line
            elif sackCount % 3 == 2:
                lineC = line
                # print("Comparing", lineA, "and", lineB, "and", lineC)

                found = False
                for i in range(len(lineA)):
                    if found: break
                    for j in range(len(lineB)):
                        if found: break
                        if lineA[i] == lineB[j]:
                            for k in range(len(lineC)):
                                if lineA[i] == lineC[k]:
                                    charCode = ord(lineA[i])
                                    if charCode > 96:
                                        prioritySum += charCode - 96
                                    else:
                                        prioritySum += charCode - 38
                                    found = True
                                    break

            sackCount += 1

        print('Priority sum:', prioritySum)
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()