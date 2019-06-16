def main():
	good_input = False
	
	while(not good_input):
		input_text = input("Please enter a word: ")
		if(int(len(input_text) > 0)):
			good_input = True
	
	is_palindrome = True
	size = int(len(input_text))
	
	if(size % 2 == 1):
		half_size = int((size - 1) / 2)
	else:
		half_size = int(size / 2)
	
	for c in range(half_size):
		if(input_text[c] != input_text[size - 1 - c]):
			is_palindrome = False
	
	if(is_palindrome):
		print('The word "{}" is a palindrome.'.format(input_text))
	else:
		print('The word "{}" is not a palindrome.'.format(input_text))

main()