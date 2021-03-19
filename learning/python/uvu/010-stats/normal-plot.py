import scipy.stats
import numpy as np
import matplotlib.pyplot as plt

# 100 values from a normal distribution with a std of 3 and a mean of 0.5
data = 3.0 * np.random.randn(100) + 0.5
# data = [91, 51, 79, 53, 82, 51, 76, 82, 84, 53, 86, 51, 85, 45, 88, 51, 80, 49, 82, 75, 73, 67, 68, 86, 72, 75, 75, 66, 84, 70, 79, 60, 86, 71, 67, 81, 76, 83, 76, 55]

counts, start, dx, _ = scipy.stats.cumfreq(data, numbins=20)
x = np.arange(counts.size) * dx + start

plt.plot(x, counts, 'ro')
plt.xlabel('Value')
plt.ylabel('Cumulative Frequency')

plt.show()