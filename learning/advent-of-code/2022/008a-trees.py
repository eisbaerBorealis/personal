import pathlib
import re

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-008b.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        trees = []
        visCount = 0

        for line in fp:
            if line[-1] == "\n":
                line = line[:-1]
            trees.append([int(i) for i in line])
        # print("trees:")
        # for row in trees:
        #     print(row)

        height = len(trees)
        height = len(trees)
        for i in range(len(trees)):
            for j in range(len(trees[0])):
                tHeight = trees[i][j]
                # check edge
                if i == 0 or j == 0 or i == len(trees) - 1 or j == len(trees[i]) - 1:
                    visCount += 1
                else:
                    isHidden = True
                # check west
                    tempHidden = False
                    for k in range(j-1, -1, -1):
                        # if i == 2 and j == 1:
                        #     print("  checking west at", i, ",", k)
                        if trees[i][k] >= tHeight:
                            tempHidden = True
                            break
                    if not tempHidden:
                        isHidden = False
                    else:
                # check east
                        tempHidden = False
                        for k in range(j+1, len(trees[i])):
                            if trees[i][k] >= tHeight:
                                tempHidden = True
                                break
                        if not tempHidden:
                            isHidden = False
                        else:
                # check north
                            tempHidden = False
                            for k in range(i-1, -1, -1):
                                if trees[k][j] >= tHeight:
                                    tempHidden = True
                                    break
                            if not tempHidden:
                                isHidden = False
                            else:
                # check south
                                tempHidden = False
                                for k in range(i+1, len(trees)):
                                    if trees[k][j] >= tHeight:
                                        tempHidden = True
                                        break
                                if not tempHidden:
                                    isHidden = False
                    if not isHidden:
                        # print("Found visible tree at", i, ",", j)
                        visCount += 1
        
        print("visible Trees:", visCount)
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()

# print([i for i in range(5, 0, -1)])
# print([i for i in range(4, -1, -1)])
# print([i for i in range(2, 5)])