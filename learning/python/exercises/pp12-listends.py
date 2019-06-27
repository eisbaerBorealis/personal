import random

def main():
	list1 = []
	
	size1 = random.randint(5, 10)
	
	for x in range(size1):
		list1.append(random.randint(1, 100))
	
	print('Here is list1: {}'.format(list1))
	
	
	list2 = get_first_and_last(list1)
				
	print('Here are the first and second items from list1: {}'.format(list2))

def get_first_and_last(list):
	return_list = []
	return_list.append(list[0])
	return_list.append(list[-1])
	return return_list

main()