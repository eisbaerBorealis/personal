def main():
	good_input = False
	
	while(not good_input):
		try:
			input_num = int(input("Please enter a number: "))
			good_input = True
		except:
			print('Error: must enter an integer.')
	
	if(input_num % 2 == 0):
		print('Your number is even.')
		if(input_num % 4 == 0):
			print('In fact, your number is also divisible by four!')
	else:
		print('Your number is odd.')

main()