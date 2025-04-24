# The File is to update the README Files in the project!

import os
import json


def open_file(skript_dir, data_file):
    with open(os.path.join(skript_dir, data_file), 'r', encoding='UTF-8') as file:
        data = json.load(file)
        return data


def main(skript_dir, data_file):
    data = open_file(skript_dir, data_file)

    with open(os.path.join(skript_dir, "README.md"), 'wt', encoding = 'UTF-8'):
        pass

    readme1 = open(os.path.join(skript_dir, "README.md"), 'a', encoding = 'UTF-8')
    readme1.write(data['readme1']['data']['data1'])
