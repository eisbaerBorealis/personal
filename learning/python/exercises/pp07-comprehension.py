def main():
	list1 = [1, 2, 4, 9, 16, 25, 36, 49, 64, 81, 100]
	
	even_list = [x for x in list1 if x % 2 == 0]
	
	print('Original list: {}'.format(list1))
	print('Even numbers: {}'.format(even_list))

main()