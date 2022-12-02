import pathlib

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-002b.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')
        score = 0

        # A = rock
        # B = paper
        # C = scissors
        for line in fp:
            line = line.strip().split(" ")
            # print("Line is:", line)

            if line[1] == "X": # lose
                score += 0
                if line[0] == "A":
                    score += 3
                elif line[0] == "B":
                    score += 1
                elif line[0] == "C":
                    score += 2
            elif line[1] == "Y": # draw
                score += 3
                if line[0] == "A":
                    score += 1
                elif line[0] == "B":
                    score += 2
                elif line[0] == "C":
                    score += 3
            elif line[1] == "Z": # win
                score += 6
                if line[0] == "A":
                    score += 2
                elif line[0] == "B":
                    score += 3
                elif line[0] == "C":
                    score += 1

        print('Score:', score)
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()