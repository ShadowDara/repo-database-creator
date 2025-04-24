import re
import json

def main(js_file):
    print(js_file)
    with open(js_file, 'r') as file:
        js_content = file.read()

    pattern = r'export const themes = ({.*?});'
    match = re.search(pattern, js_content, re.DOTALL)

    if match:
        js_data = match.group(1)

        js_data = js_data.replace('\'', '"')
        js_data = js_data.replace('[', '[').replace(']', ']')

        try:
            themes = json.loads(js_data)
            print(json.dumps(themes, indent=4))

        except json.JSONDecodeError as e:
            print(f"Error while parsing the JSON files: {e}")

    else:
        print("No working Theme Object found.")
