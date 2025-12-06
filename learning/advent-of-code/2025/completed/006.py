import pathlib

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    # fileName = "input-005-sml.txt"
    fileName = "input-005.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        solution1 = 0
        solution2 = 0

        problems = []
        problems2 = []

        rowCount = 0
        for line in fp:
            rowCount += 1
            if line[-1] == "\n":
                line = line[:-1]
            problems.append([x for x in line.split(" ") if x.strip()])
            problems2.append(line)

        operators = problems.pop()

        for i in range(len(operators)):
            if operators[i] == '+':
                sum = 0
                for j in range(len(problems)):
                    sum += int(problems[j][i])
                solution1 += sum
            else: # operators[i] == '*'
                product = 1
                for j in range(len(problems)):
                    product *= int(problems[j][i])
                solution1 += product

        nextNum = 0
        currOp = ""
        for i in range(len(problems2[0])):
            nextInt = "".join([problems2[j][i] for j in range(len(problems2) - 1)]).strip()

            if problems2[-1][i] == '+':
                currOp = '+'
                nextNum = 0
            elif problems2[-1][i] == '*':
                currOp = '*'
                nextNum = 1

            if nextInt == "":
                solution2 += nextNum
                nextNum = 0
                continue
            else:
                nextInt = int(nextInt)
                if currOp == '+':
                    nextNum += int(nextInt)
                elif currOp == '*':
                    nextNum *= int(nextInt)

        solution2 += nextNum

        print("part 1 solution:", solution1)
        print("part 2 solution:", solution2)
        
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()