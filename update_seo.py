import os
import re

files_map = {
    'index.html': {'canonical': 'https://rebalance-experience.fun/', 'it': 'https://rebalance-experience.fun/it/', 'es': 'https://rebalance-experience.fun/', 'en': 'https://rebalance-experience.fun/en/'},
    'prenota.html': {'canonical': 'https://rebalance-experience.fun/prenota.html', 'it': 'https://rebalance-experience.fun/it/prenota.html', 'es': 'https://rebalance-experience.fun/prenota.html', 'en': 'https://rebalance-experience.fun/en/prenota.html'},
    'promotion.html': {'canonical': 'https://rebalance-experience.fun/promotion.html', 'it': 'https://rebalance-experience.fun/it/promotion.html', 'es': 'https://rebalance-experience.fun/promotion.html', 'en': 'https://rebalance-experience.fun/en/promotion.html'},
    
    'it/index.html': {'canonical': 'https://rebalance-experience.fun/it/', 'it': 'https://rebalance-experience.fun/it/', 'es': 'https://rebalance-experience.fun/', 'en': 'https://rebalance-experience.fun/en/'},
    'it/prenota.html': {'canonical': 'https://rebalance-experience.fun/it/prenota.html', 'it': 'https://rebalance-experience.fun/it/prenota.html', 'es': 'https://rebalance-experience.fun/prenota.html', 'en': 'https://rebalance-experience.fun/en/prenota.html'},
    'it/promotion.html': {'canonical': 'https://rebalance-experience.fun/it/promotion.html', 'it': 'https://rebalance-experience.fun/it/promotion.html', 'es': 'https://rebalance-experience.fun/promotion.html', 'en': 'https://rebalance-experience.fun/en/promotion.html'},
    
    'en/index.html': {'canonical': 'https://rebalance-experience.fun/en/', 'it': 'https://rebalance-experience.fun/it/', 'es': 'https://rebalance-experience.fun/', 'en': 'https://rebalance-experience.fun/en/'},
    'en/prenota.html': {'canonical': 'https://rebalance-experience.fun/en/prenota.html', 'it': 'https://rebalance-experience.fun/it/prenota.html', 'es': 'https://rebalance-experience.fun/prenota.html', 'en': 'https://rebalance-experience.fun/en/prenota.html'},
    'en/promotion.html': {'canonical': 'https://rebalance-experience.fun/en/promotion.html', 'it': 'https://rebalance-experience.fun/it/promotion.html', 'es': 'https://rebalance-experience.fun/promotion.html', 'en': 'https://rebalance-experience.fun/en/promotion.html'}
}

for f, urls in files_map.items():
    if not os.path.exists(f):
        continue
        
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 1. Update Canonical URL
    content = re.sub(r'<link rel="canonical" href=".*?">', f'<link rel="canonical" href="{urls["canonical"]}">', content)
    
    # 2. Update Hreflang URLs
    content = re.sub(r'<link rel="alternate" hreflang="it" href=".*?">', f'<link rel="alternate" hreflang="it" href="{urls["it"]}">', content)
    content = re.sub(r'<link rel="alternate" hreflang="es" href=".*?">', f'<link rel="alternate" hreflang="es" href="{urls["es"]}">', content)
    content = re.sub(r'<link rel="alternate" hreflang="en" href=".*?">', f'<link rel="alternate" hreflang="en" href="{urls["en"]}">', content)
    # x-default always points to the Spanish version (root)
    content = re.sub(r'<link rel="alternate" hreflang="x-default" href=".*?">', f'<link rel="alternate" hreflang="x-default" href="{urls["es"]}">', content)
    
    # 3. Update Open Graph and Twitter Card URLs
    content = re.sub(r'<meta property="og:url" content=".*?">', f'<meta property="og:url" content="{urls["canonical"]}">', content)
    content = re.sub(r'<meta name="twitter:url" content=".*?">', f'<meta name="twitter:url" content="{urls["canonical"]}">', content)
    
    # 4. Update JSON-LD
    content = re.sub(r'"@id": ".*?"', f'"@id": "{urls["canonical"]}"', content)
    content = re.sub(r'"url": ".*?"', f'"url": "{urls["canonical"]}"', content)

    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
