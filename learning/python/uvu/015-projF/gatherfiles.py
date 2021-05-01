import os
import sqlite3
import sys
import zipfile

# $ py gatherfiles.py filesdb cpp py

filePath = os.getcwd()
strOffset = len(filePath) + 7 # '\Stuff\'

def main():
    dbName = sys.argv[1] + '.db'
    exts = []
    extCounts = {}
    for i in range(2, len(sys.argv)):
        ext = sys.argv[i]
        exts.append(ext)
        if ext not in extCounts:
            extCounts[ext] = 0

    conn = sqlite3.connect('filesdb.db')
    cursor = conn.cursor()

    for ext in exts:
        zFile = zipfile.ZipFile(ext + '.zip', mode='w')

        cursor.execute('SELECT * FROM files WHERE ext=\'' + ext + '\'')
        rows = cursor.fetchall()
        
        os.chdir(os.path.join(filePath, 'Stuff'))
        for row in rows:
            extCounts[ext] += 1
            path1 = row[1][strOffset:]
            zipFilePath = os.path.join(path1, row[2])
            zFile.write(zipFilePath)
        os.chdir(filePath)

        print(extCounts[ext], ext, 'files gathered')

    conn.close()

main()