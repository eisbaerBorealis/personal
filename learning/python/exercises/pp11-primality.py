import math

def main():
	isPrime = True
	user_int = get_int("Choose a number: ")
	square_root = int(math.sqrt(user_int))
	for x in range(square_root + 1):
		if(x > 1 and (x % 2 == 1 or x == 2)):
			if(user_int % x == 0):
				isPrime = False
				break
	
	if(isPrime):
		print("Your number, {}, is prime!".format(user_int))
	else:
		print("Your number, {}, is not prime.".format(user_int))

def get_int(message):
	good_input = False
	while(not good_input):
		try:
			user_input = int(input(message))
			good_input = True
		except:
			print("Error: please enter an integer.")
	return user_input

main()