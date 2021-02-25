import string

# A2B5E3426FG0ZYW3210PQ89R
# A BBB EEEEEE 4444 666 F G Z Y W 2222 00 P Q 999999999 R
def produce(inString):
    charIndex = 0
    countIndex = 0
    while True:
        if countIndex >= len(inString):
            break
        if inString[countIndex].isdigit():
            charIndex = countIndex + 1
            returnString = inString[charIndex] * (int(inString[countIndex]) + 1)
        else:
            returnString = inString[charIndex]

        charIndex += 1
        countIndex = charIndex

        yield returnString

# has iterator with:
# A BBB EEEEEE 4444 666 F G Z Y W 2222 00 P Q 999999999 R
# ABB BEE EEE E44 446 66F GZY W22 220 0PQ 999 999 999 R
def consume(prodIter):
    returnStr = ''
    spaceLeft = 3
    charsLeft = 0

    for s in prodIter:
        # e.g. EEEEEE
        charsLeft = len(s)
        while charsLeft > 0:
            spaceLeft = 3 - len(returnStr)
            if spaceLeft == 0:
                print(returnStr,end=' ')
                returnStr = ''
            else: # spaceLeft better be 1-3
                if charsLeft > spaceLeft:
                    returnStr += s[0:spaceLeft]
                    charsLeft -= spaceLeft
                else: # remaining chars is less than the space left
                    returnStr += s[0:charsLeft]
                    charsLeft = 0
    print(returnStr)

p = produce('A2B5E3426FG0ZYW3210PQ89R')
for s in p: 
    print(s,end = ' ')
print()

consume(produce('A2B5E3426FG0ZYW3210PQ89R'))