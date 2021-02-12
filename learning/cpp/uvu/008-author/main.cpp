#include <iostream>
#include <string>
using namespace std;

string PrintMenu(string parameter) {
    cout << endl << "MENU" << endl;
    cout << "c - Number of non-whitespace characters" << endl;
    cout << "w - Number of words" << endl;
    cout << "f - Find text" << endl;
    cout << "r - Replace all !'s" << endl;
    cout << "s - Shorten spaces" << endl;
    cout << "q - Quit" << endl << endl;
    cout << "Choose an option:" << endl;

    bool goodInput = false;
    string input;
    char choice;
    while(!goodInput) {
        cin >> input;
        if(input.length() != 1) {
            // cout << "Invalid input, please enter a single character: ";
        } else { // single character
            choice = tolower(input.at(0));
            if(!(choice == 'c' || choice == 'w' || choice == 'f' ||
                 choice == 'r' || choice == 's' || choice == 'q')) {
                // cout << "Invalid input, please enter one of the menu options (c,w,f,r,s,q): ";
            } else {
                goodInput = true;
            }
        }
    }

    string strChoice = "";
    strChoice.push_back(choice);
    return strChoice;
}

int GetNumOfNonWSCharacters(const string userInput) {
    int charCount = 0;

    for(size_t i = 0; i < userInput.length(); i++) {
        if(userInput.at(i) != ' ') {
            charCount++;
        }
    }

    return charCount;
}

int GetNumOfWords(const string userInput) {
    int wordCount = 0;
    long unsigned int spaceIndex = 0;

    while(spaceIndex != string::npos) {
        spaceIndex = userInput.find(' ', spaceIndex + 1); // wordCount = 0, spaceIndex = 5
        if(userInput.find(' ', spaceIndex + 1) - spaceIndex > 1) {
            wordCount++;
        }
    }

    return wordCount;
}

int FindText(const string searchText, const string userInput) {
    int phraseCount = 0;
    long unsigned int phraseIndex = -1;

    // Sorry! I need the long unsigned int so that it doesn't complain when I compare to string::npos
    //  And then for some reason find returns 4294967295
    do {
        phraseIndex = userInput.find(searchText, phraseIndex + 1); // phraseCount = 0, phraseIndex = 50
        if(phraseIndex != string::npos && phraseIndex < 100000000) {
            phraseCount++;
        }
    } while(phraseIndex != string::npos && phraseIndex < 100000000);

    return phraseCount;
}

// string ReplaceExclamation(string userInput) {
void ReplaceExclamation(string& userInput) {
    for(size_t i = 0; i < userInput.length(); i++) {
        if(userInput.at(i) == '!') {
            userInput.at(i) = '.';
        }
    }
}

void ShortenSpace(string& userInput) {
    for(size_t i = 0; i < userInput.length(); i++) {
        if(userInput.at(i) == ' ' && userInput.at(i + 1) == ' ') {
            userInput = userInput.substr(0, i) + userInput.substr(i + 1, -1);
            i--;
        }
    }
}

/*
    Assignment test text:

    We'll continue our quest in space.  There will be more shuttle 
    flights and more shuttle crews and,  yes,  more volunteers, more 
    civilians,  more teachers in space.  Nothing ends here;  our hopes 
    and our journeys continue!
*/

int main() {
    string userInput;
    bool quit = false;
    string searchInput;

    cout << "Enter a sample text:" << endl << endl;

    getline(cin, userInput);

    cout << "You entered: " << userInput << endl;

    while(!quit) {
        string tempChoice = PrintMenu("dumb");
        char menuChoice = tempChoice.at(0);

        switch(menuChoice) {
            case 'c': // Number of non-whitespace characters
                cout << "Number of non-whitespace characters: ";
                cout << GetNumOfNonWSCharacters(userInput) << endl;

                break;
            case 'w': // Number of words
                cout << "Number of words: ";
                cout << GetNumOfWords(userInput) << endl;

                break;
            case 'f': // Find text
                cout << "Enter a word or phrase to be found:" << endl;
                cin.ignore();
                getline(cin, searchInput);
                cout << "\"" << searchInput << "\" instances: " << FindText(searchInput, userInput) << endl;
            
                break;
            case 'r': // Replace all !'s
                ReplaceExclamation(userInput);
                cout << "Edited text: " << userInput << endl;
            
                break;
            case 's': // Shorten spaces
                ShortenSpace(userInput);
                cout << "Edited text: " << userInput << endl;
            
                break;
            case 'q': // Quit
                quit = true;
                break;
            default:
                cout << "ERROR: default block in switch statement.";
                break;
        }
    }

    return 0;
}