# sequentially, no concurrency

import os
import pathlib
import requests
import shutil
import time

filePath = pathlib.Path(__file__).parent.absolute()

headers = {
    'User-Agent': '"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36'
}

byte_total = 0
flag_total = 0

def download_img(code):
    url = 'https://www.chuckallison.com/flags/' + code + '.gif'
    r = requests.get(url, stream = True, headers = headers)

    global byte_total
    byte_total += int(r.headers['Content-length'])
    if r.status_code == 200:
        global flag_total
        flag_total += 1

        r.raw.decode_content = True
        
        filename = str(filePath) + '/flags/' + code + '.gif'
        with open(filename,'wb') as f:
            for block in r.iter_content(1024):
                if not block:
                    break
                f.write(block)
    else:
        print('Image Couldn\'t be retreived from', url)

def main():
    time1_start = time.perf_counter()
    time2_start = time.process_time()

    if not os.path.exists(str(filePath) + '/flags'):
        os.makedirs(str(filePath) + '/flags')

    file = open(str(filePath) + '/flags.txt', 'r')
    lines = file.readlines()
    file.close()
    for line in lines:
        line = line.strip()
        download_img(line)
    
    time1_end = time.perf_counter()
    time2_end = time.process_time()

    print('perf_counter:', '{0:.3f}'.format(time1_end - time1_start), 'seconds')
    print('process_time:', '{0:.3f}'.format(time2_end - time2_start), 'seconds')
    print('bytes downloaded:', '{:,}'.format(byte_total), 'and', flag_total, 'flags')

main()