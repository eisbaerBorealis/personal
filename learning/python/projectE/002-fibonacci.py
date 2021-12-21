# Find sum of even fibonacci numbers under the max

max = 1000000

fib1 = 1
fib2 = 2

sum = 0

while fib2 < max:
    if fib2 % 2 == 0:
        sum += fib2
    fib1, fib2 = fib2, fib1 + fib2

print(sum)
