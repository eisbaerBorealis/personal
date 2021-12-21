import math
import os
import random

filePath = os.path.dirname(__file__)

def main():
    file1 = 'captains.txt'
    file2 = 'players.txt'
    captainsPer = 2
    captains = []
    players = []
    finalTeams = []

    inputFilePath1 = os.path.join(filePath, file1)
    try:
        fp = open(inputFilePath1)
        for line in fp:
            line = line.rstrip()
            captains.append(line)
        fp.close()
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + file1 + " is in this program's folder and restart the program.")
    
    inputFilePath2 = os.path.join(filePath, file2)
    try:
        fp = open(inputFilePath2)
        for line in fp:
            line = line.rstrip()
            players.append(line)
        fp.close()
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + file1 + " is in this program's folder and restart the program.")

    for x in range(math.ceil(len(captains) / captainsPer)):
        finalTeams.append({
            'captains': [],
            'players': []
        })

    while len(captains) > 0:
        for x in range(captainsPer):
            captLen = len(captains)
            if captLen > 0:
                nextCaptIndex = random.randint(0, len(captains) - 1)
                nextCapt = captains[nextCaptIndex]
                finalTeams[captLen // captainsPer - 1]['captains'].append(nextCapt)
                captains.remove(nextCapt)
    
    while len(players) > 0:
        nextPlayerIndex = random.randint(0, len(players) - 1)
        nextPlayer = players[nextPlayerIndex]
        finalTeams[len(players) % len(finalTeams)]['players'].append(nextPlayer)
        players.remove(nextPlayer)

    print()
    for team in finalTeams:
        for captain in team['captains']:
            print(captain)
        for player in team['players']:
            print('\t' + player)

main()