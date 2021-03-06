


# these are four of the five gems in a puzzle in Stardew Valley (gem birds on Ginger Island)
items = ['Ame', 'Aqu', 'Eme', 'Top']
totalcount = 0

# Obviously not dynamic. Will need to figure out a more elegant solution eventually (probably never)
for a in items:
    item1 = a
    for b in items:
        item2 = b
        for c in items:
            item3 = c
            if a != b and b != c and c != a:
                print(a + '-' + b + '-' + c)
                totalcount += 1

print('Total items:', totalcount)