import pathlib
 
# 1st guess:
 
def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-013.txt"
 
    debug = False
    success = False
 
    input = []
    dots = []
    instructions = []
 
    maxX = 0
    maxY = 0
 
    try:
        fp = open(str(filePath) + "/" + fileName, 'r')
 
        doDots = True
 
        for line in fp:
            line = line.strip()
           
            if line == '':
                doDots = False
            elif doDots:
                pieces = line.split(',')
                x = int(pieces[0])
                y = int(pieces[1])
                if x > maxX:
                    maxX = x
                if y > maxY:
                    maxY = y
                dots.append((x, y))
            else:
                pieces = line.split(' ')
                # print('found instructions:', pieces)
                pieces = pieces[2].split('=')
                # print('  instructions broken down:', pieces)
                instructions.append((pieces[0], int(pieces[1])))
 
        success = True
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")
 
    if success:
        if debug:
            print('debug: dots are')
            for line in dots:
                print('   ', line)
        if debug:
            print('debug: instructions are')
            for line in instructions:
                print('   ', line)
        if debug: print('debug: maxX is', maxX, 'and maxY is', maxY)
       
        paper = []
        for i in range(maxY+1):
            paper.append(['.'] * (maxX+1))
        if debug:
            print('debug: paper is')
            for line in paper:
                print(' ', ''.join(line))
 
        for dot in dots:
            paper[dot[1]][dot[0]] = '#'
        if debug:
            print('debug: paper is')
            for line in paper:
                print(' ', ''.join(line))
 
        for instruction in instructions:
            axis = instruction[0]
            fold = instruction[1]
            if debug: print('debug: instruction is', axis, '=', fold)
            
            maxY = len(paper) - 1
            maxX = len(paper[0]) - 1
            if debug: print('debug: new maxY is', maxY, 'and new maxX is', maxX)
            newPaper = []
            if axis == 'y':
                for i in range(fold):
                    # paper.append(['.'] * (maxX+1))
                    newPaper.append([space for space in paper[i]])
                    
                # for i in range(fold)
                for y in range(fold + 1, maxY + 1):
                    for x in range(maxX + 1):
                        if paper[y][x] == '#':
                            # newPaper[maxY - y][x] = '#'
                            newPaper[fold * 2 - y][x] = '#'
            else:
                for i in range(len(paper)):
                    newPaper.append(paper[i][0:fold])
                    
                if debug:
                    print('debug: temp newPaper is')
                    for line in newPaper:
                        print(' ', ''.join(line))
                
                for y in range(maxY + 1):
                    for x in range(fold + 1, maxX + 1):
                        if paper[y][x] == '#':
                            newPaper[y][maxX - x] = '#'
            
            if debug:
                print('debug: newPaper is')
                for line in newPaper:
                    print(' ', ''.join(line))
            paper = newPaper
 
            # break
 
        dotCount = 0
 
        for line in paper:
            print(' '.join(line))
            for space in line:
                if space == '#':
                    dotCount += 1
 
       
        print('Answer:', dotCount)
 
main()