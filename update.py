import os
import urllib.parse
import re

def build_photo_html(folder_name, tag):
    dir_path = os.path.join('e:/Quotation/assets', folder_name)
    files = [f for f in os.listdir(dir_path) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
    html = []
    for f in files:
        src = f"assets/{folder_name}/{urllib.parse.quote(f)}"
        html.append(f'''                <div class="photo-item reveal-card">
                    <img loading="lazy" src="{src}" alt="{tag} Reference" class="photo-img">
                    <div class="photo-overlay"><span class="photo-tag">{tag}</span></div>
                </div>''')
    return "\n".join(html)

def build_vid_html(folder_name, title, tag1, tag2):
    dir_path = os.path.join('e:/Quotation/assets', folder_name)
    files = [f for f in os.listdir(dir_path) if f.lower().endswith('.mp4')]
    html = []
    for f in files:
        src = f"assets/{folder_name}/{urllib.parse.quote(f)}"
        html.append(f'''                <div class="vid-card reveal-card">
                    <div class="vid-preview" style="height: auto; aspect-ratio: 16/9; background: #000;">
                        <video controls preload="metadata" style="width: 100%; height: 100%; object-fit: cover;">
                            <source src="{src}" type="video/mp4">
                        </video>
                    </div>
                    <div class="vid-body">
                        <h3>{title}</h3>
                        <div class="vid-specs">
                            <span class="vid-tag"><i data-lucide="clock"></i> {tag1}</span>
                            <span class="vid-tag"><i data-lucide="monitor"></i> {tag2}</span>
                        </div>
                    </div>
                </div>''')
    return "\n".join(html)

def main():
    # 1. PHOTOS
    portrait_html = build_photo_html('Portrait', 'Portrait')
    couple_html = build_photo_html('Couple', 'Couple')
    photo_grid_replacement = f'<div class="photo-grid">\n{portrait_html}\n{couple_html}\n            </div>'

    # 2. VIDEOS
    cinematic_html = build_vid_html('Cinematic Film', 'Cinematic Film', '3-5 Mins', '4K UHD')
    teaser_html = build_vid_html('Social Media Teaser', 'Social Media Teaser', 'upto 60 Secs', '4K Vertical')
    
    # Wait, social media teasers are vertical videos (9:16). Let's edit the style for vertical videos.
    # The build_vid_html puts aspect-ratio: 16/9. That's bad for teasers. I'll make a custom one for teasers.
    
    dir_path_teaser = os.path.join('e:/Quotation/assets', 'Social Media Teaser')
    teaser_files = [f for f in os.listdir(dir_path_teaser) if f.lower().endswith('.mp4')]
    teaser_cards = []
    for f in teaser_files:
        src = f"assets/Social Media Teaser/{urllib.parse.quote(f)}"
        teaser_cards.append(f'''                <div class="vid-card reveal-card">
                    <div class="vid-preview" style="height: auto; aspect-ratio: 9/16; background: #000;">
                        <video controls preload="metadata" style="width: 100%; height: 100%; object-fit: cover;">
                            <source src="{src}" type="video/mp4">
                        </video>
                    </div>
                    <div class="vid-body">
                        <h3>Social Media Teaser</h3>
                        <div class="vid-specs">
                            <span class="vid-tag"><i data-lucide="clock"></i> upto 60 Secs</span>
                            <span class="vid-tag"><i data-lucide="monitor"></i> 4K Vertical</span>
                        </div>
                    </div>
                </div>''')
    teaser_html = "\n".join(teaser_cards)

    # 3. ALBUMS
    album_replacement = '''            <div class="album-row" style="grid-template-columns: 1fr;">
                <div class="album-card reveal-card" style="max-width: 500px; margin: 0 auto;">
                    <div class="album-thumb">
                        <img src="assets/albums.png" alt="Premium Photobook" style="object-position: 0% 0%;">
                        <div class="album-badge gold">Premium</div>
                    </div>
                    <div class="album-body">
                        <h3>Premium Photobook</h3>
                        <p>A masterfully designed physical album featuring the best moments on archival-quality premium paper.</p>
                        <div class="album-spec" style="margin-bottom: 20px;">
                            <span><i data-lucide="file-text"></i> 17-20 Pages</span>
                            <span><i data-lucide="image"></i> 70-120 Photos</span>
                            <span><i data-lucide="maximize"></i> 12×36"</span>
                        </div>
                        <a href="assets/12by36/anwar%2032.pdf" target="_blank" class="book-btn" style="text-align: center; text-decoration: none; display: inline-flex;">
                            <span><i data-lucide="external-link"></i> View Sample PDF</span>
                        </a>
                    </div>
                </div>
            </div>'''
            
    video_replacement = f'''            <div class="section-label" style="margin-bottom: 8px;">
                <span class="label-number">🎬</span>
                <span class="label-text">Cinematic Feature</span>
            </div>
            <div class="video-row" style="margin-top: 0px; margin-bottom: 48px;">
{cinematic_html}
            </div>
            
            <div class="section-label" style="margin-bottom: 8px;">
                <span class="label-number">📱</span>
                <span class="label-text">Social Media Teasers</span>
            </div>
            <div class="video-row" style="margin-top: 0px; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
{teaser_html}
            </div>'''

    with open('e:/Quotation/index.html', 'r', encoding='utf-8') as file:
        content = file.read()
        
    # Replace photo-grid
    photo_pattern = re.compile(r'<div class="photo-grid">.*?</div>\n            </div>', re.DOTALL)
    content = photo_pattern.sub(photo_grid_replacement, content)
    
    # Replace video-row
    video_pattern = re.compile(r'<div class="video-row">.*?</div>\n            </div>', re.DOTALL)
    content = video_pattern.sub(video_replacement, content)
    
    # Replace album-row
    album_pattern = re.compile(r'<div class="album-row">.*?</div>\n            </div>', re.DOTALL)
    content = album_pattern.sub(album_replacement, content)

    with open('e:/Quotation/index.html', 'w', encoding='utf-8') as file:
        file.write(content)

if __name__ == '__main__':
    main()
