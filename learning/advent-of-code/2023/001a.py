import pathlib

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-001.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        data = []

        for line in fp:
            if line[-1] == "\n":
                line = line[:-1]
            data.append(line)
        # for row in data:
            # print(row)

        valueTotal = 0
        for i in range(len(data)):
            firstNum = ""
            lastNum = ""
            for j in range(len(data[i])):
                if(data[i][j].isnumeric()):
                    if (firstNum == ""):
                        firstNum = data[i][j]
                    else:
                        lastNum = data[i][j]
            
            if(lastNum == ""):
                lastNum = firstNum
            num = int(firstNum + lastNum)
            # print(num)
            valueTotal += num
        print(valueTotal)
        
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()