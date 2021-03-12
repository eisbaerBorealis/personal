#include <iostream>
#include "bits.h"

using namespace std;

int main() {
    Bits test1 = Bits(182);

    cout << endl << endl;

    cout << "test1.size() is " << test1.size() << endl;
    cout << "test1 is " << test1 << endl;

    cout << "test1.at(3) is " << test1.at(3) << " (should be 0)" << endl;
    cout << "test1.at(4) is " << test1.at(4) << " (should be 1)" << endl;
    cout << "test1.at(31) is " << test1.at(31) << " (should be 0)" << endl;

    cout << endl;
    cout << "test1 is\t\t" << test1 << endl;
    
    test1.set(7);
    cout << "test.set(7):\t\t" << test1 << endl;
    test1.set(15);
    cout << "test.set(15):\t\t" << test1 << endl;

    test1.reset(0);
    cout << "test.reset(0):\t\t" << test1 << endl;
    test1.reset(4);
    cout << "test.reset(4):\t\t" << test1 << endl;

    test1.assign(47, 1);
    cout << "test1.assign(47, 1):\t" << test1 << endl;
    test1.assign(49, 1);
    cout << "test1.assign(49, 1):\t" << test1 << endl;
    test1.assign(47, 0);
    cout << "test1.assign(47, 0):\t" << test1 << endl;

    test1.set(0);
    cout << "test1.set(0):\t\t" << test1 << endl;
    test1.set(-1);
    cout << "test1.set(-1):\t\t" << test1 << endl;
    test1.set(-63);
    cout << "test1.set(-63):\t\t" << test1 << endl;
    test1.set(63);
    cout << "test1.set(63):\t\t" << test1 << endl;
    test1.set(64);
    cout << "test1.set(64):\t\t" << test1 << endl;
    test1.reset(63);
    cout << "test1.reset(63):\t" << test1 << endl;

    test1.toggle(15);
    cout << "test1.toggle(15):\t" << test1 << endl;
    test1.toggle(15);
    cout << "test1.toggle(15):\t" << test1 << endl;
    test1.toggle(15);
    cout << "test1.toggle(15):\t" << test1 << endl;
    test1.toggle(63);
    cout << "test1.toggle(63):\t" << test1 << endl;
    test1.toggle(1);
    cout << "test1.toggle(1):\t" << test1 << endl;
    test1.toggle(6);
    cout << "test1.toggle(6):\t" << test1 << endl;

    test1.shift(5);
    cout << "test1.shift(5):\t\t" << test1 << endl;
    test1.shift(-5);
    cout << "test1.shift(-5):\t" << test1 << endl;
    test1.shift(-2);
    cout << "test1.shift(-2):\t" << test1 << endl;

    test1.set(1);
    test1.set(3);
    test1.set(63);
    cout << "test1:\t\t\t" << test1 << endl;
    test1.rotate(5);
    cout << "test1.rotate(5):\t" << test1 << endl;
    test1.rotate(-7);
    cout << "test1.rotate(-7):\t" << test1 << endl;

    cout << endl << "test1.ones() is " << test1.ones() << " (should be 7)" << endl;
    cout << "test1.zeroes() is " << test1.zeroes() << " (should be 57)" << endl;

    test1.toggle();
    cout << "test1.toggle():\t" << test1 << endl;
    test1.toggle();
    cout << "test1.toggle():\t" << test1 << endl;


    cout << endl;
    cout << "test1:\t\t" << test1 << endl;
    test1.set();
    cout << "test.set():\t" << test1 << endl;
    test1.reset();
    cout << "test.reset():\t" << test1 << endl;

    long int testInt = 182;
    cout << "testInt == test1 is " << (testInt == test1) << endl;

    cout << endl;
    return 0;
}