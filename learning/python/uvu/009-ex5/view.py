import pathlib
import sys

# $ py view.py yankee.txt 20

fileName = sys.argv[1]
if len(sys.argv) > 2:
    viewSize = int(sys.argv[2])

fp = None
bookmarks = []
viewer = 0
quit = False
userInput = ''

def view(fname, view_size=25):
    try:
        fp = open(fname, 'r')

        lastTell = -1
        thisTell = fp.tell()
        while thisTell > lastTell:
            lastTell = thisTell
            for _0 in range(view_size):
                fp.readline()
            bookmarks.append(thisTell)
            thisTell = fp.tell()
        bookmarks.pop()

        fp.close()
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fname + " is in this program's folder and restart the program.")

def displayPage(fname, bookmark, view_size=25):
    try:
        fp = open(fname, 'r')

        fp.seek(bookmark)
        print('\n---PAGE ' + str(viewer + 1) + '----------')
        for _0 in range(view_size):
            print(fp.readline().strip())
        print('---END OF PAGE ' + str(viewer + 1) + '---')

        fp.close()
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fname + " is in this program's folder and restart the program.")

def displayMenu():
    print('\n--MENU--')
    print('u\tu move Up one page; if already at the top, wrap to the last page')
    print('d\tmove Down one page; if at the bottom, wrap to the first page')
    print('t\tmove to the Top (first) page')
    print('b\tmove to the Bottom (last) page')
    print('#\tmoves to page number (1-based)')
    print('q\tQuit')

def getGoodInput():
    userInput = ''
    goodInput = False

    while not goodInput:
        userInput = input('Enter a command: ')
        try:
            userInput = int(userInput)
            goodInput = True
        except ValueError:
            if len(userInput) <= 1:
                userInput = userInput.lower()
                if userInput == '':
                    userInput = 'd'
                    goodInput = True
                elif userInput == 'u' or userInput == 'd' or userInput == 't' or userInput == 'b' or userInput == 'q':
                    goodInput = True
        if not goodInput:
            print('Error: invalid command.')
    return userInput

if 'viewSize' in locals():
    view(fileName, viewSize)
else:
    view(fileName)

while not quit:
    if 'viewSize' in locals():
        displayPage(fileName, bookmarks[viewer], viewSize)
    else:
        displayPage(fileName, bookmarks[viewer])

    displayMenu()
    userInput = getGoodInput()

    if userInput == 'q':
        quit = True
    elif userInput == 'u':
        viewer = viewer - 1
        if viewer < 0:
            viewer = len(bookmarks) - 1
    elif userInput == 'd':
        viewer = viewer + 1
        if viewer >= len(bookmarks):
            viewer = 0
    elif userInput == 't':
        viewer = 0
    elif userInput == 'b':
        viewer = len(bookmarks) - 1
    elif isinstance(userInput, int):
        viewer = userInput - 1
        if viewer < 0:
            viewer = 0
        elif viewer >= len(bookmarks):
            viewer = len(bookmarks) - 1