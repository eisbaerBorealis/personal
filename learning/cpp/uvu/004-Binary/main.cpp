#include <bitset>
#include <iostream>
#include <string>
using namespace std;

int main() {
    cout << "Enter the integer that holds the bits: 400000" << endl;
    unsigned int n;
    // cin >> n;
    // 60000 3 11 -> 332
    // 400000 10 20 -> 390
    n = 400000;

    cout << "Enter the rightmost bit position: 10" << endl;
    unsigned int k;
    // cin >> k;
    k = 10;

    cout << "Enter the leftmost bit position: 20" << endl;
    unsigned int m;
    // cin >> m;
    m = 20;

    bitset<32>binary(n);
    // cout << endl << binary << endl;
    string tempBinary = binary.to_string();
    // cout << "tempBinary is " << tempBinary << endl;
    string trimmedBinary = tempBinary.substr(33-k-m, m-1);
    // cout << "trimmedBinary is " << trimmedBinary << endl;
    bitset<32>newBinary(trimmedBinary);
    // cout << "newBinary is " << newBinary << endl;

    cout << "Extracting bits " << k << " through " << m << " from " << n;
    cout << " = " << binary << ":" << endl;
    cout << "Result = " << newBinary.to_ulong() << " = " << newBinary << endl;
}