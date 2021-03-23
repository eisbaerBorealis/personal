from myStats import *

def main():
    expon1 = getExponData(10000)
    expon2 = getExponData(10, 4)

    displayHistogram(expon1)
    animateHistogram(expon1)

main()

# python -m pip install ipython
# python -m pip install seaborn
