#include <algorithm>
#include <ctime>
#include <fstream>
#include <iostream>
#include <string>
#include <vector>

using std::string;

bool isSubset(string str1, string str2);
string sortChars(string input);
bool wordSort(string str1, string str2);

// open terminal, navigate to folder
//  g++ .\main.cpp
//  .\a.exe

bool isSubset(string str1, string str2) {
    // is str1 made up of letters from str2?
    // example: rub, burner
    const int MIN_SIZE = 3;
    bool isSubset = true;

    // make sure str1 isn't smaller than MIN_SIZE and isn't bigger than str2
    if(str1.length() < MIN_SIZE || str1.length() > str2.length()) {
        isSubset = false;
    } else {
        // make sure each letter in str1 exists in str2
        for(int i = 0; i < str1.length(); i++) {
            if(str2.find(str1.at(i)) == string::npos) {
                isSubset = false;
                i = str1.length();
            }
        }
        // make sure there are at least as many of each character
        if(isSubset) {
            str1 = sortChars(str1);
            str2 = sortChars(str2);

            int j = 0;
            for(int i = 0; i < str1.length(); i++) {
                if(j > str2.length() - 1) {
                    isSubset = false;
                    i = str1.length();
                } else {
                    while(j < str2.length() - 1 && str1.at(i) != str2.at(j)) {
                        j++;
                    }
                    if(str1.at(i) == str2.at(j)) {
                        j++;
                    } else {
                        isSubset = false;
                        i = str1.length();
                    }
                }
            }
        }
    }

    return isSubset;
}

string sortChars(string input) {
    for(int i = 0; i < input.length() - 1; i++) {
        for(int j = 0; j < input.length() - i - 1; j++) {
            if(input.at(j) > input.at(j + 1)) {
                char temp = input.at(j + 1);
                input.replace(j + 1, 1, 1, input.at(j));
                input.replace(j, 1, 1, temp);
            }
        }
    }
    return input;
}

bool wordSort(string str1, string str2) {
    bool returnVal = false;
    if(str1.length() > str2.length()) {
        returnVal = false;
    } else if(str1.length() < str2.length()) {
        returnVal = true;
    } else {
        for(int i = 0; i < str1.length(); i++) {
            if(str1.at(i) > str2.at(i)) {
                returnVal = false;
                i = str1.length();
            } else if(str1.at(i) < str2.at(i)) {
                returnVal = true;
                i = str1.length();
            }
        }
    }
    return returnVal;
}

int main() {
    std::vector<string> words;

    std::ifstream file("words.txt");
    string str;
    while(std::getline(file, str)) {
        words.push_back(str);
    }

    int wordCount = words.size();
    string randWord;
    srand(time(NULL));
    rand(); // First random call doesn't seem to be random
            // circularizing, circumcising, circumflex, etc.
    do {
        int randNum = rand() % wordCount;
        randWord = words.at(randNum);
        // randWord = "rehearings";
    }
    while (randWord.length() < 3);

    std::cout << "The word is " << randWord << ":\n" << std::endl;

    std::vector<string> results;
    for(int i = 0; i < words.size(); i++) {
        if(isSubset(words.at(i), randWord)) {
            results.push_back(words.at(i));
        }
    }

    sort(results.begin(), results.end(), wordSort);
    
    for(int i = 0; i < results.size(); i++) {
        std::cout << results.at(i) << std::endl;
    }

    return 0;
}