#include <iostream>
#include <vector>

using namespace std;

void printRoster(vector<int> jerseys, vector<int> ratings) {
    cout << "ROSTER" << endl;
    for(int i = 0; i < jerseys.size(); i++) {
        cout << "Player " << (i + 1) << " -- Jersey number: ";
        cout << jerseys.at(i) << ", Rating: " << ratings.at(i) << endl;
    }
}

char getMenu() {
    cout << endl << "MENU" << endl;
    cout << "a - Add player" << endl;
    cout << "d - Remove player" << endl;
    cout << "u - Update player rating" << endl;
    cout << "r - Output players above a rating" << endl;
    cout << "o - Output roster" << endl;
    cout << "q - Quit" << endl << endl;
    cout << "Choose an option:" << endl;

    bool goodInput = false;
    string input;
    char choice;
    while(!goodInput) {
        cin >> input;
        if(input.length() != 1) {
            cout << "Invalid input, please enter a single character: ";
        } else { // single character
            choice = tolower(input.at(0));
            if(!(choice == 'a' || choice == 'd' || choice == 'u' ||
                 choice == 'r' || choice == 'o' || choice == 'q')) {
                cout << "Invalid input, please enter one of the menu options (a,d,u,r,o,q): ";
            } else {
                goodInput = true;
            }
        }
    }

    return choice;
}

int main() {
    vector<int> jerseys, ratings;
    int input, index;
    bool quit = false;
    char menu;
    
    for(int i = 0; i < 5; i++) {
        cout << "Enter player " << (i + 1) << "'s jersey number:" << endl;
        cin >> input;
        jerseys.push_back(input);

        cout << "Enter player " << (i + 1) << "'s rating:" << endl;
        cin >> input;
        ratings.push_back(input);

        cout << endl;
    }

    printRoster(jerseys, ratings);

    while(!quit) {
        switch(getMenu()) {
            case 'a': // Add player
                cout << "Enter a new player's jersey number:" << endl;
                cin >> input;
                jerseys.push_back(input);
                cout << "Enter the player's rating:" << endl;
                cin >> input;
                ratings.push_back(input);

                break;
            case 'd': // Remove player
                cout << "Enter a jersey number:" << endl;
                cin >> input;
                index = -1;
                for(int i = 0; i < jerseys.size(); i++) {
                    if(jerseys.at(i) == input) {
                        index = i;
                        i = jerseys.size();
                    }
                }
                jerseys.erase(jerseys.begin() + index);
                ratings.erase(ratings.begin() + index);
                break;
            case 'u': // Update player rating
                cout << "Enter a jersey number:" << endl;
                cin >> input;
                index = -1;
                for(int i = 0; i < jerseys.size(); i++) {
                    if(jerseys.at(i) == input) {
                        index = i;
                        i = jerseys.size();
                    }
                }
                cout << "Enter a new rating for player:" << endl;
                cin >> input;
                ratings.at(index) = input;
                break;
            case 'r': // Output players above a rating
                cout << "Enter a rating:" << endl;
                cin >> input;
                cout << "ABOVE " << input << endl;
                for(int i = 0; i < jerseys.size(); i++) {
                    if(ratings.at(i) > input) {
                        cout << "Player " << (i + 1) << " -- Jersey number: ";
                        cout << jerseys.at(i) << ", Rating: " << ratings.at(i) << endl;
                    }
                }
                break;
            case 'o': // Output roster
                printRoster(jerseys, ratings);
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