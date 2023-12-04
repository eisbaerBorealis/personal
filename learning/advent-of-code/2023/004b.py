import pathlib
import re

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-004.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        data = []

        for line in fp:
            if line[-1] == "\n":
                line = line[:-1]
            line = re.split('[:|]', line)
            line = [i.strip() for i in line]
            data.append(line)

        matches = []
        cards = []

        for i in range(len(data)):
            nextline = data[i]
            winNums = [int(i) for i in re.split(' ', nextline[1]) if i]
            myNums = [int(i) for i in re.split(' ', nextline[2]) if i]
            matches.append(0)
            cards.append(1)
            for j in range(len(winNums)):
                for k in range(len(myNums)):
                    if(winNums[j] == myNums[k]):
                        matches[i] += 1
                        break

        # print(cards)
        for i in range(len(matches)):
            for j in range(matches[i]):
                cards[i+j+1] += cards[i]
            # print(cards)

        gameTotal = sum(cards)

        print('gameTotal is ' + str(gameTotal))
        
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()