import pathlib

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-002.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')
        depth = 0
        breadth = 0
        aim = 0

        for line in fp:
            pieces = line.split(' ')
            dir = pieces[0]
            val = int(pieces[1])
            
            if dir == 'forward':
                breadth += val
                depth += aim * val
            elif dir == 'down':
                aim += val
            elif dir == 'up':
                aim -= val

        print('Answer:', depth * breadth)
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()