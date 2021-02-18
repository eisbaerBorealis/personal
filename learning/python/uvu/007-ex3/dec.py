import pathlib

def track(fibCache):
    def func(f):
        def wrapper(*args,**kwargs):
            key = str(args) + str(kwargs)
            if key in fibCache:
                result = fibCache[key]
                print(args, kwargs, 'found in cache')
            else:
                result = f(*args,**kwargs)
                fib.count += 1
                fibCache[key] = result

            return result
        return wrapper
    return func

def log(f):
    def wrapper(*args,**kwargs):
        result = f(*args,**kwargs)

        with open(str(filePath) + "/" + fileName, 'a') as the_file:
            the_file.write(f.__name__ + '(' + str(args) + str(kwargs) + ') = ' + str(result) + '\n')

        return result
    return wrapper

numCache = {}
filePath = pathlib.Path(__file__).parent.absolute()
fileName = "log.txt"

@track(numCache)
@log
def fib(n):
    return n if n in (0,1) else fib(n-1) + fib(n-2)

fib.count = 0

print('{0}, calls = {1}'.format(fib(10), fib.count))