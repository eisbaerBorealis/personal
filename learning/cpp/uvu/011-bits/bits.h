#include <math.h>
#include <ostream>

// using namespace std;

class Bits {
    using IType = unsigned long long;
    enum {NBITS = sizeof(IType)*8};
    IType bits = 0;

public:
    Bits() = default;
    Bits(IType n) {
        bits = n;
    }

    static int size() {
        return NBITS;
    }

    // Returns (tests) the bit at bit position pos
    bool at(int pos) const {
        if(size() <= pos || pos < 0) {
            return 0;
        } else if(pos == size() - 1) {
            return (bits / IType(pow(2, pos))) == 1;
            // return false;
        } else {
            return (bits % IType(pow(2, pos + 1)) / IType(pow(2, pos))) == 1;
            // return false;
        }
    }   

    // Sets the bit at position pos
    void set(int pos) {
        assign(pos, 1);
    }

    // Sets all bits
    void set() {
        bits = 0 - 1;
    }

    // Resets (makes zero) the bit at position pos
    void reset(int pos) {
        assign(pos, 0);
    }

    // Resets all bits
    void reset() {
        bits = 0;
    }
    
    // Sets or resets the bit at position pos depending on val
    void assign(int pos, bool val) {
        if(0 <= pos && pos <= size() - 1){
            if(val && !at(pos)) {
                bits += IType(pow(2, pos));
            } else if(!val && at(pos)) {
                bits -= IType(pow(2, pos));
            }
        }
    }

    // Replaces the underlying integer with n
    void assign(IType n) {
        bits = n;
    }

    // Flips the bit at position pos
    void toggle(int pos) {
        bool curBit = at(pos);
        assign(pos, !curBit);
    }

    // Flips all bits
    void toggle(){
        for(int i = 0; i < size(); i++) {
            toggle(i);
        }
    }

    // If n > 0, shifts bits right n places; if n < 0, shifts left
    void shift(int n) {
        if(n > 0) {
            bits = bits >> n;
        } else {
            bits = bits << n * -1;
        }
    }

    // If n > 0, rotates right n places; if n < 0, rotates left
    void rotate(int n) {
        if(n > 0) {
            bits = (bits >> n)|(bits << (size() - n));
        } else {
            bits = (bits << n*-1)|(bits >> (size() - (n*-1)));
        }
    }

    // Returns how many bits are set in the underlying integer
    int ones() const {
        int onesCount = 0;

        for(int i = 0; i < size(); i++) {
            if(at(i)) {
                onesCount++;
            }
        }

        return onesCount;
    }

    // Returns how many bits are reset in the underlying integer
    int zeroes() const {
        return NBITS - ones();
    }

    IType to_int() const {
        return bits;
    }

    friend std::ostream& operator<< (std::ostream &out, Bits const& data) {
        for(int i = size() - 1; i >= 0; i--) {
            out << data.at(i);

            if(i % 8 == 0 && i > 0) {
                out << " ";
            }
        }
        out << "Test";

        return out;
    }

    bool operator==(const Bits& bitsA) const {
        return bitsA.to_int() == to_int();
    }

    bool operator!=(const Bits& bitsA) const {
        return bitsA.to_int() != to_int();
    }

    bool operator==(long int bitsA) const {
        return IType(bitsA) == to_int();
    }

    bool operator!=(long int  bitsA) const {
        return IType(bitsA) != to_int();
    }

    friend bool operator==(long int bitsA, const Bits& bitsB) {
        return IType(bitsA) == bitsB.to_int();
    }

    friend bool operator!=(long int  bitsA, const Bits& bitsB) {
        return IType(bitsA) != bitsB.to_int();
    }
};