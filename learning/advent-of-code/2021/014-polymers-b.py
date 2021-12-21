import pathlib

# 1st guess: 

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-014.txt"

    debug = True
    success = False

    template = ''
    # rules = []

    elements = {}
    pairs = {}
    # pairCounts = {}

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
                # rules.append(rule)
                if not (rule[1] in elements):
                    elements[rule[1]] = 0
                pairs[rule[0]] = rule[1]
            else:
                template = line

        success = True
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

    if success:
        if debug: print('debug: template is', template)
        # if debug: print('debug: pairs are', pairs)
        # if debug: print('debug: elements are', elements)

        polymer = template
        pairCounts = {}
        for pair in pairs:
                pairCounts[pair] = 0
        for i in range(len(template) - 1):
            # polymer[i:i+2]
            pairCounts[template[i:i+2]] += 1
        # if debug: print('  debug: pairCounts are', pairCounts)


        for round in range(40):
            print('DEBUG: round', round)
            newPairCounts = {}
            for pair in pairs:
                newPairCounts[pair] = 0
            # if debug: print('    debug: newPairCounts are', newPairCounts)
            for pair in pairCounts:
                # e.g. 'NN'
                newPair = pair[0] + pairs[pair] + pair[1]
                # if debug and pairCounts[pair] > 0: print('  debug: pair (', pair, ') becomes', newPair)
                count = pairCounts[pair]
                newPairCounts[newPair[0:2]] += count
                newPairCounts[newPair[1:3]] += count
            pairCounts = newPairCounts
            # if debug: print('    debug: pairCounts are', pairCounts)
            # if debug:
            #     for pair in pairCounts:
            #         count = pairCounts[pair]
            #         if count > 0:
            #             print(pair, 'is', count)
            # if debug:
            #     count = 1
            #     for pair in pairCounts:
            #         count += pairCounts[pair]
            #     print('  debug: count is', count)

            # if debug: print('debug: polymer is', polymer)

        for pair in pairCounts:
            count = pairCounts[pair] / 2
            # if debug and count > 0: print('debug: adding', count, 'to', pair)
            elements[pair[0]] += count
            elements[pair[1]] += count
        
        elements[template[0]] += 0.5
        elements[template[-1]] += 0.5

        if debug: print('debug: elements are', elements)

        min = -1
        max = -1

        for element in elements:
            count = elements[element]
            # elements[element] = count
            if min == -1 or min > count:
                min = count
            if max < count:
                max = count

        # if debug: print('debug: elements is', elements)

        print('Answer:', max - min)

main()