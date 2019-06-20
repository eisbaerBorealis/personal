import random

def main():
	game_over = False
	correct_num = random.randint(1, 9)
	guesses = 0
	
	print('Welcome to Number Guesser! I have chosen a number between 1 and 9, and you must guess it!')
	while(not game_over):
		good_input = False
		while(not good_input):
			user_input = input('Enter your guess, or type "exit" to quit. ')
			try:
				user_input = int(user_input)
				if(user_input < 1 or user_input > 9):
					print('Error, please guess a number within the correct range.')
				else:
					good_input = True
					guesses += 1
					
					if(user_input == correct_num):
						game_over = True
					elif(user_input < correct_num):
						print('My number is higher than that!')
					elif(user_input > correct_num):
						print('My number is lower than that!')
					else:
						print('Error! This should not have happened.')
			except:
				user_input = user_input.lower()
				if(user_input == "exit"):
					good_input = True
					game_over = True
				else:
					print('Error, please enter an integer.')
	if(user_input == "exit"):
		print('Sorry! My number was {}. You gave up after {} guesses'.format(correct_num, guesses))
	elif(user_input == correct_num):
		print('Correct! My number was {}. You guessed it after {} guesses.'.format(correct_num, guesses))

main()