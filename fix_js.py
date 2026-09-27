import re

with open('js/main.js', 'r') as f:
    content = f.read()

# Replace the click listener attachment
old_code = """        wrapper.addEventListener('click', () => {
          currentModalIndex = index;
          updateModalImage();
          imageModal.classList.add('show');
          imageModal.setAttribute('aria-hidden', 'false');
        });"""

new_code = """        const openModal = () => {
          currentModalIndex = index;
          updateModalImage();
          imageModal.classList.add('show');
          imageModal.setAttribute('aria-hidden', 'false');
        };
        wrapper.addEventListener('click', openModal);
        
        const card = wrapper.closest('.recognized-card');
        if (card) {
          const badge = card.querySelector('.recognized-card-btn-badge');
          if (badge) {
            badge.style.cursor = 'pointer';
            badge.addEventListener('click', openModal);
          }
        }"""

new_content = content.replace(old_code, new_code)

# Bump version to v=2.4
with open('index.html', 'r') as f:
    html_content = f.read()

html_content = html_content.replace('js/main.js?v=2.3', 'js/main.js?v=2.4')

with open('js/main.js', 'w') as f:
    f.write(new_content)

with open('index.html', 'w') as f:
    f.write(html_content)
