def get_int(message):
	good_input = False
	while(not good_input):
		try:
			user_input = int(input(message))
			good_input = True
		except:
			print("Error: please enter an integer.")
	return user_input

def get_int_min(message, min):
	good_input = False
	while(not good_input):
		try:
			user_input = int(input(message))
			if(user_input >= min):
				good_input = True
			else:
				print("Error: please enter an integer of at least {}.".format(min))
		except:
			print("Error: please enter an integer.")
	return user_input