import re

with open('index.html', 'r') as f:
    content = f.read()

# Pattern to find the recognized-card-btn-badge and move it
pattern = r'(<div class="recognized-card-btn-badge">.*?</div>\s*</div>\s*<div class="recognized-card-body">)'
# Wait, the structure is:
# <div class="recognized-card-btn-badge">
#   <svg ...</svg>
# </div>
# </div>
# <div class="recognized-card-body">
# We want to move the badge to inside recognized-card-body

def replacer(match):
    # match.group(1) is the whole matched string
    # We want to extract the badge and put it after <div class="recognized-card-body">
    text = match.group(0)
    badge_match = re.search(r'(<div class="recognized-card-btn-badge">.*?</div>)', text, re.DOTALL)
    if badge_match:
        badge = badge_match.group(1)
        # Remove badge from original text
        text_without_badge = text.replace(badge, '')
        # Now text_without_badge is something like: "\n            </div>\n            <div class="recognized-card-body">"
        # We want to insert the badge inside recognized-card-body
        new_text = text_without_badge.replace('<div class="recognized-card-body">', f'<div class="recognized-card-body">\n              {badge}')
        return new_text
    return text

new_content = re.sub(r'<div class="recognized-card-btn-badge">.*?</div>\s*</div>\s*<div class="recognized-card-body">', replacer, content, flags=re.DOTALL)

with open('index.html', 'w') as f:
    f.write(new_content)
