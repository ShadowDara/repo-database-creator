import re
import json

def main(js_file):
    print("Reading file:", js_file)
    with open(js_file, 'r') as file:
        js_content = file.read()
    
    print("File content:\n", js_content)
    
    pattern = r'export\s+const\s+themes\s*=\s*({.*?});'
    match = re.search(pattern, js_content, re.DOTALL)

    if match:
        js_data = match.group(1)

        print("Matched data:", js_data)
        
        js_data = js_data.replace('\'', '"')
        js_data = js_data.replace('[', '[').replace(']', ']')

        try:
            themes = json.loads(js_data)
            return themes

        except json.JSONDecodeError as e:
            print(f"Error while parsing the JSON files: {e}")

    else:
        print("No working Theme Object found.")
