import os

files_map = {
    'index.html': {'es': 'index.html', 'en': 'en/index.html', 'it': 'it/index.html'},
    'prenota.html': {'es': 'prenota.html', 'en': 'en/prenota.html', 'it': 'it/prenota.html'},
    'promotion.html': {'es': 'promotion.html', 'en': 'en/promotion.html', 'it': 'it/promotion.html'},
    
    'it/index.html': {'es': '../index.html', 'en': '../en/index.html', 'it': 'index.html'},
    'it/prenota.html': {'es': '../prenota.html', 'en': '../en/prenota.html', 'it': 'prenota.html'},
    'it/promotion.html': {'es': '../promotion.html', 'en': '../en/promotion.html', 'it': 'promotion.html'},
    
    'en/index.html': {'es': '../index.html', 'en': 'index.html', 'it': '../it/index.html'},
    'en/prenota.html': {'es': '../prenota.html', 'en': 'prenota.html', 'it': '../it/prenota.html'},
    'en/promotion.html': {'es': '../promotion.html', 'en': 'promotion.html', 'it': '../it/promotion.html'}
}

for f, urls in files_map.items():
    if not os.path.exists(f):
        continue
        
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    html_block = f"""
            <div class="footer-lang">
                <a href="{urls["it"]}" title="Italiano"><span class="footer-lang-flag">🇮🇹</span> IT</a>
                <a href="{urls["es"]}" title="Español"><span class="footer-lang-flag">🇪🇸</span> ES</a>
                <a href="{urls["en"]}" title="English"><span class="footer-lang-flag">🇬🇧</span> EN</a>
            </div>
            <p>&copy;"""

    # We need to inject this right before <p>&copy; 2026
    # Let's replace <p>&copy; with the new block. 
    # But wait, there might be multiple <p>&copy; if I'm not careful. Actually, there's only one per file.
    
    # Check if we already injected it so we don't duplicate
    if 'class="footer-lang"' not in content:
        content = content.replace('<p>&copy;', html_block)

        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
