def main():
	list1 = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
	list2 = []
	
	good_input = False
	
	while(not good_input):
		try:
			input_num = int(input("Please enter a number: "))
			good_input = True
		except:
			print('Error: must enter an integer.')
	
	print('Original list: {}'.format(list1))
	
	for x in list1:
		if(x < input_num):
			list2.append(x)
	print('New list of numbers less than your number: {}'.format(list2))

main()