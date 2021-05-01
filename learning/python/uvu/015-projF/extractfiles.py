import os
import re
import sys
import zipfile

# $ py extractfiles.py cpp.zip ^[Cs].*

filePath = os.getcwd()

def main():
    zipName = sys.argv[1]
    zipRegex = re.compile(sys.argv[2])
    fileCount = 0

    zipfilePath = os.path.join(filePath, zipName)
    outputPath = os.path.join(filePath, 'extracted')
    with zipfile.ZipFile(zipfilePath, 'r') as zipObject:
        listOfFileNames = zipObject.namelist()
        for fileName in listOfFileNames:
            baseName = os.path.basename(fileName)
            if re.match(zipRegex, baseName):
                fileCount += 1
                zipObject.extract(fileName, outputPath)
                
    print(fileCount, 'files extracted')

main()