def main():
	quit = False
	options = ['rock', 'paper', 'scissors']
	
	print('Welcome to Rock, Paper, Scissors!')
	
	while(not quit):
		good_input = False
		while(not good_input):
			input1 = input('Player 1, enter "rock", "paper", or "scissors": ').lower()
			if(input1 in options):
				good_input = True
			else:
				print('Please enter one of the options.')
		
		good_input = False
		while(not good_input):
			input2 = input('Player 2, enter "rock", "paper", or "scissors": ').lower()
			if(input2 in options):
				good_input = True
			else:
				print('Please enter one of the options.')
		
		result = options.index(input1) - options.index(input2)
		# same = 0 (tie)
		# rock and paper = -1 (loss)
		# paper and rock = 1 (win)
		# rock and scissors = -2 (win)
		if(result < 0):
			result += 3
		
		if(result == 0):
			print('It was a tie! Both players chose {}'.format(input1))
		elif(result == 1):
			print('Player 1 won by choosing {} against Player 2\'s {}'.format(input1, input2))
		else: # result == 2
			print('Player 2 won by choosing {} against Player 1\'s {}'.format(input2, input1))
		
		good_input = False
		while(not good_input):
			input3 = input('Would you like to play again? (Y/N) ').lower()
			if(input3 == 'y'):
				good_input = True
			elif(input3 == 'n'):
				print('Thank you for playing!')
				quit = True
				good_input = True
			else:
				print('Bad input. Please enter \'y\' or \'n\'')

main()