def main():
	user_input = input("Enter a sentence with multiple words: ")
	user_words = user_input.split()
	user_words.reverse()
	reversed_input = " ".join(user_words)
	print("Your reversed string: {}".format(reversed_input))
	
main()