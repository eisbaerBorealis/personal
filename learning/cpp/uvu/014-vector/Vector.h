/**
 * Author: Jesse Howell
 * 
 *   I declare that the following source code was written solely by me.
 *   I understand that copying any source code, in whole or in part,
 *   constitutes cheating, and that I will receive a zero on this
 *   project if I am found in violation of this policy.
 * 
 */

#ifndef VECTOR_H
#define VECTOR_H

#include <cstddef>
#include <stdexcept>
#include <iostream>
using std::size_t;

class Vector {
    enum {CHUNK = 10};
    int* data_ptr;      // Pointer to the heap array
    size_t capacity;    // Size of the current array allocation (total number of ints, in use or not)
    size_t n_elems;     // Number of int spaces currently in use, starting from position 0
    const double GROWTH = 1.6;
    void grow();

public:
    // Object Mgt.
    Vector();
    Vector(const Vector& v);            // Copy constructor
    Vector& operator=(const Vector& v); // Copy assignment operator
    ~Vector();

    // Accessors
    int front() const;                  // Return the int in position 0, if any
    int back() const;                   // Return last element (position n_elems-1)
    int at(size_t pos) const;           // Return element in position "pos" (0-based)
    size_t size() const;                // Return n_elems
    bool empty() const;                 // Return n_elems == 0

    // Mutators
    int& operator[](size_t pos);        // Same as at but no bounds checking
    void push_back(int item);           // Append a new element at the end of the array
    void pop_back();                    // --n_elems (nothing else to do; returns nothing)
    void erase(size_t pos);             // Remove item in position pos and shuffles following items left
    void insert(size_t pos, int item);  // Shuffle items right to make room for a new element
    void clear();                       // n_elems = 0 (nothing else to do; keep the current capacity)

    // Iterators
    int* begin();                       // Return a pointer to 1st element, or nullptr if n_elems == 0
    int* end();                         // Return a pointer to 1 past last element, or nullptr if n_elems == 0

    // Comparators
    bool operator==(const Vector& v) const;
    bool operator!=(const Vector& v) const;
};

Vector::Vector() {
    capacity = CHUNK;
    data_ptr = new int[capacity];
    n_elems = 0;
}

// Copy constructor
Vector::Vector(const Vector& v) {
    capacity = v.capacity;
    delete[] data_ptr;
    data_ptr = new int[capacity];
    n_elems = v.n_elems;

    for(int i = 0; i < n_elems; i++) {
        data_ptr[i] = v.data_ptr[i];
    }
}

// Copy assignment operator
Vector& Vector::operator=(const Vector& v) {
    capacity = v.capacity;
    delete[] data_ptr;
    data_ptr = new int[capacity];
    n_elems = v.n_elems;

    for(int i = 0; i < n_elems; i++) {
        data_ptr[i] = v.data_ptr[i];
    }

    return *this;
}

Vector::~Vector() {
    delete[] data_ptr;
}

// Return the int in position 0, if any
int Vector::front() const {
    if(n_elems < 1) {
        throw std::range_error("Position outside of range.");
    } else {
        return data_ptr[0];
    }
}

// Return last element (position n_elems-1)
int Vector::back() const {
    if(n_elems < 1) {
        throw std::range_error("Position outside of range.");
    } else {
        return data_ptr[n_elems - 1];
    }
}

// Return element in position "pos" (0-based)
int Vector::at(size_t pos) const {
    if(pos >= n_elems) {
        throw std::range_error("Position outside of range.");
    } else {
        return data_ptr[pos];
    }
}

// Return n_elems
size_t Vector::size() const {
    return n_elems;
}

// Return n_elems == 0
bool Vector::empty() const {
    return n_elems == 0;
}

// Same as at but no bounds checking
int& Vector::operator[](size_t pos) {
    return data_ptr[pos];
}

// Append a new element at the end of the array
void Vector::push_back(int item) {
    if(n_elems == capacity) {
        grow();
    }
    data_ptr[n_elems] = item;
    n_elems++;
}

// --n_elems (nothing else to do; returns nothing)
void Vector::pop_back() {
    if(n_elems < 1) {
        throw std::range_error("Position outside of range.");
    } else {
        n_elems--;
    }
}

// Remove item in position pos and shuffles following items left
void Vector::erase(size_t pos) {
    if(pos >= n_elems) {
        throw std::range_error("Position outside of range.");
    } else {
        data_ptr[pos];
        for(int i = pos; i < n_elems; i++) {
            data_ptr[i] = data_ptr[i + 1];
        }
        n_elems--;
    }
}

// Shuffle items right to make room for a new element
void Vector::insert(size_t pos, int item) {
    if(n_elems == capacity) {
        grow();
    }
    for(int i = n_elems; i > pos; i--) {
        data_ptr[i] = data_ptr[i - 1];
    }
    data_ptr[pos] = item;
    n_elems++;
}

// n_elems = 0 (nothing else to do; keep the current capacity)
void Vector::clear() {
    n_elems = 0;
}

// Return a pointer to 1st element, or nullptr if n_elems == 0
int* Vector::begin() {
    if(n_elems == 0) {
        return nullptr;
    } else {
        return &data_ptr[0];
    }
}

// Return a pointer to 1 past last element, or nullptr if n_elems == 0
int* Vector::end() {
    if(n_elems == 0) {
        return nullptr;
    } else {
        return &data_ptr[n_elems];
    }
}

bool Vector::operator==(const Vector& v) const {
    bool isEqual = true;

    if(capacity != v.capacity) {
        isEqual = false;
    } else if(n_elems != v.n_elems) {
        isEqual = false;
    } else{
        for(int i = 0; i < n_elems; i++) {
            if(data_ptr[i] != v.data_ptr[i]) {
                isEqual = false;
                i = n_elems;
            }
        }
    }

    return isEqual;
}

bool Vector::operator!=(const Vector& v) const {
    return !(*this == v);
}

// Copy assignment operator
void Vector::grow() {
    capacity *= GROWTH;
    int* temp = new int[capacity];

    for(int i = 0; i < n_elems; i++) {
        temp[i] = data_ptr[i];
    }

    delete[] data_ptr;
    data_ptr = temp;

    std::cout << "grow" << std::endl;
}

#endif