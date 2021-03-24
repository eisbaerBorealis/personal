#include <iostream>
#include <string>

// using namespace std;

int DateParser(std::string month) {
	int monthInt = 0;
	
	if (month == "January")
		monthInt = 1;
	else if (month == "February")
		monthInt = 2;
	else if (month == "March")
		monthInt = 3;
	else if (month == "April")
		monthInt = 4;
	else if (month == "May")
		monthInt = 5;
	else if (month == "June")
		monthInt = 6;
	else if (month == "July")
		monthInt = 7;
	else if (month == "August")
		monthInt = 8;
	else if (month == "September")
		monthInt = 9;
	else if (month == "October")
		monthInt = 10;
	else if (month == "November")
		monthInt = 11;
	else if (month == "December")
		monthInt = 12;
	return monthInt;
}

/*
Ex: If the input is:

March 1, 1990
April 2 1995
7/15/20
December 13, 2003
-1
then the output is:

3/1/1990
12/13/2003

//*/

int main () {
	std::string userInput = "";

    while(userInput != "-1") {
        std::getline(std::cin, userInput);
        if(userInput != "-1" && userInput.find(' ') != std::string::npos && userInput.find(',') != std::string::npos) {
            int spaceOne = userInput.find(' ');
            int spaceTwo = userInput.find(' ', spaceOne + 1);
            std::string monthStr = userInput.substr(0, spaceOne);

            int month = DateParser(monthStr);
            int day = std::stoi(userInput.substr(spaceOne + 1, spaceTwo - 2 - spaceOne));
            int year = std::stoi(userInput.substr(spaceTwo + 1));

            std::cout << month << '/' << day << '/' << year << std::endl;
        }
    }
}
