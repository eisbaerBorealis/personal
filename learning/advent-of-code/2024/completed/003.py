import pathlib
import re

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-003.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        instructions = []
        multResults = 0
        multResults2 = 0

        for line in fp:
            pattern = re.compile('(mul\(\d+,\d+\))|(do\(\))|(don\'t\(\))')
            results = re.findall(pattern, line)
            for i in results:
                for j in i:
                    if j != "":
                        instructions.append(j)

        print(instructions)

        isDo = True
        for line in instructions:
            line = re.split('[\(,\)]', line)[:-1]

            if line[0] == "mul":
                factors = [int(i) for i in line[1:]]
                multResults += factors[0] * factors[1]
                if isDo:
                    multResults2 += factors[0] * factors[1]
            elif line[0] == "do":
                isDo = True
            elif line[0] == "don't":
                isDo = False


        print("part 1 solution:", multResults)
        print("part 2 solution:", multResults2)
        
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()