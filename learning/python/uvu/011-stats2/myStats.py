import scipy.stats

import numpy as np

import matplotlib.pyplot as plt
import matplotlib.patches as patches
import matplotlib.path as path
import matplotlib.animation as animation

# from graphVars import *

def testPrint(s):
    print(s)

def testExponential():
    # Mean(‘m’), variance(‘v’), skew(‘s’), and/or kurtosis(‘k’).
    mean, var, skew, kurt = scipy.stats.expon.stats(moments='mvsk')
    # r = scipy.stats.expon.rvs(size=10)
    print("mean is", mean)
    print("var is", var)
    print("skew is", skew)
    print("kurt is", kurt)
    # print("r is", r)
    print()

    # r2 = scipy.stats.expon.rvs(scale=1,loc=0,size=20)
    # print("r2 is", r2)


def getExponData(exponSize, exponLambda = 1):
    exponData = scipy.stats.expon.rvs(scale = 1 / exponLambda, size = exponSize)
    return exponData

def getExponSubset(exponData, length):
    return exponData[0:length]

def displayExponData(exponData):
    # global count
    # count = 2
    def animate(i):
        # simulate new data coming in
        # data = np.random.randn(1000)

        # tempData = exponData[0:count]
        tempData = getExponSubset(exponData, 100)
        # print('Debug, count is', count)
        # count += 1
        n, bins = np.histogram(tempData, 100)

        top = bottom + n
        verts[1::5, 1] = top
        verts[2::5, 1] = top
        return [patch, ]

    print('Placeholder for displayExponData()')
    tempData = getExponSubset(exponData, 10000)
    n, bins = np.histogram(tempData, 100)
    left = bins[:-1]
    right = bins[1:]
    bottom = np.zeros(len(left))
    top = bottom + n
    nrects = len(left)

    nverts = nrects * (1 + 3 + 1)
    verts = np.zeros((nverts, 2))
    codes = np.full(nverts, path.Path.LINETO)
    codes[0::5] = path.Path.MOVETO
    codes[4::5] = path.Path.CLOSEPOLY
    verts[0::5, 0] = left
    verts[0::5, 1] = bottom
    verts[1::5, 0] = left
    verts[1::5, 1] = top
    verts[2::5, 0] = right
    verts[2::5, 1] = top
    verts[3::5, 0] = right
    verts[3::5, 1] = bottom

    patch = None
    
    fig, ax = plt.subplots()
    barpath = path.Path(verts, codes)
    patch = patches.PathPatch(
        barpath, facecolor='green', edgecolor='yellow', alpha=0.5)
    ax.add_patch(patch)

    ax.set_xlim(left[0], right[-1])
    ax.set_ylim(bottom.min(), top.max())

    # ani = animation.FuncAnimation(fig, animate, 50, repeat=False, blit=True)
    plt.show()
