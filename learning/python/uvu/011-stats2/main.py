from myStats import *
# from Graph import *

def main():
    expon1 = getExponData(10000)
    expon2 = getExponData(10, 4)

    # testExponential()

    print('expon1 is', expon1)
    print('expon2 is', expon2)

    displayExponData(expon1)

main()

# python -m pip install ipython
# python -m pip install seaborn
