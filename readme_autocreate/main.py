import os

import update_readmes
import fetch_link


# readme_autocreate/
data_file = "data.json"

link = "https://repo-database-creator.vercel.app/api/svg/test_theme"


skript_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

js_file = os.path.join(root_dir, "app", "lib", "themes.js")
themes_file = os.path.join(skript_dir, "themes.json")


def main():
    fetch_link.fetch_and_save(link, themes.json)
    update_readmes.main(skript_dir, data_file, themes_file)

if __name__ == '__main__':
    main()
