import pathlib
import re

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-007a.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')

        fileSum = 0
        fileTree = {'1'}
        currDir = fileTree
        currCommand = ""

        # Nodes
        #   dir - type, name, parent, children, fileSize
        #   file - type, name, parent, fileSize

        # gettingSteps = False
        for line in fp:
            if line[-1] == "\n":
                line = line[:-1]
            line = line.split(" ")
            print(line)

            if line[0] == "$":
                print("  new command:", line[1])
                currCommand = line[1]
                if currCommand == "cd":
                    if line[2] == "..":
                        currDir = currDir["parent"]
                    elif line[2] == "/":
                        currDir = {
                            "type":     "dir",
                            "name":     "/",
                            "parent":   currDir,
                            "children": {},
                            "fileSize": 0
                        }
                    else:
                        currDir = currDir["children"][line[2]]
                elif currCommand == "ls":
                    pass
                else:
                    print("Error, currCommand is", currCommand)
            else:
                # line is a dir/file in the currDir
                if line[0] == "dir":
                    currDir["children"][line[1]] = {
                        "type":     "dir",
                        "name":     line[1],
                        "parent":   currDir,
                        "children": {},
                        "fileSize": 0
                    }
                else:
                    # line is a file
                    currDir["children"][line[1]] = {
                        "type":     "file",
                        "name":     line[1],
                        "parent":   currDir,
                        "fileSize": line[0]
                    }
        
        print()
        print(fileTree)
        print("sum of files:", fileSum)
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()