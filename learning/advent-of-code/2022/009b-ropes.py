import pathlib
import re

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-009b.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        tailTrail = {"0,0"}

        x = [0,0,0,0,0,0,0,0,0,0]
        y = [0,0,0,0,0,0,0,0,0,0]

        for line in fp:
            if line[-1] == "\n":
                line = line[:-1]
            line = line.split(" ")
            line[1] = int(line[1])
            # print(line)

            for i in range(line[1]):
                if line[0] == "R":
                    x[0] += 1
                elif line[0] == "L":
                    x[0] -= 1
                elif line[0] == "U":
                    y[0] += 1
                elif line[0] == "D":
                    y[0] -= 1
                else:
                    print("ERROR: direction doesn't exist.")
                
                for i in range(9):

                    if y[i] - y[i+1] > 1 and x[i] - x[i+1] > 1: # up + right
                        x[i+1] = x[i] - 1
                        y[i+1] = y[i] - 1
                    elif y[i] - y[i+1] > 1 and x[i] - x[i+1] < -1: # up + left
                        x[i+1] = x[i] + 1
                        y[i+1] = y[i] - 1
                    elif y[i] - y[i+1] < -1 and x[i] - x[i+1] > 1: # down + right
                        x[i+1] = x[i] - 1
                        y[i+1] = y[i] + 1
                    elif y[i] - y[i+1] < -1 and x[i] - x[i+1] < -1: # down + left
                        x[i+1] = x[i] + 1
                        y[i+1] = y[i] + 1

                    elif y[i] - y[i+1] >  1: # up
                        x[i+1] = x[i]
                        y[i+1] = y[i] - 1
                    elif y[i] - y[i+1] < -1: # down
                        x[i+1] = x[i]
                        y[i+1] = y[i] + 1
                    elif x[i] - x[i+1] >  1: # right
                        y[i+1] = y[i]
                        x[i+1] = x[i] - 1
                    elif x[i] - x[i+1] < -1: # left
                        y[i+1] = y[i]
                        x[i+1] = x[i] + 1
                    else:
                        break
                
                tailTrail.add(f'{x[9]},{y[9]}')
            # print()
            # print("  x's are", x)
            # print("  y's are", y)
        
        # print()
        # print("headX is", x[0], "and headY is", y[0])
        # print("tailX is", x[9], "and tailY is", y[9])
        print("length of tailTrail:", len(tailTrail))
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()