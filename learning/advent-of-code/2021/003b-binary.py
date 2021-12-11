import pathlib

# first guess:  2249760
# second guess: 3744225
# third guess:  6085575

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-003.txt"

    debug = False

    binSize = 0
    sampSize = 0
    input = []
    success = False

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        for line in fp:
            line = line.strip()
            sampSize += 1
            if binSize == 0:
                binSize = len(line)
            input.append(line)
        success = True
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

    if success:
        if debug: print('debug: binSize is', binSize)
        if debug: print('debug: sampSize is', sampSize)
        if debug: print('debug: len(input) is', len(input))

        oxyBins = [bin for bin in input]
        co2Bins = [bin for bin in input]

        if debug: print('debug: len(oxyBins) is', len(oxyBins))
        if debug: print('debug: len(co2Bins) is', len(co2Bins))

        oxyPos = 0
        while len(oxyBins) > 1 and oxyPos < binSize:
            tempOxyBins = []

            count = 0
            for bin in oxyBins:
                if bin[oxyPos] == '1':
                    count += 1
            
            commonBit = '1'
            if debug: print('  debug: count is', count, 'and len(oxyBins) is', len(oxyBins))
            if count < len(oxyBins) / 2:
                commonBit = '0'

            for bin in oxyBins:
                if bin[oxyPos] == commonBit:
                    tempOxyBins.append(bin)
            oxyBins = [bin for bin in tempOxyBins]
            if debug: print(' debug: oxyPos is', oxyPos, 'and commonBit is', commonBit)
            if debug: print('  debug: len(oxyBins) is', len(oxyBins))
            if debug and len(oxyBins) <= 10: print('    debug: oxyBins is', oxyBins)
            oxyPos += 1
        oxyRating = int(oxyBins[0], 2)
        if debug: print('debug: len(oxyBins) is', len(oxyBins))
        if debug: print('debug: oxyBins is', oxyBins)
        if debug: print('debug: oxyRating(2) is', oxyBins[0])
        if debug: print('debug: oxyRating is', oxyRating)

        co2Pos = 0
        while len(co2Bins) > 1 and co2Pos < binSize:
            tempCo2Bins = []

            count = 0
            for bin in co2Bins:
                if bin[co2Pos] == '1':
                    count += 1
            
            commonBit = '0'
            if count < len(co2Bins) / 2:
                commonBit = '1'

            for bin in co2Bins:
                if bin[co2Pos] == commonBit:
                    tempCo2Bins.append(bin)
            co2Bins = [bin for bin in tempCo2Bins]
            if debug: print(' debug: co2Pos is', co2Pos, 'and commonBit is', commonBit)
            if debug: print('  debug: len(co2Bins) is', len(co2Bins))
            if debug and len(co2Bins) <= 10: print('    debug: co2Bins is', co2Bins)
            co2Pos += 1
        co2Rating = int(co2Bins[0], 2)
        if debug: print('debug: len(co2Bins) is', len(co2Bins))
        if debug: print('debug: co2Bins is', co2Bins)
        if debug: print('debug: co2Rating(2) is', co2Bins[0])
        if debug: print('debug: co2Rating is', co2Rating)

        print('Answer:', oxyRating * co2Rating)

main()