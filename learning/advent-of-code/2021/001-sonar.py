import pathlib

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-001.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')
        increases = 0
        prevA = -1
        prevB = -1
        prevC = -1

        for line in fp:
            depth = int(line)

            if prevA > -1 and prevA < depth:
                increases += 1

            prevA = prevB
            prevB = prevC
            prevC = depth

        print('Final increases count:', increases)
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()