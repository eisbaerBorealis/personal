import pathlib

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-001b.txt"
    numwords = ["1", "2", "3", "4", "5", "6", "7", "8", "9",
                "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        data = []

        for line in fp:
            if line[-1] == "\n":
                line = line[:-1]
            data.append(line)

        valueTotal = 0
        for i in range(len(data)):
            line = data[i]
            
            firstNums = []
            lastNums = []
            for j in range(len(numwords)):
                numword = numwords[j]
                firstNums.append(line.find(numword))
                lastNums.append(line.rfind(numword))

            firstNumIndex = -1
            lastNumIndex = -1
            for j in range(len(firstNums)):
                if(firstNums[j] != -1 and (firstNumIndex == -1 or firstNums[j] < firstNums[firstNumIndex])):
                    firstNumIndex = j
                if((lastNums[j] != -1 and lastNumIndex == -1) or (lastNums[j] > lastNums[lastNumIndex])):
                    lastNumIndex = j

            firstNumIndex %= 9
            lastNumIndex %= 9

            num = int(numwords[firstNumIndex] + numwords[lastNumIndex])
            valueTotal += num

        print("valueTotal is " + str(valueTotal))
        
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()