import requests
import re

class HayStack:
  
    # default constructor
    def __init__(self, newUrl, newDepth = 3):
        self.index = {}
        self.graph = {}
        self.ranks = {}
        self.__scrapePage(newUrl, newDepth)
        self.compute_ranks(self.graph)

    def __scrapePage(self, url, depth):
        headers = {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0"
        }
        pageSource = requests.get(url, headers=headers).text
        pageText = re.sub(r'<[^>]*>|\t|\n|&[a-z]*;', ' ', pageSource)
        pageWords = re.findall(r'[A-z|\']+', pageText)
        pageHrefs = re.findall(r'href *= *"[^"]*"', pageSource)
        pageLinks = []
        for link in pageHrefs:
            newLink = link.split('"')[1]
            if newLink not in pageLinks:
                pageLinks.append(newLink)

        self.__addToIndex(pageWords, url)
        self.graph[url] = set(pageLinks)

        for link in pageLinks:
            if depth > 1 and link not in self.graph:
                self.__scrapePage(link, depth - 1)

    def __addToIndex(self, words, url):
        for word in words:
            word = word.lower()
            if word not in self.index:
                self.index[word] = [url]
            elif url not in self.index[word]:
                self.index[word].append(url)

    def compute_ranks(self, graph):
        d = 0.85 # probability that surfer will bail
        numloops = 10
        ranks = {}
        npages = len(graph)
        for page in graph:
            ranks[page] = 1.0 / npages
        for i in range(0, numloops):
            newranks = {}
            for page in graph:
                newrank = (1 - d) / npages
                for url in graph: 
                    if page in graph[url]: # this url links to page
                        newrank += d*ranks[url]/len(graph[url])
                newranks[page] = newrank
            ranks = newranks
        self.ranks = ranks
    
    def lookup(self, word):
        # if self.ranks == {}:
        #     self.compute_ranks(self.graph)
        word = word.lower()
        result = []
        if word in self.index:
            for x in range(len(self.index[word])):
                strongest = (-1, 0)
                url = ''
                for y in range(len(self.index[word])):
                    url = self.index[word][y]
                    if url not in result:
                        if strongest[1] < self.ranks[url]:
                            strongest = (y, self.ranks[url])
                result.append(self.index[word][strongest[0]])
        return result