import pathlib

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    # fileName = "input-004-sml.txt"
    fileName = "input-004.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        solution1 = 0
        solution2 = 0
        map = []

        rowCount = 0
        for line in fp:
            rowCount += 1
            if line[-1] == "\n":
                line = line[:-1]
            map.append(list(line))

        rows = len(map)
        cols = len(map[0])
        for y in range(len(map)):
            line = map[y]
            for x in range(len(line)):
                borderCount = 0
                if line[x] == '@':
                    for dx in (-1, 0, 1):
                        for dy in (-1, 0, 1):
                            if dx == 0 and dy == 0:
                                continue  # Skip the center cell
                            
                            nx, ny = x + dx, y + dy
                            if 0 <= nx < rows and 0 <= ny < cols and map[ny][nx] == '@':
                                borderCount += 1

                    if borderCount < 4:
                        solution1 += 1

        print("part 1 solution:", solution1)

        removedCount = 1
        while removedCount > 0:
            removedCount = 0
            for y in range(len(map)):
                line = map[y]
                for x in range(len(line)):
                    borderCount = 0
                    if line[x] == '@':
                        for dx in (-1, 0, 1):
                            for dy in (-1, 0, 1):
                                if dx == 0 and dy == 0:
                                    continue
                                
                                nx, ny = x + dx, y + dy
                                if 0 <= nx < rows and 0 <= ny < cols and map[ny][nx] == '@':
                                    borderCount += 1

                        if borderCount < 4:
                            solution2 += 1
                            line[x] = '.'
                            removedCount += 1

        print("part 2 solution:", solution2)
        
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()