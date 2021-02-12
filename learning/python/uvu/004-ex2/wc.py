import pathlib
import re
import collections

filePath = pathlib.Path(__file__).parent.absolute()
fileName = "Strings.txt"

try:
    fp = open(str(filePath) + "/" + fileName, 'r')

    words = {}
    wordsByFrequency = {}
    longest = 0

    for line in fp:
        wordList = re.findall(r"(?:[A-Za-z]|')+", line)
        for word in wordList:
            word = word.lower()
            if word not in words:
                words[word] = 1
            else:
                words[word] += 1
            if len(word) > longest:
                longest = len(word)

    for word in words:
        if words[word] not in wordsByFrequency:
            wordsByFrequency[words[word]] = []
            wordsByFrequency[words[word]].append(word)
        else:
            wordsByFrequency[words[word]].append(word)

    # we now have an unsorted dictionary of words divided by their frequency
    sortedWordsByFreq = collections.OrderedDict(sorted(wordsByFrequency.items(), reverse=True))

    # output time
    for freq in sortedWordsByFreq:
        for word in sortedWordsByFreq[freq]:
            output = ""
            for i in range(longest - len(word)):
                output += " "
            output += word + ":"

            for i in range(7 - len(str(freq))):
                output += " "

            output += str(freq)
            print(output)
    

except FileNotFoundError:
    print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")