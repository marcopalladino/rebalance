import os

# 1. Update paths in it/ files
it_files = ['it/index.html', 'it/prenota.html', 'it/promotion.html']

for f in it_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Asset paths
    content = content.replace('href="styles.css"', 'href="../styles.css"')
    content = content.replace('src="assets/', 'src="../assets/')
    content = content.replace('href="assets/', 'href="../assets/')
    content = content.replace('src="script.js"', 'src="../script.js"')
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

# 2. Update language switchers
# In Root (Spanish):
root_files = ['index.html', 'prenota.html', 'promotion.html']
for f in root_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Link to English is already en/filename.html
    # We need to change the Italian link, which currently points to index.html to it/filename.html
    filename = os.path.basename(f)
    # The Spanish file had: 
    # <a href="../index.html" class="lang-link">Italiano</a>
    # <a href="../en/index.html" class="lang-link">English</a>
    # But wait, earlier we stripped '../'. So now it's:
    # <a href="index.html" class="lang-link">Italiano</a>
    # <a href="en/index.html" class="lang-link">English</a>
    content = content.replace(f'href="index.html" class="lang-link">Italiano', f'href="it/{filename}" class="lang-link">Italiano')
    content = content.replace(f'href="prenota.html" class="lang-link">Italiano', f'href="it/prenota.html" class="lang-link">Italiano')
    content = content.replace(f'href="promotion.html" class="lang-link">Italiano', f'href="it/promotion.html" class="lang-link">Italiano')
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

# In it/ (Italian):
for f in it_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    filename = os.path.basename(f)
    # Italian file had:
    # <a href="es/index.html" class="lang-link">Español</a>
    # <a href="en/index.html" class="lang-link">English</a>
    
    content = content.replace(f'href="es/index.html" class="lang-link">Español', f'href="../index.html" class="lang-link">Español')
    content = content.replace(f'href="es/prenota.html" class="lang-link">Español', f'href="../prenota.html" class="lang-link">Español')
    content = content.replace(f'href="es/promotion.html" class="lang-link">Español', f'href="../promotion.html" class="lang-link">Español')
    
    content = content.replace(f'href="en/index.html"', f'href="../en/index.html"')
    content = content.replace(f'href="en/prenota.html"', f'href="../en/prenota.html"')
    content = content.replace(f'href="en/promotion.html"', f'href="../en/promotion.html"')
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

# In en/ (English):
en_files = ['en/index.html', 'en/prenota.html', 'en/promotion.html']
for f in en_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    filename = os.path.basename(f)
    # English file had:
    # <a href="../index.html" class="lang-link">Italiano</a>
    # <a href="../es/index.html" class="lang-link">Español</a>
    
    content = content.replace(f'href="../index.html" class="lang-link">Italiano', f'href="../it/{filename}" class="lang-link">Italiano')
    content = content.replace(f'href="../prenota.html" class="lang-link">Italiano', f'href="../it/prenota.html" class="lang-link">Italiano')
    content = content.replace(f'href="../promotion.html" class="lang-link">Italiano', f'href="../it/promotion.html" class="lang-link">Italiano')
    
    content = content.replace(f'href="../es/index.html" class="lang-link">Español', f'href="../index.html" class="lang-link">Español')
    content = content.replace(f'href="../es/prenota.html" class="lang-link">Español', f'href="../prenota.html" class="lang-link">Español')
    content = content.replace(f'href="../es/promotion.html" class="lang-link">Español', f'href="../promotion.html" class="lang-link">Español')
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
