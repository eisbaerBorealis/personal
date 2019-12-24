from bs4 import BeautifulSoup
import requests
import csv

not_found = 'Not found'

# https://youtu.be/ng2o98k983k

# recordID, author, title, publication, volume, issue, pages, doi,
#      abstract, url, publication_type, year

def main():
    csv_file = open('filename.csv', 'w')
    csv_writer = csv.writer(csv_file)
    csv_writer.writerow(['Record ID', 'Authors', 'Title', 'Publication', 'Volume', 'Issue', 'Pages', 'DOI', 'Abstract', 'URL', 'Publication Type', 'Year'])
    # start: https://digitalcommons.usu.edu/aspen_bib/
    # add index.2.html (with 2-60), visit each page and visit each link
    # each page has ~100 links?
    bib_url = 'https://digitalcommons.usu.edu/aspen_bib/'
    bib_source = requests.get(bib_url).text
    bib_soup = BeautifulSoup(bib_source, 'lxml')
#    print(bib_soup)
    for article in bib_soup.find_all(class_='article-listing'):
        page_url = article.a['href']
        print(page_url)
    
    page_url = 'https://digitalcommons.usu.edu/aspen_bib/7810/'

    source = requests.get(page_url).text
    soup = BeautifulSoup(source, 'lxml')
    article_info = soup.find('div', id='alpha')
    
#    print(article_info)
    recordId = page_url.split('/')[4]
    authors = get_authors(article_info)
    title = get_title(article_info)
    publication = get_p_text(article_info, 'source_publication')
    volume = get_p_text(article_info, 'volnum')
    issue = get_p_text(article_info, 'issnum')
    pages = get_pages(article_info)
    doi = get_p_text(article_info, 'doi')
    abstract = get_p_text(article_info, 'abstract')
    url = get_url(soup)
    publication_type = get_p_text(article_info, 'document_type')
    year = get_year(article_info)
    
    #print(recordId)
    #print(title)
    print(url)
    csv_writer.writerow([recordId, authors, title, publication, volume, issue, pages, doi, abstract, url, publication_type, year])
    csv_file.close()
# END main()

def get_title(soup):
    text = not_found
    if(soup.find(id='title') != None):
        text = soup.find(id='title').a.text
    return text
# END get_title(soup)

def get_authors(soup):
    text = not_found
    if(soup.find(id='authors') != None):
        text = ''
        for author in soup.find_all('strong'):
            text += author.text
            text += ', '
    text = text.rstrip(', ')
    return text
# END get_authors(soup)

def get_p_text(soup, e_id):
    text = not_found
    if(soup.find(id=e_id) != None):
        text = soup.find(id=e_id).p.text
    return text
# END get_p_text(soup, e_id)

def get_pages(soup):
    text = not_found
    if(soup.find(id='fpage') != None):
        text = soup.find(id='fpage').p.text
    if(soup.find(id='lpage') != None):
        text += '-' + soup.find(id='lpage').p.text
    return text
# END get_pages(soup)

def get_url(soup):
    text = not_found
    if(soup.find(class_='download-button') != None):
        text = soup.find(class_='download-button').a['href']
    return text
# END get_url(soup)

def get_year(soup):
    text = not_found
    if(soup.find(id='publication_date') != None):
        text = soup.find(id='publication_date').p.text.split('-')[1]
    return text
# END get_year(soup)

main()