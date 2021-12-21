import pathlib
import re

# 1st guess: 

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-010.txt"

    debug = True
    success = False

    input = []

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        for line in fp:
            line = line.strip()
            input.append([char for char in line])

        success = True
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

    if success:
        # if debug: print('debug: input is', input)
        left = ['(', '[', '{', '<']
        right = [')', ']', '}', '>']

        # score = 0
        scores = []

        for line in input:
            stack = []
            # if debug: print('  debug: NEW LINE')

            corrupt = False
            for char in line:
                if char in left:
                    stack.append(char)
                else:
                    if char == ')':
                        if stack[-1] == '(':
                            stack.pop()
                        else:
                            # score += 3
                            corrupt = True
                            break
                    if char == ']':
                        if stack[-1] == '[':
                            stack.pop()
                        else:
                            # score += 57
                            corrupt = True
                            break
                    if char == '}':
                        if stack[-1] == '{':
                            stack.pop()
                        else:
                            # score += 1197
                            corrupt = True
                            break
                    if char == '>':
                        if stack[-1] == '<':
                            stack.pop()
                        else:
                            # score += 25137
                            corrupt = True
                            break
                # if debug: print(' debug: stack is', stack)
            if not corrupt:
                tempScore = 0
                for char in reversed(stack):
                    # if debug: print('debug: char is reversed(stack) is', char)
                    tempScore *= 5
                    if char == '(':
                        tempScore += 1
                    elif char == '[':
                        tempScore += 2
                    elif char == '{':
                        tempScore += 3
                    elif char == '<':
                        tempScore += 4
                    else:
                        print('~~ERROR~~ default in switch statement')
                scores.append(tempScore)

            scores.sort()
        
        print('Answer:', scores[len(scores)//2])

main()