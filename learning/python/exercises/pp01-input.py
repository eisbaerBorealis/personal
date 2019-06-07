def main():
	input_name = input("What is your name? ")
	
	good_input = False
	
	while(not good_input):
		try:
			input_birth_year = int(input("In which year were you born? "))
			if(input_birth_year > 1900 and input_birth_year < 2019):
				good_input = True
			else:
				print('Error: birth year must be between 1900 and 2019.')
		except:
			print('Error: must enter an integer for your birth year.')
	
	print('Thank you, {}. You will turn 100 in {}.'.format(input_name, input_birth_year + 100)) 

main()

# Exercises found here:
#  https://www.practicepython.org/