import pathlib

# first guess: 1185048

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-003.txt"

    binsize = 0
    sampSize = 0

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')
        count = []

        for line in fp:
            sampSize += 1
            if binsize == 0:
                binsize = len(line) - 1
                count = [0] * binsize
                # print('debug: new binsize is', binsize)
            bits = [char for char in line]
            for i in range(binsize):
                if bits[i] == '1':
                    count[i] += 1

        # print('debug: sampSize is', sampSize)
        # print('debug:  count is', count)

        gamma = ['0'] * binsize
        epsilon = ['1'] * binsize

        for i in range(binsize):
            num = count[i]
            if count[i] > sampSize / 2:
                gamma[i] = '1'
                epsilon[i] = '0'
                
        gamma = ''.join(gamma)
        epsilon = ''.join(epsilon)

        # print('debug: epsilon is', epsilon)
        # print('debug:   gamma is', gamma)

        epsilon = int(epsilon, 2)
        gamma = int(gamma, 2)

        # print('debug: epsilon is', epsilon)
        # print('debug:   gamma is', gamma)

        power = epsilon * gamma

        print('Answer:', power)
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()