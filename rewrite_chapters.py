import re

with open('src/data/chapters.ts', 'r') as f:
    content = f.read()

# Extract the imports and the Chapter type
header_match = re.search(r'(.*?export const chapters: Chapter\[\] = \[)(.*)', content, re.DOTALL)
header = header_match.group(1)
body = header_match.group(2)

# Find all chapters
# A chapter starts with '{' and ends with '  },' or '  }' at the end of the array
chapters = []
current_chapter = ""
depth = 0

for char in body:
    current_chapter += char
    if char == '{':
        depth += 1
    elif char == '}':
        depth -= 1
        if depth == 0:
            chapters.append(current_chapter)
            current_chapter = ""
            # Stop if we reached the end of the array
            if len(chapters) == 8:
                break

# Identify chapters by category
chapter_dict = {}
for ch in chapters:
    if "Inlay Surface Art" in ch:
        chapter_dict['inlay'] = ch
    elif "Art of natural pebbles" in ch:
        chapter_dict['pebbles'] = ch
    elif "3D Stone Art" in ch:
        chapter_dict['3d'] = ch
    elif "Architectural Engraving" in ch:
        chapter_dict['engraving'] = ch
    elif "Collectible Gift Articles" in ch:
        chapter_dict['gift'] = ch
    elif "Marble Furniture" in ch:
        chapter_dict['furniture'] = ch
    elif "Divine Sri Yantra" in ch:
        chapter_dict['yantra'] = ch
    elif "Architectural Fluting" in ch:
        chapter_dict['fluting'] = ch

# New sequence
new_sequence = [
    'inlay',
    '3d',
    'engraving',
    'furniture',
    'yantra',
    'fluting',
    'gift',
    'pebbles'
]

# Update the chapter numbers
roman_numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"]

final_chapters = []
for i, key in enumerate(new_sequence):
    ch = chapter_dict[key]
    # Replace the number
    ch = re.sub(r'number:\s*"[IVX]+"', f'number: "{roman_numerals[i]}"', ch, count=1)
    final_chapters.append(ch.strip())

new_body = "\n  ".join(final_chapters) + "\n];\n"

with open('src/data/chapters.ts', 'w') as f:
    f.write(header + "\n  " + ",\n  ".join(final_chapters) + "\n];\n")

print("Rewrote chapters.ts successfully.")
