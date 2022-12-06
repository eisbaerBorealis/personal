import pathlib
import re

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-005b.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        cargoInput = []
        cargo = []
        stackCount = 0

        gettingSteps = False
        for line in fp:
            if line[-1] == "\n":
                line = line[:-1]
            
            # print("checking line \"", line, "\"")
            if gettingSteps:
                line = line.split(" ")
                moveCount = int(line[1])
                moveFrom = int(line[3]) - 1
                moveTo = int(line[5]) - 1
                # print("  gettingSteps:", line)
                # print("  next step: move", moveCount, "from", moveFrom, "to", moveTo)
                startLoc = len(cargo[moveFrom]) - moveCount
                for i in range(moveCount):
                    cargo[moveTo].append(cargo[moveFrom].pop(startLoc))
            else:
                if stackCount == 0:
                    # print("    len(line) is", len(line))
                    stackCount = len(line) // 4 + 1
                    for i in range(stackCount):
                        cargo.append([])
                    print("    stackCount is", stackCount)
                if line == "":
                    gettingSteps = True
                    # print("  empty line found, gettingSteps set to True")
                    cargoInput = cargoInput[:-1]
                    cargoInput.reverse()
                    for cargoLine in cargoInput:
                        # print("   \"", cargoLine, "\"")
                        for i in range(stackCount):
                            cargoChar = cargoLine[i * 4 + 1]
                            if cargoChar != " ":
                                # print("found cargoChar", cargoChar, "at i", i)
                                cargo[i].append(cargoChar)
                    print()
                    for cargoStack in cargo:
                        print("cargoStack:", cargoStack)
                else:
                    cargoInput.append(line)


        print()
        for cargoStack in cargo:
            print("cargoStack:", cargoStack)

        # print('Overlap count:', overlapCount)
        output = []
        for cargoStack in cargo:
            if len(cargoStack) != 0:
                output.append(cargoStack[-1])
        print("".join(output))
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()