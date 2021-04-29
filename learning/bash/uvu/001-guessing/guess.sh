#!/bin/bash
# I, Jesse Howell, affirm that I am the sole author of this script, it is my own original work
# Date: April 28, 2021
# Version 1.0.0
echo "Welcome to the guessing game!"
echo "I'm thinking of a number between 1 and 100."
guesses=0
winner=false
number=((($RANDOM+1)%100))
#echo "DEBUG: number is $number"

while (($winner == false))
do
    echo "Guess my number! "
    read input
    ((guesses++))
    if (($input == $number));
    then
        echo "Correct! You got it in $guesses guesses."
        #$((winner=true))
        #echo "winner is $winner"
        break
    elif (($input < $number));
    then
        echo "Your guess is lower than the correct number."
    else
        echo "Your guess is higher than the correct number."
    fi

done
echo "End of program."
exit $guesses