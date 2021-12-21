import pathlib

# 1st guess: 

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-006.txt"

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
        days = 256
        fishes = [0] * 9

        for fish in input:
            fishes[fish + 1] += 1

        if debug: print('debug: fishes is', fishes)

        for i in range(days + 1):
            # if debug: print('debug: day is', i)
            newFishes = [0] * 9
            for j in range(len(fishes)):
                newSpot = j - 1
                if newSpot < 0:
                    newSpot = len(fishes) - 1
                newFishes[newSpot] = fishes[j]
            newFishes[6] += fishes[0]

            fishes = [count for count in newFishes]
            # if debug: print('debug: i is', i, 'and fishes is', fishes)

        total = 0
        for i in range(9):
            total += fishes[i]
        print('Answer:', total)

main()