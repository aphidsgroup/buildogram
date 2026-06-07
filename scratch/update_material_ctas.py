import os
import glob

directory = r"src\app\materials"

for filepath in glob.glob(directory + '/**/*.js', recursive=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if "/contact?type=construction" in content:
        content = content.replace("/contact?type=construction", "/contact?type=material_quote")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")
