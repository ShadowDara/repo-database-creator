# The File is to update the README Files in the project!

import os
import json


def open_file(path):
    with open(path, 'r', encoding='UTF-8') as file:
        data = json.load(file)
        return data


def display_card(data, themes, readme1):
    for name2, label in data['cards'].items():
        readme1.write(f'\n\n### {label} Card')
        readme1.write(f"\n\n#### Base Link without Theme\n\n*Change the Username!*\n\n```md\n![](https://repo-database-creator.vercel.app/api/svg/{name2}?user=shadowdara&use_theme=true)\n```\n\n![Shadowdara's {label} Card](https://repo-database-creator.vercel.app/api/svg/{name2}?user=shadowdara&use_theme=true)")
        readme1.write('\n\n#### All Themes\n\n> The Shown Themes are working with all SVG Cards!\n\n')

        readme1.write('|  |  |  |\n')
        readme1.write('|:--:|:--:|:--:|\n')

        x = 0
        links = []

        for theme in themes:
            x += 1

            if x >= 4:
                x = 1

            readme1.write(f'| `{theme}` ![{theme}][{theme}-{name2}]')
            links.append(f"[{theme}-{name2}]: https://repo-database-creator.vercel.app/api/svg/{name2}?user=shadowdara&theme={theme}&use_theme=true")
            if x == 3:
                readme1.write(' |\n')
        
        readme1.write('\n\n[Add your theme!](themes.js)\n\n---\n\n')
        
        for link in links:
            readme1.write(f"\n{link}")
        
        readme1.write('\n')


def display_card_mobile(data, themes, readme2):
    for name2, label in data['cards'].items():
        readme2.write(f'\n\n### {label} Card')
        readme2.write(f"\n\n#### Base Link without Theme\n\n*Change the Username!*\n\n```md\n![](https://repo-database-creator.vercel.app/api/svg/{name2}?user=shadowdara&use_theme=true)\n```\n\n![Shadowdara's {label} Card](https://repo-database-creator.vercel.app/api/svg/{name2}?user=shadowdara&use_theme=true)")
        readme2.write('\n\n#### All Themes\n\n> The Shown Themes are working with all SVG Cards!\n\n')

        links = []

        for theme in themes:
            readme2.write(f'`{theme}`\n\n![{theme}][{theme}-{name2}]\n\n')
            links.append(f"[{theme}-{name2}]: https://repo-database-creator.vercel.app/api/svg/{name2}?user=shadowdara&theme={theme}&use_theme=true")
        
        readme2.write('\n[Add your theme!](themes.js)\n\n---\n\n')
        
        for link in links:
            readme2.write(f"\n{link}")
        
        readme2.write('\n')


def start(skript_dir, data_file, themes_file):
    data = open_file(os.path.join(skript_dir, data_file))
    themes = open_file(themes_file)

    readme1 = open(os.path.join(os.path.dirname(skript_dir), "app", "lib", "README.md"), 'wt', encoding = 'UTF-8')

    readme1.write(data['readme1']['data']['data1'])
    readme1.write(data['readme1']['data']['data4'])
    readme1.write(data['readme1']['data']['data5'])

    for name in themes.keys():
        readme1.write(f"\n- `{name}`")
    
    readme1.write(data['readme1']['data']['data2'])
    
    display_card(data, themes, readme1)

    readme1.write(data['readme1']['data']['data3'])

    for name in themes.keys():
        readme1.write(f"\n\n#### `{name}`\n")

        for name2, label in data['cards'].items():
            readme1.write(
                f"\n```md\n![](https://repo-database-creator.vercel.app/api/svg/{name2}?user=shadowdara&theme={name}&use_theme=true)\n```\n\n"
                f"![Shadowdara's {label} Card](https://repo-database-creator.vercel.app/api/svg/{name2}?user=shadowdara&theme={name}&use_theme=true)\n"
                )


    # README for mobile!
    readme2 = open(os.path.join(os.path.dirname(skript_dir), "app", "lib", "_FOR_MOBILE_", "README.md"), 'wt', encoding = 'UTF-8')

    readme2.write(data['readme1']['data']['data1'])
    readme2.write(data['readme1']['data']['data5'])

    for name in themes.keys():
        readme2.write(f"\n- `{name}`")
    
    readme2.write(data['readme1']['data']['data2'])
    
    display_card_mobile(data, themes, readme2)

    readme2.write(data['readme1']['data']['data3'])

    for name in themes.keys():
        readme2.write(f"\n\n#### `{name}`\n")

        for name2, label in data['cards'].items():
            readme2.write(
                f"\n```md\n![](https://repo-database-creator.vercel.app/api/svg/{name2}?user=shadowdara&theme={name}&use_theme=true)\n```\n\n"
                f"![Shadowdara's {label} Card](https://repo-database-creator.vercel.app/api/svg/{name2}?user=shadowdara&theme={name}&use_theme=true)\n"
                )
