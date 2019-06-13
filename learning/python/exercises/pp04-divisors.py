def main():
	list1 = []
	
	good_input = False
	
	while(not good_input):
		try:
			input_num = int(input("Please enter a positive number: "))
			if(input_num < 2):
				print('Error: please make your number at least 2.')
			else:
				good_input = True
		except:
			print('Error: must enter an integer.')
	
	for x in range(input_num):
		if(input_num % (x + 1) == 0):
			list1.append(x + 1)
	print('Here are all the divisors of your number: {}'.format(list1))

main()