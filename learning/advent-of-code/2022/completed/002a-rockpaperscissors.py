import pathlib

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-002b.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')
        score = 0

        # A/X = rock
        # B/Y = paper
        # C/Z = scissors
        for line in fp:
            line = line.strip().split(" ")
            # print("Line is:", line)

            if line[1] == "X": # rock
                score += 1
                if line[0] == "A":
                    score += 3
                elif line[0] == "B":
                    score += 0
                elif line[0] == "C":
                    score += 6
            elif line[1] == "Y": # paper
                score += 2
                if line[0] == "A":
                    score += 6
                elif line[0] == "B":
                    score += 3
                elif line[0] == "C":
                    score += 0
            elif line[1] == "Z": # scissors
                score += 3
                if line[0] == "A":
                    score += 0
                elif line[0] == "B":
                    score += 6
                elif line[0] == "C":
                    score += 3

        print('Score:', score)
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()