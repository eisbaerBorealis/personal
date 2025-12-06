import pathlib

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    # fileName = "input-005-sml.txt"
    fileName = "input-005.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        solution1 = 0 # number of fresh ingredients
        solution2 = 0 # number of fresh ingredient ids

        freshList = []
        itemList = []

        rowCount = 0
        for line in fp:
            rowCount += 1
            if line[-1] == "\n":
                line = line[:-1]
            if "-" in line:
                freshList.append([int(x) for x in line.split("-")])
            elif len(line) > 0:
                itemList.append(int(line))
        
        for item in itemList:
            isFresh = False
            for fresh in freshList:
                if item >= fresh[0] and item <= fresh[1]:
                    isFresh = True
                    break
            if isFresh:
                solution1 += 1

        freshList.sort()
        # for idRange in freshList:
        #     print(f"    initial range: {idRange}")

        shrunk = True
        shrinkAttempts = 0
        while shrunk:
            shrinkAttempts += 1
            shrunk = False
            for i in range(len(freshList) - 1):
                for j in range(i + 1, len(freshList)):
                    if j >= len(freshList):
                        continue
                    first = freshList[i]
                    second = freshList[j]
                    if (first[0] >= second[0] and first[0] <= second[1]) or (first[1] >= second[0] and first[1] <= second[1]) or (first[0] <= second[0] and first[1] >= second[1]):
                        # overlapping ranges
                        # print(f"merging {first}, {second}, freshList len is {len(freshList)}")
                        first[0] = min(first[0], second[0])
                        first[1] = max(first[1], second[1])
                        #remove second
                        freshList.pop(j)
                        # print(f"    merged to {first}, freshList len is now {len(freshList)}")
                        shrunk = True

        for idRange in freshList:
            # print(f"counting range {idRange}, total is {idRange[1] - idRange[0] + 1}")
            solution2 += (idRange[1] - idRange[0] + 1)

        print("part 1 solution:", solution1)
        print("part 2 solution:", solution2)
        
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()