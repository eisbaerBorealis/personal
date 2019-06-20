import random

def main():
	list1 = []
	list2 = []
	
	size1 = random.randint(8, 17)
	size2 = random.randint(8, 17)
	
	for x in range(size1):
		list1.append(random.randint(1, 100))
	
	for x in range(size2):
		list2.append(random.randint(1, 100))
	
	print('Here is list1: {}'.format(list1))
	print('Here is list2: {}'.format(list2))
	
	list1.sort()
	print('Here is list1, sorted: {}'.format(list1))
	list2.sort()
	print('Here is list2, sorted: {}'.format(list2))
	
	list3 = [x for x in list1 if x in list2]
				
	print('Here are the common items between the two lists: {}'.format(list3))

main()