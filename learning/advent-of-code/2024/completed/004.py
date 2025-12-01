import pathlib

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-004.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        wordCount = 0
        wordCount2 = 0
        wordSearch = []

        rowCount = 0
        for line in fp:
            rowCount += 1
            if line[-1] == "\n":
                line = line[:-1]
            wordSearch.append(line)

        columnCount = len(wordSearch[0])
        for y in range(len(wordSearch)):
            line = wordSearch[y]
            for x in range(len(line)):
                if line[x] == 'X':
                    # check right, left, up, down, up-right, up-left, down-right, down-left
                    # right
                    if x < columnCount - 3:
                        if line[x+1] == 'M' and line[x+2] == 'A' and line[x+3] == 'S':
                            wordCount += 1
                    # left
                    if x >= 3:
                        if line[x-1] == 'M' and line[x-2] == 'A' and line[x-3] == 'S':
                            wordCount += 1
                    # up
                    if y >= 3:
                        if wordSearch[y - 1][x] == 'M' and wordSearch[y - 2][x] == 'A' and wordSearch[y - 3][x] == 'S':
                            wordCount += 1
                    # down
                    if y < rowCount - 3:
                        if wordSearch[y + 1][x] == 'M' and wordSearch[y + 2][x] == 'A' and wordSearch[y + 3][x] == 'S':
                            wordCount += 1
                    # up-right
                    if x < columnCount - 3 and y >= 3:
                        if wordSearch[y - 1][x + 1] == 'M' and wordSearch[y - 2][x + 2] == 'A' and wordSearch[y - 3][x + 3] == 'S':
                            wordCount += 1
                    # up-left
                    if x >= 3 and y >= 3:
                        if wordSearch[y - 1][x - 1] == 'M' and wordSearch[y - 2][x - 2] == 'A' and wordSearch[y - 3][x - 3] == 'S':
                            wordCount += 1
                    # down-right
                    if x < columnCount - 3 and y < rowCount - 3:
                        if wordSearch[y + 1][x + 1] == 'M' and wordSearch[y + 2][x + 2] == 'A' and wordSearch[y + 3][x + 3] == 'S':
                            wordCount += 1
                    # down-left
                    if x >= 3 and y < rowCount - 3:
                        if wordSearch[y + 1][x - 1] == 'M' and wordSearch[y + 2][x - 2] == 'A' and wordSearch[y + 3][x - 3] == 'S':
                            wordCount += 1

                if line[x] == 'A':
                    if x >= 1 and y >= 1 and x <= columnCount - 2 and y <= rowCount - 2:
                        if wordSearch[y - 1][x - 1] == 'M' and wordSearch[y - 1][x + 1] == 'M' and wordSearch[y + 1][x - 1] == 'S' and wordSearch[y + 1][x + 1] == 'S':
                            wordCount2 += 1
                        if wordSearch[y - 1][x - 1] == 'M' and wordSearch[y - 1][x + 1] == 'S' and wordSearch[y + 1][x - 1] == 'M' and wordSearch[y + 1][x + 1] == 'S':
                            wordCount2 += 1
                        if wordSearch[y - 1][x - 1] == 'S' and wordSearch[y - 1][x + 1] == 'M' and wordSearch[y + 1][x - 1] == 'S' and wordSearch[y + 1][x + 1] == 'M':
                            wordCount2 += 1
                        if wordSearch[y - 1][x - 1] == 'S' and wordSearch[y - 1][x + 1] == 'S' and wordSearch[y + 1][x - 1] == 'M' and wordSearch[y + 1][x + 1] == 'M':
                            wordCount2 += 1
        print("part 1 solution:", wordCount)
        print("part 2 solution:", wordCount2)
        
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()