import pathlib
import re

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-002.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        data = []

        for line in fp:
            if line[-1] == "\n":
                line = line[:-1]
            line = re.split('[ :,;]', line)
            line = [i for i in line if i]
            data.append(line)

        gameTotal = 0

        for i in range(len(data)):
            nextline = data[i]
            gameID = int(nextline[1])
            redMin = 0
            greenMin = 0
            blueMin = 0
            for j in range(int(len(nextline) / 2)):
                if(j != 0):
                    colornum = int(nextline[j*2])
                    color = nextline[j*2+1]
                    if(color == "red"):
                        if(colornum > redMin):
                            redMin = colornum
                    elif(color == "green"):
                        if(colornum > greenMin):
                            greenMin = colornum
                    elif(color == "blue"):
                        if(colornum > blueMin):
                            blueMin = colornum
                    else:
                        print("  ERROR")
            
            gameTotal += (redMin * greenMin * blueMin)

        print("gameTotal is " + str(gameTotal))
        
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()