import pathlib

# 1st guess: 

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-014.txt"

    debug = True
    success = False

    template = ''
    rules = []

    elements = {}

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        part2 = False
        for line in fp:
            line = line.strip()
            # input = [int(num) for num in line.split(',')]
            if line == '':
                part2 = True
            elif part2:
                rule = line.split(' -> ')
                # rules.append(line.split(' -> '))
                rules.append(rule)
                if not (rule[1] in elements):
                    elements[rule[1]] = 0
            else:
                template = line

        success = True
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

    if success:
        if debug: print('debug: template is', template)
        # if debug: print('debug: rules are', rules)
        # if debug: print('debug: elements are', elements)

        polymer = template
        for x in range(10):
            print('DEBUG: round', x)
            part2 = []
            for i in range(len(polymer) - 1):
                # e.g. 0, 1, 2
                piece = polymer[i:i+2]
                # print('checking', piece)
                for rule in rules:
                    if piece == rule[0]:
                        part2.append(rule[1])
                
            # polymer = [char for char in polymer]
            newPolymer = []
            for i in range(len(part2)):
                newPolymer.append(polymer[i])
                newPolymer.append(part2[i])
            newPolymer.append(polymer[-1])
            polymer = ''.join(newPolymer)

            if debug: print('debug: polymer is', polymer)
            if debug: print('  debug: len(polymer) is', len(polymer))

        min = -1
        max = -1

        for element in elements:
            # if debug: print('debug: element is', element)
            count = polymer.count(element)
            # elements[element] = polymer.count(element)
            elements[element] = count
            if min == -1 or min > count:
                min = count
            if max < count:
                max = count

        if debug: print('debug: elements is', elements)

        print('Answer:', max - min)

main()