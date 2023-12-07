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
        gearTotal = 0

        for y in range(rows):
            x = 0
            for x in range(columns):
                char = data[y][x]
                if(char == '*'):
                    nums = []
                    # print('\n    Found * at ' + str(x) + ', ' + str(y))
                    if(y > 0 and x > 0 and data[y-1][x-1].isdigit()):
                        # print('A: char at ' + str(x-1) + ', ' + str(y-1) + ' is a digit')
                        num = data[y-1][x-1]
                        xDiff = -2
                        while(x + xDiff >= 0 and data[y-1][x+xDiff].isdigit()):
                            num = data[y-1][x+xDiff] + num
                            xDiff -= 1
                        xDiff = 0
                        while(x + xDiff < columns and data[y-1][x+xDiff].isdigit()):
                            num = num + data[y-1][x+xDiff]
                            xDiff += 1
                        # print('A: final num is ' + num)
                        nums.append(int(num))
                    if(y > 0 and data[y-1][x].isdigit() and (x == 0 or (not data[y-1][x-1].isdigit()) and (x == columns-1 or (not data[y-1][x+1].isdigit())))):
                        # print('B: char at ' + str(x) + ', ' + str(y-1) + ' is a digit')
                        nums.append(int(data[y-1][x]))
                    if(y > 0 and x < columns and data[y-1][x+1].isdigit() and (x == 0 or not data[y-1][x-1].isdigit() or (data[y-1][x-1].isdigit() and not data[y-1][x].isdigit()))):
                        # print('C: char at ' + str(x+1) + ', ' + str(y-1) + ' is a digit')
                        num = data[y-1][x+1]
                        xDiff = 0
                        while(x + xDiff >= 0 and data[y-1][x+xDiff].isdigit()):
                            num = data[y-1][x+xDiff] + num
                            xDiff -= 1
                        xDiff = 2
                        while(x + xDiff < columns and data[y-1][x+xDiff].isdigit()):
                            num = num + data[y-1][x+xDiff]
                            xDiff += 1
                        # print('C: final num is ' + num)
                        nums.append(int(num))

                    if(x > 0 and data[y][x-1].isdigit()):
                        # print('D: char at ' + str(x-1) + ', ' + str(y) + ' is a digit')
                        num = data[y][x-1]
                        xDiff = -2
                        while(x + xDiff >= 0 and data[y][x+xDiff].isdigit()):
                            num = data[y][x+xDiff] + num
                            xDiff -= 1
                        # print('D: final num is ' + num)
                        nums.append(int(num))
                    if(x < columns and data[y][x+1].isdigit()):
                        # print('E: char at ' + str(x+1) + ', ' + str(y) + ' is a digit')
                        num = data[y][x+1]
                        xDiff = 2
                        while(x + xDiff < columns and data[y][x+xDiff].isdigit()):
                            num = num + data[y][x+xDiff]
                            xDiff += 1
                        # print('E: final num is ' + num)
                        nums.append(int(num))
                    
                    if(y < columns and x > 0 and data[y+1][x-1].isdigit()):
                        # print('F: char at ' + str(x-1) + ', ' + str(y+1) + ' is a digit')
                        num = data[y+1][x-1]
                        xDiff = -2
                        while(x + xDiff >= 0 and data[y+1][x+xDiff].isdigit()):
                            num = data[y+1][x+xDiff] + num
                            xDiff -= 1
                        xDiff = 0
                        while(x + xDiff < columns and data[y+1][x+xDiff].isdigit()):
                            num = num + data[y+1][x+xDiff]
                            xDiff += 1
                        # print('F: final num is ' + num)
                        nums.append(int(num))
                    if(y < rows-1 and data[y+1][x].isdigit() and (x == 0 or (not data[y+1][x-1].isdigit()) and (x == columns-1 or (not data[y+1][x+1].isdigit())))):
                        # print('G: char at ' + str(x) + ', ' + str(y+1) + ' is a digit')
                        # print('    ' + data[y+1][x])
                        nums.append(int(data[y+1][x]))
                    if(y < columns and x < columns and data[y+1][x+1].isdigit() and (x == 0 or not data[y+1][x-1].isdigit() or (data[y+1][x-1].isdigit() and not data[y+1][x].isdigit()))):
                        # print('H: char at ' + str(x+1) + ', ' + str(y+1) + ' is a digit')
                        num = data[y+1][x+1]
                        xDiff = 0
                        while(x + xDiff >= 0 and data[y+1][x+xDiff].isdigit()):
                            num = data[y+1][x+xDiff] + num
                            xDiff -= 1
                        xDiff = 2
                        while(x + xDiff < columns and data[y+1][x+xDiff].isdigit()):
                            num = num + data[y+1][x+xDiff]
                            xDiff += 1
                        # print('H: final num is ' + num)
                        nums.append(int(num))

                    if(len(nums) == 2):
                        gearRatio = nums[0] * nums[1]
                        # print('    ADDING ' + str(gearRatio))
                        gearTotal += gearRatio
                    # else:
                    #     print('    NOT A GEAR')
                
        print('gearTotal is ' + str(gearTotal))
        
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()