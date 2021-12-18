def isPrime(n):
    result = True

    i = (int)(n**0.5) + 1

    while result and i > 1:
        if n % i == 0:
            result = False
        else:
            i -= 1

    return result

print('Hello world')
x = 600851475143
# print('is 600851475143 prime?', isPrime(600851475143))
# x = 35

i = x // 2 + 1

answer = None
while answer == None:
    if i % 1000000 == 0:
        print('  DEBUG: i is', i)
    if x % i == 0:
        answer = i
    else:
        i -= 1

print('answer is', answer)

# print('is 13 prime?', isPrime(13))
# print('is 27 prime?', isPrime(27))