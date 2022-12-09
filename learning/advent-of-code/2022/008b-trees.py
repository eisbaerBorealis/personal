import pathlib
import re

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-008b.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        trees = []
        bestScore = 0

        for line in fp:
            if line[-1] == "\n":
                line = line[:-1]
            trees.append([int(i) for i in line])
        # print("trees:")
        # for row in trees:
        #     print(row)

        height = len(trees)
        height = len(trees)
        for i in range(1, len(trees) - 1):
            for j in range(1, len(trees[0]) - 1):
                tHeight = trees[i][j]
                # print("  checking", tHeight, "at", i, ",", j)

                wScore = 0
                eScore = 0
                nScore = 0
                sScore = 0

                # check west
                for k in range(j-1, -1, -1):
                    wScore += 1
                    if trees[i][k] >= tHeight:
                        break

                # check east
                for k in range(j+1, len(trees[i])):
                    eScore += 1
                    if trees[i][k] >= tHeight:
                        break

                # check north
                for k in range(i-1, -1, -1):
                    nScore += 1
                    if trees[k][j] >= tHeight:
                        break

                # check south
                for k in range(i+1, len(trees)):
                    sScore += 1
                    if trees[k][j] >= tHeight:
                        break

                totalScore = wScore * eScore * nScore * sScore
                if bestScore < totalScore:
                    bestScore = totalScore
        
        print("best score:", bestScore)
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()