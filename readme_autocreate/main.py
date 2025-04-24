import os

import create_themes_json
import update_readmes


# readme_autocreate/
data_file = "data.json"


skript_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

js_file = os.path.join(root_dir, "app", "lib", "themes.js")


def main():
    update_readmes.main(skript_dir, data_file)

if __name__ == '__main__':
    main()
