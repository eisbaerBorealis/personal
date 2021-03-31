import scipy.stats as stats
import matplotlib.pyplot as plt

def getExponData(exponSize, exponLambda = 1):
    exponData = stats.expon.rvs(scale = (1 / exponLambda), size = exponSize)
    return exponData

def getUniformData(uniformsize, a, b):
    uniformData = stats.uniform.rvs(size = uniformsize, loc = a, scale= b)
    return uniformData

def getDataSubset(data, length):
    return data[0:length]

def displayHistogram(data):
    plt.hist(data, bins = 100)
    plt.show()

def animateHistogram(data):
    size = len(data)
    frames = 50
    perFrame = size / frames

    for i in range(frames):
        plt.clf()
        # add ', density = True' to plt.hist to make it normalized (area adds up to 1)
        plt.hist(getDataSubset(data, int(i * perFrame)), bins = 100)
        plt.draw()
        plt.pause(0.0001)
    plt.show(block = True)