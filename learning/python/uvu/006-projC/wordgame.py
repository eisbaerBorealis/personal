import pathlib
import random

def isSubset(str1, str2):
    """is str2 made up of letters from str1?"""
    returnBool = True
    split1 = [char for char in str1]
    split2 = [char for char in str2]

    while returnBool and len(split2) > 0:
        oldLen = len(split2)
        for x in range(0, len(split2)):
            for y in range(0, len(split1)):
                if y < len(split1) and x < len(split2) and split2[x] == split1[y]:
                    split2.remove(split2[x])
                    split1.remove(split1[y])
        if oldLen == len(split2):
            returnBool = False

    return returnBool

def randomizeWord(oldStr):
    chars = [char for char in oldStr]
    returnWord = ""

    while len(chars) > 0:
        x = random.randint(0, len(chars) - 1)
        returnWord += chars[x]
        chars.remove(chars[x])
    
    return returnWord

filePath = pathlib.Path(__file__).parent.absolute()
fileName = "words.txt"

randomWord = ""
gameWords = []
minSize = 0
maxSize = 0

try:
    fp = open(str(filePath) + "/" + fileName, 'r')
    userInput = input("Enter the range of word lengths (low,high): ") # ex: "(3,6)"
    splitInput = userInput.split(",")

    minSize = int(splitInput[0][1:])
    maxSize = int(splitInput[1][0:-1])

    wordPool = []

    for line in fp:
        line = line.rstrip()
        if len(line) == maxSize:
            wordPool.append(line)
    fp.close()
    
    randomWord = wordPool[random.randint(0, len(wordPool) - 1)]
    # For DEBUGGING:
    # randomWord = "burner"
    # randomWord = "seaway"

    fp = open(str(filePath) + "/" + fileName, 'r')
    for line in fp:
        line = line.rstrip()
        if len(line) >= minSize and len(line) <= maxSize and set(line).issubset(randomWord):
            if isSubset(randomWord, line):
                gameWords.append(line)
    fp.close()
except FileNotFoundError:
    print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

# For DEBUGGING:
# print("gameWords are", gameWords)

gameDictionary = {}
boolDictionary = {}

for x in range(minSize, maxSize+1):
    gameDictionary[f'{x}'] = []
    boolDictionary[f'{x}'] = []

for word in gameWords:
    size = f'{len(word)}'
    gameDictionary[size].append(word)
    boolDictionary[size].append(False)

for x in range(minSize, maxSize + 1):
    if gameDictionary[f'{x}'] == []:
        del gameDictionary[f'{x}']
        del boolDictionary[f'{x}']

gameActive = True

while gameActive:
    print(randomizeWord(randomWord) + ":\n")
    for x in range(minSize, maxSize + 1):
        if f'{x}' in gameDictionary:
            printStr = "['"
            for y in range(0, len(gameDictionary[f'{x}'])):
                if(len(printStr) > 2):
                    printStr += ", "
                if boolDictionary[f'{x}'][y]:
                    printStr += gameDictionary[f'{x}'][y]
                else:
                    for z in range(x):
                        printStr += "-"
                printStr += "'"
            printStr += "]"
            print(printStr)
    userInput = input("\nEnter a guess: ").lower()
    if userInput == "q":
        print("Good try! Here are the answers:")
        gameActive = False
    else:
        guessLen = len(userInput)
        wordFound = False
        if 3 <= guessLen <= 6:
            if f'{guessLen}' in gameDictionary:
                for x in range(len(gameDictionary[f'{guessLen}'])):
                    if gameDictionary[f'{guessLen}'][x] == userInput:
                        boolDictionary[f'{guessLen}'][x] = True
                        wordFound = True
        if wordFound:
            print("Correct!")
        else:
            print("Word not found. Try again!\n")
    endGame = True
    for length in boolDictionary:
        for boolean in boolDictionary[length]:
            if not boolean:
                endGame = False
    
    if endGame:
        gameActive = False
        print("\nCongratulations! You guessed all the words!\n")

for x in range(minSize, maxSize + 1):
    if f'{x}' in gameDictionary:
        printStr = "['"
        for y in range(0, len(gameDictionary[f'{x}'])):
            if(len(printStr) > 3):
                printStr += ", "
            printStr += gameDictionary[f'{x}'][y]
            printStr += "'"
        printStr += "]"
        print(printStr)