from pp_utility import get_int_min

def main():
	# 1, 1, 2, 3, 5, 8, 13, …
	user_int = get_int_min("How many numbers in the fibonacci would you like to generate? ", 1)
	
	fib_1 = 1
	fib_2 = 1
	fib_nums = []
	
	for x in range (user_int):
		if(x < 2):
			fib_nums.append(fib_1)
		else:
			fib_3 = fib_1 + fib_2
			fib_nums.append(fib_3)
			fib_1 = fib_2
			fib_2 = fib_3
	print("Here are the first {} numbers in the fibonacci sequence: {}".format(user_int, fib_nums))

main()