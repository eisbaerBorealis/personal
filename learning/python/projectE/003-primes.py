import random
import math

# https://www.geeksforgeeks.org/pollards-rho-algorithm-prime-factorization/

def modular_pow(base, exponent, modulus):
    result = 1

    while exponent > 0:
        if exponent & 1: # exponent % 2 == 1
            result = (result * base) % modulus
        exponent = exponent >> 1
        base = (base * base) % modulus

    return result

def PollardRho(n):
    result = n
    if n != 1:
        # if n % 2 == 0:
        #     result = 2

        x = random.randint(2,n-1)
        y = x
        c = random.randint(1,n-1)
        d = 1

        while d == 1:
            x = (modular_pow(x, 2, n) + c + n) % n
            y = (modular_pow(y, 2, n) + c + n) % n
            y = (modular_pow(y, 2, n) + c + n) % n
            d = math.gcd(abs(x - y), n)

            if (d == n):
                d = 1
                result = PollardRho(n)

    return result


# print('Random example:', random.randint(1, 10000))

# print('7 & 1 is', 7 & 1)
# print('159 & 1 is', 159 & 1)
# print('128 & 1 is', 128 & 1)
# print('2 & 1 is', 2 & 1)

x = 600851475143
count = 10

for i in range(count):
    print(PollardRho(x))