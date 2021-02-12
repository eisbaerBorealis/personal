#include <iostream>
#include <vector>
#include <string>
using namespace std;

int FindWordInWordList(vector<string> wordList, string wordToFind) {
    int indexFound = -1;
    for(unsigned int i = 0; i < wordList.size(); i++) {
        if(wordList.at(i).compare(wordToFind) == 0) {
            indexFound = i;
            i = wordList.size();
        }
    }
    return indexFound;
}

int main() {
    string input1, input2;
    vector<string> swapWords, sentence;
    int swapCount, sentLen;
    
    // cout << "Enter the number of word pairs, followed by each pair, comma separated:" << endl;
    // 3   automobile car   manufacturer maker   children kids
    getline(cin, input1);
    
    // cout << "Enter the number of words in the sentence, followed by the sentence:" << endl;
    // 15 The automobile manufacturer recommends car seats for children if the automobile doesn't already have one.
    getline(cin, input2);

    string tempSubStr = input1;
    int spaceIndex = tempSubStr.find(" ");

    swapCount = stoi(tempSubStr.substr(0, spaceIndex));
    tempSubStr = tempSubStr.substr(spaceIndex + 1, -1);
    spaceIndex = tempSubStr.find(" ");
    do {
        if(spaceIndex > 0) {
            swapWords.push_back(tempSubStr.substr(0, spaceIndex));
        }
        tempSubStr = tempSubStr.substr(spaceIndex + 1, -1);
        spaceIndex = tempSubStr.find(" ");
    } while(spaceIndex > -1);
    swapWords.push_back(tempSubStr);

    tempSubStr = input2;
    spaceIndex = tempSubStr.find(" ");
    sentLen = stoi(tempSubStr.substr(0, spaceIndex));
    tempSubStr = tempSubStr.substr(spaceIndex + 1, -1);
    spaceIndex = tempSubStr.find(" ");
    do {
        if(spaceIndex > 0) {
            sentence.push_back(tempSubStr.substr(0, spaceIndex));
        }
        tempSubStr = tempSubStr.substr(spaceIndex + 1, -1);
        spaceIndex = tempSubStr.find(" ");
    } while(spaceIndex > -1);
    sentence.push_back(tempSubStr);
    for(int i = 0; i < swapCount; i++) {
        int wordIndex = FindWordInWordList(sentence, swapWords.at(i * 2));
        while(wordIndex > -1) {
            sentence.at(wordIndex) = swapWords.at(i * 2 + 1);
            wordIndex = FindWordInWordList(sentence, swapWords.at(i * 2));
        }
    }
    for(int i = 0; i < sentLen; i++) {
        cout << sentence.at(i) << " ";
    }
    cout << endl;

    return 0;
}
