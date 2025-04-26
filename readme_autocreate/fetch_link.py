import requests

def fetch_and_save(link, filename):
    try:
        response = requests.get(link)
        response.raise_for_status()
        with open(filename, 'wb') as f:
            f.write(response.content)
        print(f'Data saved succesfully in "{filename}" gespeichert.')
    except requests.exceptions.RequestException as e:
        print(f'Error while fetching data: {e}')
