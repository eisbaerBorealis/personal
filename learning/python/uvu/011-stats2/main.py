from myStats import *

def main():
    sampleSize = 50000

    exponData = getExponData(sampleSize, 1)
    uniformData = getUniformData(sampleSize, 0, 5)
    weibullData = getWeibullData(sampleSize, 1, 1.5)
    invTriData = getInverseTriangleData(sampleSize, 0, 5)

    # animateHistogram(exponData)
    # animateHistogram(uniformData)
    # animateHistogram(weibullData)
    # animateHistogram(invTriData)

    newUniformData = average_array(uniformData, 30)
    shapiro_results = shapiro_test(newUniformData)
    print('shapiro_results for newUniformData:', shapiro_results)

    newData = average_array(exponData, 30)
    shapiro_results = shapiro_test(newData)
    print('shapiro_results for newData (exponData):', shapiro_results)

    newData = average_array(weibullData, 30)
    shapiro_results = shapiro_test(newData)
    print('shapiro_results for newData (weibullData):', shapiro_results)

    newData = average_array(invTriData, 30)
    shapiro_results = shapiro_test(newData)
    print('shapiro_results for newData (invTriData):', shapiro_results)

    # #############

    
    newUniformData = average_array(uniformData, 5)
    shapiro_results = shapiro_test(newUniformData)
    print('shapiro_results for newUniformData (n=5):', shapiro_results)
    newUniformData = average_array(uniformData, 30)
    shapiro_results = shapiro_test(newUniformData)
    print('shapiro_results for newUniformData (n=30):', shapiro_results)
    newUniformData = average_array(uniformData, 100)
    shapiro_results = shapiro_test(newUniformData)
    print('shapiro_results for newUniformData (n=100):', shapiro_results)
    
    # shapiro_results2 = shapiro_test(uniformData)
    # print('shapiro_results for old uniformData:', shapiro_results2)

main()

# python -m pip install ipython
# python -m pip install seaborn

# https://matplotlib.org/1.2.1/examples/pylab_examples/histogram_demo.html