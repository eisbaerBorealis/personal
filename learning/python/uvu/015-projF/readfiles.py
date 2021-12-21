import os
import sqlite3
import sys

# $ py readfiles.py Stuff

filePath = os.getcwd()

def main():
    stuffPath = os.path.join(filePath, sys.argv[1], '')
    conn = sqlite3.connect('filesdb.db')
    cursor = conn.cursor()
    cursor.execute('DROP table IF EXISTS files')
    cursor.execute('CREATE TABLE files (ext text, path text, fname text)')

    for subdir, dirs, files in os.walk(stuffPath):
        for file in files:
            if file[0] != '.' and file[0] != '_':
                extension = 'NULL'
                if "." in file:
                    extension = "'" + file.split('.')[-1] + "'"
                cursor.execute('INSERT INTO files VALUES (' + extension + ',\'' + subdir + '\',\'' + file + '\')')
    
    cursor.execute('SELECT * FROM files')
    rows = cursor.fetchall()

    outFile = open("files-part1.txt","w")
    for row in rows:
        outFile.write(str(row))
        outFile.write('\n')
    outFile.close()

    conn.commit()
    conn.close()
    print('filesdb created')

main()