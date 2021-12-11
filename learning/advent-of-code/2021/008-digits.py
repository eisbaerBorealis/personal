import pathlib

# 1st guess: 59

def sortString(inStr):
    inStr = [char for char in inStr]
    inStr.sort()
    inStr = ''.join(inStr)
    return inStr

def charToNum(char):
    num = -1
    if char == 'a': num = 0
    elif char == 'b': num = 1
    elif char == 'c': num = 2
    elif char == 'd': num = 3
    elif char == 'e': num = 4
    elif char == 'f': num = 5
    elif char == 'g': num = 6
    return num

def numToChar(num):
    char = ''
    if num == 0: char = 'a'
    elif num == 1: char = 'b'
    elif num == 2: char = 'c'
    elif num == 3: char = 'd'
    elif num == 4: char = 'e'
    elif num == 5: char = 'f'
    elif num == 6: char = 'g'
    return char

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-008.txt"

    debug = False
    success = False

    input = []

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        for line in fp:
            line = line.strip()
            input.append(line)

        success = True
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

    if success:
        total = 0
        for line in input:
            pieces = line.split(' | ')
            inputA = [sortString(txt) for txt in pieces[0].split(' ')]
            inputB = [sortString(txt) for txt in pieces[1].split(' ')]

            inputA = sorted(inputA, key=len)
            if debug: print('debug: inputA is', inputA)
            if debug: print('  debug: inputB is', inputB)

            code = [''] * 10
            charPos = [''] * 7

            charCount = [0] * 7 # a through g
            for i in range(10):
                # if debug: print('debug: i is', i, '& input is', inputA[i])
                for char in inputA[i]:
                    charCount[charToNum(char)] += 1
            for i in range(3): # 1, 7, and 4
                for char in inputA[i]:
                    charCount[charToNum(char)] += 2
            
            if debug: print('debug: charCount is', charCount)

            charPos[0] = numToChar(charCount.index(10))
            charPos[1] = numToChar(charCount.index(8))
            charPos[2] = numToChar(charCount.index(14))
            charPos[3] = numToChar(charCount.index(9))
            charPos[4] = numToChar(charCount.index(4))
            charPos[5] = numToChar(charCount.index(15))
            charPos[6] = numToChar(charCount.index(7))

            if debug: print('debug: charPos is', charPos)

            code[0] = sortString(''.join([charPos[0], charPos[1], charPos[2], charPos[4], charPos[5], charPos[6]]))
            code[1] = sortString(''.join([charPos[2], charPos[5]]))
            code[2] = sortString(''.join([charPos[0], charPos[2], charPos[3], charPos[4], charPos[6]]))
            code[3] = sortString(''.join([charPos[0], charPos[2], charPos[3], charPos[5], charPos[6]]))
            code[4] = sortString(''.join([charPos[1], charPos[2], charPos[3], charPos[5]]))
            code[5] = sortString(''.join([charPos[0], charPos[1], charPos[3], charPos[5], charPos[6]]))
            code[6] = sortString(''.join([charPos[0], charPos[1], charPos[3], charPos[4], charPos[5], charPos[6]]))
            code[7] = sortString(''.join([charPos[0], charPos[2], charPos[5]]))
            code[8] = sortString(''.join([charPos[0], charPos[1], charPos[2], charPos[3], charPos[4], charPos[5], charPos[6]]))
            code[9] = sortString(''.join([charPos[0], charPos[1], charPos[2], charPos[3], charPos[5], charPos[6]]))

            if debug: print('debug: code is', code)

            for i in range(len(inputB)): # 0 - 3
                if debug: print('debug: inputB[i] is', inputB[i])
                digit = code.index(inputB[i])
                total += digit * 10 ** (3 - i)
            
        print('Answer:', total)

main()