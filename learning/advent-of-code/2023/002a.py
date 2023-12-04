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

        redCount = 12
        greenCount = 13
        blueCount = 14

        gameTotal = 0

        for i in range(len(data)):
            nextline = data[i]
            gameID = int(nextline[1])
            possibleGame = True
            for j in range(int(len(nextline) / 2)):
                if(j != 0):
                    colornum = int(nextline[j*2])
                    color = nextline[j*2+1]
                    if(color == "red"):
                        if(colornum > redCount):
                            possibleGame = False
                    elif(color == "green"):
                        if(colornum > greenCount):
                            possibleGame = False
                    elif(color == "blue"):
                        if(colornum > blueCount):
                            possibleGame = False
                    else:
                        print("  ERROR")
            
            if(possibleGame):
                gameTotal += gameID

        print("gameTotal is " + str(gameTotal))
        
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()