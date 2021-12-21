import pathlib

# 1st guess: 

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-001.txt"

    debug = True
    success = False

    input = []

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        for line in fp:
            line = line.strip()
            input = [char for char in line]

        success = True
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

    if success:
        # if debug: print('debug: input is', input)
        if debug: print('debug: len(input) is', len(input))

        first = -1
        floor = 0
        # for char in input:
        for i in range(len(input)):
            if input[i] == '(':
                floor += 1
            else:
                floor -= 1
        
            if first == -1 and floor < 0:
                first = i + 1
        
        print('Answer:', first)

main()