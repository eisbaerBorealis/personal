import pathlib
import re

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-009b.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        tailTrail = {"0,0"}

        headX = 0
        headY = 0
        tailX = 0
        tailY = 0

        for line in fp:
            if line[-1] == "\n":
                line = line[:-1]
            line = line.split(" ")
            line[1] = int(line[1])
            # print(line)

            for i in range(line[1]):
                if line[0] == "R":
                    headX += 1
                    if headY == tailY and headX - tailX > 1:
                        tailX = headX - 1
                    elif headY != tailY and headX - tailX > 1:
                        tailX = headX - 1
                        tailY = headY
                elif line[0] == "L":
                    headX -= 1
                    if headY == tailY and headX - tailX < -1:
                        tailX = headX + 1
                    elif headY != tailY and headX - tailX < -1:
                        tailX = headX + 1
                        tailY = headY
                elif line[0] == "U":
                    headY += 1
                    if headX == tailX and headY - tailY > 1:
                        tailY = headY - 1
                    elif headX != tailX and headY - tailY > 1:
                        tailY = headY - 1
                        tailX = headX
                elif line[0] == "D":
                    headY -= 1
                    if headX == tailX and headY - tailY < -1:
                        tailY = headY + 1
                    elif headX != tailX and headY - tailY < -1:
                        tailY = headY + 1
                        tailX = headX
                else:
                    print("ERROR: direction doesn't exist.")
                
                # tailTrail.add(tailX + "," + tailY)
                tailTrail.add(f'{tailX},{tailY}')
        
        # print()
        # print("headX is", headX, "and headY is", headY)
        # print("tailX is", tailX, "and tailY is", tailY)
        print("length of tailTrail:", len(tailTrail))
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()