def perfect():
    x = 0
    while True:
        x += 2
        sum = 0
        for i in range(1, x//2+1):
            if x % i == 0:
                sum += i
        if sum == x:
            yield x

p = perfect()
for n in range(4):
    print(next(p))