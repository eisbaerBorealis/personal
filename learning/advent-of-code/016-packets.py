import pathlib

# 1st guess: 

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-016.txt"

    debug = True
    success = False

    input = []

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        for line in fp:
            input = line.strip()
            # input = [int(num) for num in line.split(',')]

        success = True
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

    if success:
        if debug: print('debug: input is', input)
        # binary = bin(int(input, 16))[2:]
        # if debug: print('debug: binary is', binary)

        # binary = bin(int(input, 16))[2:].zfill(4 * len(input))
        binary = str(bin(int(input, 16))[2:].zfill(4 * len(input)))
        if debug: print('debug: binary is', binary)

        if debug: print('debug: version bin is', binary[0:3])
        version = int(binary[0:3], 2)
        if debug: print('debug: version dec is', version)

        typeID = int(binary[3:6], 2)
        if debug: print('debug: typeID is', typeID)


        print('Answer:', 42)

main()