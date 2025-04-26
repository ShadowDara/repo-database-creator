import os

import update_readmes


# readme_autocreate/
data_file = "data.json"

link = "https://repo-database-creator.vercel.app/lib/show_themes"


skript_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

js_file = os.path.join(root_dir, "app", "lib", "themes.js")
themes_file = os.path.join(skript_dir, "themes.json")


def main():
    fetch_and_save(link, themes_file)
    update_readmes.start(skript_dir, data_file, themes_file)


import requests

def fetch_and_save(link, filename):
    try:
        response = requests.get(link)
        response.raise_for_status()
        with open(filename, 'wb') as f:
            f.write(response.content)
        print(f'Data saved succesfully in "{filename}".')
    except requests.exceptions.RequestException as e:
        print(f'Error while fetching data: {e}')


if __name__ == '__main__':
    main()
