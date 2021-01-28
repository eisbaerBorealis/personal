import pathlib
filePath = pathlib.Path(__file__).parent.absolute()

stat_char = 0
stat_upper = 0
stat_lower = 0
stat_digit = 0
stat_white = 0
stat_a = 0
stat_e = 0
stat_i = 0
stat_o = 0
stat_u = 0
stat_consonant = 0
stat_sentence = 0
stat_word = 1
last_char = ""

fileName = input("Enter name of text file: ") 

try:
    fp = open(str(filePath) + "/" + fileName, 'r')
    for line in fp:
        for char in line:
            stat_char += 1
            if ord(char) >= 48 and ord(char) <= 57:
                stat_digit += 1
            elif ord(char) >= 65 and ord(char) <= 90:
                stat_upper += 1
                if ord(char) == 65:
                    stat_a += 1
                elif ord(char) == 69:
                    stat_e += 1
                elif ord(char) == 73:
                    stat_i += 1
                elif ord(char) == 79:
                    stat_o += 1
                elif ord(char) == 89:
                    stat_u += 1
                else:
                    stat_consonant += 1
            elif ord(char) >= 97 and ord(char) <= 122:
                stat_lower += 1
                if ord(char) == 97:
                    stat_a += 1
                elif ord(char) == 101:
                    stat_e += 1
                elif ord(char) == 105:
                    stat_i += 1
                elif ord(char) == 111:
                    stat_o += 1
                elif ord(char) == 117:
                    stat_u += 1
                else:
                    stat_consonant += 1
            elif ord(char) == 32: # space
                stat_white += 1
                stat_word += 1
            elif ord(char) == 10: # newline
                stat_white += 1
                if last_char != "" and ord(last_char) != 10:
                    stat_word += 1
            elif ord(char) == 46: # period
                stat_sentence += 1
            last_char = char


    # 0-9 is 48-57
    # A-Z is 65-90
    # a-z is 97-122
    # newline is 10
    # space is 32
    # comma is 44
    # dash if 45
    # period is 46

    print("\nStatistics for file: " + fileName + ":\n")

    print("# Characters: " + str(stat_char))
    print("# Upper case: " + str(stat_upper))
    print("# Lower case: " + str(stat_lower))
    print("# Digits: " + str(stat_digit))
    print("# White space: " + str(stat_white))
    print("# Vowels: {'a': " + str(stat_a) + ", 'e': " + str(stat_e) + ", 'i': " + str(stat_i) + ", 'o': " + str(stat_o) + ", 'u': " + str(stat_u) + "}")
    print("# Consonants: " + str(stat_consonant))
    print("# Sentences: " + str(stat_sentence))
    print("# Average words per sentence: " + str(round((stat_word / stat_sentence), 1)))

except FileNotFoundError:
    print("\nError: File not found. Please restart the program and enter a valid file name.")