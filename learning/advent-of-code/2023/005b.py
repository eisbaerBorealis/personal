import pathlib
from re import split

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-005.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        data = ''

        for line in fp:
            data += line
        data = split('\n\n', data)

        seeds = []
        seedNums = [int(i) for i in split(' ', data[0]) if i.isdigit()]
        # print('seedNums are')
        # print(seedNums)
        initSeeds = []
        for i in range(0, len(seedNums), 2):
            initSeeds += [s for s in range(seedNums[i], seedNums[i] + seedNums[i+1])]
        # print('initSeeds are')
        # print(initSeeds)

        seeds.append(initSeeds)
        seedCount = len(seeds[0])
        # print('seedCount is ' + str(seedCount) + ' and seeds are')
        # print(seeds)

        for i in range(1, len(data)):
            nextMap = [i for i in split('\n', data[i])][1:]
            # print('\n' + str(i) + ':')
            seeds.append(seeds[-1].copy())
            for j in range(len(nextMap)):
                nextMapNums = [int(i) for i in split(' ',nextMap[j])]
                # print(nextMapNums)
                for k in range(seedCount):
                    thisSeed = seeds[-2][k]
                    # print('  checking seed ' + str(k) + ' (' + str(thisSeed) + ')')
                    if(thisSeed >= nextMapNums[1] and thisSeed < nextMapNums[1] + nextMapNums[2]):
                        seeds[-1][k] -= nextMapNums[1] - nextMapNums[0]
            print('  completed transformation ' + str(i))

        # print('\nSEEDS:')
        # for row in seeds:
        #     print(row)
        print('lowest location is ' + str(min(seeds[-1])))
        
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()