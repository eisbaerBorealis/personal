import random
import scipy.stats as stats
import matplotlib.pyplot as plt

def getExponData(exponSize, exponLambda = 1):
    exponData = stats.expon.rvs(scale = (1 / exponLambda), size = exponSize)
    return exponData

# method by Christian Poulsen
def getUniformData(uniformSize, a, b):
    uniformData = stats.uniform.rvs(size = uniformSize, loc = a, scale = b-a)
    return uniformData

# method by Mitchell Dom
def getWeibullData(weibullSize, a, shape):
    weibull_data = stats.exponweib.rvs(a, shape, size=weibullSize)
    return weibull_data

# method by Jacob Ray
def getInverseTriangleData(invTriSize, a, b):
    count = 0
    invTriData = []
    while count < invTriSize:
        p = random.uniform(0, 1)
        if p < 0.5:
            x = (((p * -2 + 1) ** 0.5 - 2) * -2 - 2) / 4 * (b - a) + a
        else:
            x = (((p * 2 - 1) ** 0.5 + 2) * 2 - 2) / 4 * (b - a) + a
        invTriData.append(x)
        count += 1

    return invTriData

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