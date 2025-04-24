# The File is to update the README Files in the project!

import os
import json


def open_file(path):
    with open(path, 'r', encoding='UTF-8') as file:
        data = json.load(file)
        return data


def main(skript_dir, data_file, themes_file):
    data = open_file(os.path.join(skript_dir, data_file))
    themes = open_file(themes_file)

    with open(os.path.join(skript_dir, "README.md"), 'wt', encoding = 'UTF-8'):
        pass

    readme1 = open(os.path.join(skript_dir, "README.md"), 'a', encoding = 'UTF-8')

    readme1.write(data['readme1']['data']['data1'])

    for name in themes.keys():
        readme1.write(f"\n- {name}")
    
    readme1.write(data['readme1']['data']['data2'])
    
    #repo_count_card()
    #gist_count_card()

    readme1.write(data['readme1']['data']['data3'])

    for name in themes.keys():
        readme1.write(f"\n#### `{name}`\n")

        for name2 in data['cards']:
            readme1.write(f"```\nhttps://repo-database-creator.vercel.app/api/svg/repo_count?user=shadowdara&theme={name2}\n```\n![Shadowdara's Repository Count Card](https://repo-database-creator.vercel.app/api/svg/repo_count?user=shadowdara&theme={name2})")
