#  concurrently using futures with processes

import concurrent.futures
import os
import pathlib
import requests
import shutil
import time

filePath = pathlib.Path(__file__).parent.absolute()

headers = {
    'User-Agent': '"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36'
}

def download_img(code):
    try:
        url = 'https://www.chuckallison.com/flags/' + code + '.gif'
        r = requests.get(url, stream = True, headers = headers)

        if r.status_code == 200:
            r.raw.decode_content = True
            
            filename = str(filePath) + '/flags/' + code + '.gif'
            with open(filename,'wb') as f:
                for block in r.iter_content(1024):
                    if not block:
                        break
                    f.write(block)
        else:
            print('Image Couldn\'t be retreived from', url)
    except requests.exceptions.ConnectionError:
        print('ERROR: could not download flag. Sleeping for 0.1 seconds.')
        time.sleep(0.100)
        download_img(code)

def main():
    time1_start = time.perf_counter()
    time2_start = time.process_time()

    if not os.path.exists(str(filePath) + '/flags'):
        os.makedirs(str(filePath) + '/flags')

    file = open(str(filePath) + '/flags.txt', 'r')
    lines = file.readlines()
    file.close()
    
    for i in range(len(lines)):
        lines[i] = lines[i].strip()
    
    with concurrent.futures.ProcessPoolExecutor() as executor:
        for download in executor.map(download_img, lines):
            download

    byte_total = 0
    flag_total = 0
    # Spent too long fighting processes and global variables...
    for filename in os.listdir(str(filePath) + '/flags'):
        flag_total += 1
        byte_total +=os.path.getsize(str(filePath) + '/flags/' + filename)

    time1_end = time.perf_counter()
    time2_end = time.process_time()

    print('perf_counter:', '{0:.3f}'.format(time1_end - time1_start), 'seconds')
    print('process_time:', '{0:.3f}'.format(time2_end - time2_start), 'seconds')
    print('bytes downloaded:', '{:,}'.format(byte_total), 'and', flag_total, 'flags')

# https://stackoverflow.com/questions/15900366
if __name__ == '__main__':
    main()