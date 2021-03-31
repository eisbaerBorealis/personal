from myStats import *

def main():
    sampleSize = 50000

    exponData = getExponData(sampleSize, 1)
    uniformData = getUniformData(sampleSize, 0, 5)
    weibullData = getWeibullData(sampleSize, 1, 1.5)
    invTriData = getInverseTriangleData(sampleSize, 0, 5)

    animateHistogram(exponData)
    animateHistogram(uniformData)
    animateHistogram(weibullData)
    animateHistogram(invTriData)

main()

# python -m pip install ipython
# python -m pip install seaborn

# https://matplotlib.org/1.2.1/examples/pylab_examples/histogram_demo.html