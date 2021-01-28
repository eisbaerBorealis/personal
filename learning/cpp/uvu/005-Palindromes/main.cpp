#include <iostream>
#include <string>
#include <cctype>
using namespace std;

int main() {
   string input;
   cout << "Enter your string to test: ";
   getline(cin, input);

   string testString = input;
   
   // remove spaces
   int spaceIndex = testString.find(" ");
   while(spaceIndex != -1) {
      testString = testString.substr(0, spaceIndex) + testString.substr(spaceIndex + 1, -1);
      spaceIndex = testString.find(" ");
   }
   
   bool isPal = true;
   
   for(int i = 0; i < (int)testString.length() / 2 + 1; i++) {
      if(testString.at(i) != testString.at(testString.length() - 1 - i)) {
         isPal = false;
      }
   }
   
   if(isPal) {
      cout << "palindrome: " << input << endl;
   } else {
      cout << "not a palindrome: " << input << endl;
   }

   return 0;
}