from pp_utility import get_random_list

def main():
	list1 = get_random_list(8, 12, 1, 10)
	print("Here is the original list: {}".format(list1))
	list2 = remove_dups(list1)
	list3 = remove_dups_set(list1)
	print("Here is the list with duplicates removed: {}".format(list2))
	print("Here is the list with duplicates removed, using a set: {}".format(list3))
	
def remove_dups(list1):
	list2 = []
	for x in list1:
		if(not x in list2):
			list2.append(x)
	return list2
	
def remove_dups_set(list1):
	list2 = list(set(list1))
	return list2

main()