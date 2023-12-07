import pathlib

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-003.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        data = []

        for line in fp:
            if line[-1] == "\n":
                line = line[:-1]
            data.append([i for i in line])

        rows = len(data)
        columns = len(data[0])
        partTotal = 0

        for y in range(rows):
            x = 0
            while (x < columns):
                char = data[y][x]
                firstX = x
                num = ''
                if(char.isdigit()):
                    num = char
                    while(x < columns - 1 and data[y][x+1].isdigit()):
                        x += 1
                        num += data[y][x]
                    num = int(num)
                    
                    minY = max(y-1, 0)
                    maxY = min(y+1, rows-1)
                    minX = max(firstX-1, 0)
                    maxX = min(x+1, columns-1)

                    isPart = False
                    for i in range(minY, maxY+1):
                        for j in range(minX, maxX+1):
                            if(not data[i][j].isdigit() and data[i][j] != '.'):
                                isPart = True

                    if(isPart):
                        partTotal += num

                x += 1
                
        print('partTotal is ' + str(partTotal))
        
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()