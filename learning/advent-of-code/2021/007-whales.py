import pathlib

# 1st guess: 

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-007.txt"

    debug = True
    success = False

    input = []

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        for line in fp:
            line = line.strip()
            input = [int(num) for num in line.split(',')]

        success = True
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

    if success:
        if debug: print('debug: input is', input)

        cheapest = -1

        for i in range(len(input)):
            fuel = 0
            for j in range(len(input)):
                if cheapest > 0 and fuel > cheapest:
                    break
                else:
                    steps = abs(i - input[j])
                    fuel += steps * (steps + 1) // 2
            if cheapest == -1 or cheapest > fuel:
                cheapest = fuel
        
        print('Answer:', cheapest)

main()