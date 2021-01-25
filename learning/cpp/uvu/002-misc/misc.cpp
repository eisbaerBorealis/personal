#include <iomanip>
#include <iostream>
using namespace std;

int main() {
    float x = 2147483647.0;
    cout << fixed << setprecision(16);
    cout << x << endl;         // First output
    cout << x+128.0f << endl;  // Second output
    cout << x+129.0f << endl;  // Third output
}