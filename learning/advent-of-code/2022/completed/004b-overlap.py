import pathlib
import re

def main():
    filePath = pathlib.Path(__file__).parent.absolute()
    fileName = "input-004b.txt"

    try:
        fp = open(str(filePath) + "/" + fileName, 'r')
        overlapCount = 0

        for line in fp:
            line = line.strip()
            # print("Checking", line)

            nums = [int(i) for i in re.split('-|,', line)]
            # print('  nums is', nums)

            if((nums[0] <= nums[3] and nums[1] >= nums[2]) or
               (nums[1] >= nums[2] and nums[0] <= nums[3])):
                overlapCount += 1

        print('Overlap count:', overlapCount)
    except FileNotFoundError:
        print("\nError: File not found. Please make sure " + fileName + " is in this program's folder and restart the program.")

main()