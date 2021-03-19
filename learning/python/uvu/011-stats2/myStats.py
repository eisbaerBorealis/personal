import scipy.stats

def getExponData(exponSize, exponScale = 1):
    exponData = scipy.stats.expon.rvs(scale = exponScale, size = exponSize)

    return exponData

def displayExponData(exponData):
    print('Placeholder for displayExponData()')