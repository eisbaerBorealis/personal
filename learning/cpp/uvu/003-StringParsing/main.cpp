// Terminal > Run Build Task > g++.exe build active file
// open terminal, navigate to folder, run ".\filename"

#include <iostream>
#include <string>
using namespace std;

int main() {

    string fullName, firstName, midName, lastName;
    string temp1;
    int i;

    getline (cin, fullName);
    // example: Pat Silly Doe
    i = fullName.find(" ");
    //    cout << "i is " << i << endl;
    firstName = fullName.substr(0, i);
    temp1 = fullName.substr(i+1, -1);
    //    cout << "firstName is \"" << firstName << "\", temp1 is \"" + temp1 + "\".";

    i = temp1.find(" ");
    if(i == std::string::npos) {
        midName = "";
        lastName = temp1;
    } else {
        midName = temp1.substr(0, i);
        lastName = temp1.substr(i+1, -1);
    }

        cout << lastName << ", " << firstName.at(0) << ".";

    if(midName != "") {
        cout << midName.at(0) << ".";
    }
    cout << endl;

    return 0;
}