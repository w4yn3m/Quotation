const fs = require('fs');
const path = require('path');

const baseDir = 'e:/Quotation/assets';

function getFiles(folder) {
    const dir = path.join(baseDir, folder);
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter(f => !f.startsWith('.'));
}

const portraitFiles = getFiles('Portrait').filter(f => f.match(/\.(jpg|jpeg|png)$/i));
const coupleFiles = getFiles('Couple').filter(f => f.match(/\.(jpg|jpeg|png)$/i));
const cinematicFiles = getFiles('Cinematic Film').filter(f => f.match(/\.(mp4)$/i));
const teaserFiles = getFiles('Social Media Teaser').filter(f => f.match(/\.(mp4)$/i));

const portraitHtml = portraitFiles.map(f => {
    const src = `assets/Portrait/${encodeURIComponent(f).replace(/'/g, '%27')}`;
    return `                <div class="photo-item reveal-card">
                    <img loading="lazy" src="${src}" alt="Portrait Reference" class="photo-img" style="object-position: center top;">
                    <div class="photo-overlay"><span class="photo-tag">Portrait</span></div>
                </div>`;
}).join('\n');

const coupleHtml = coupleFiles.map(f => {
    const src = `assets/Couple/${encodeURIComponent(f).replace(/'/g, '%27')}`;
    return `                <div class="photo-item reveal-card">
                    <img loading="lazy" src="${src}" alt="Couple Reference" class="photo-img" style="object-position: center top;">
                    <div class="photo-overlay"><span class="photo-tag">Couple</span></div>
                </div>`;
}).join('\n');

const photoGridReplacement = `<div class="photo-grid">\n${portraitHtml}\n${coupleHtml}\n            </div>`;

const cinematicHtml = cinematicFiles.map(f => {
    const src = `assets/Cinematic Film/${encodeURIComponent(f).replace(/'/g, '%27')}`;
    return `                <div class="vid-card reveal-card">
                    <div class="vid-preview" style="height: auto; aspect-ratio: 16/9; background: #000;">
                        <video controls preload="metadata" style="width: 100%; height: 100%; object-fit: cover;">
                            <source src="${src}" type="video/mp4">
                        </video>
                    </div>
                    <div class="vid-body">
                        <h3>Cinematic Film</h3>
                        <div class="vid-specs">
                            <span class="vid-tag"><i data-lucide="clock"></i> 3-5 Mins</span>
                            <span class="vid-tag"><i data-lucide="monitor"></i> 4K UHD</span>
                        </div>
                    </div>
                </div>`;
}).join('\n');

const teaserHtml = teaserFiles.map(f => {
    const src = `assets/Social Media Teaser/${encodeURIComponent(f).replace(/'/g, '%27')}`;
    return `                <div class="vid-card reveal-card">
                    <div class="vid-preview" style="height: auto; aspect-ratio: 9/16; background: #000;">
                        <video controls preload="metadata" style="width: 100%; height: 100%; object-fit: cover;">
                            <source src="${src}" type="video/mp4">
                        </video>
                    </div>
                    <div class="vid-body">
                        <h3>Social Media Teaser</h3>
                        <div class="vid-specs">
                            <span class="vid-tag"><i data-lucide="clock"></i> upto 60 Secs</span>
                            <span class="vid-tag"><i data-lucide="monitor"></i> 4K Vertical</span>
                        </div>
                    </div>
                </div>`;
}).join('\n');

const videoReplacement = `            <div class="section-label" style="margin-bottom: 8px;">
                <span class="label-number">🎬</span>
                <span class="label-text">Cinematic Feature</span>
            </div>
            <div class="video-row" style="margin-top: 0px; margin-bottom: 48px;">
${cinematicHtml}
            </div>
            
            <div class="section-label" style="margin-bottom: 8px;">
                <span class="label-number">📱</span>
                <span class="label-text">Social Media Teasers</span>
            </div>
            <div class="video-row" style="margin-top: 0px; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
${teaserHtml}
            </div>`;

const albumReplacement = `            <div class="album-row" style="grid-template-columns: 1fr;">
                <div class="album-card reveal-card" style="max-width: 500px; margin: 0 auto;">
                    <div class="album-thumb">
                        <img src="assets/albums.png" alt="Premium Photobook" style="object-position: 0% 0%;">
                        <div class="album-badge gold">Premium</div>
                    </div>
                    <div class="album-body">
                        <h3>Premium Photobook</h3>
                        <p>A masterfully designed physical album featuring the best moments.</p>
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
            </div>`;

let content = fs.readFileSync('e:/Quotation/index.html', 'utf-8');

content = content.replace(/<div class="photo-grid">[\s\S]*?<\/div>\s*<\/div>/, photoGridReplacement);
content = content.replace(/<div class="video-row">[\s\S]*?<\/div>\s*<\/div>/, videoReplacement);
content = content.replace(/<div class="album-row">[\s\S]*?<\/div>\s*<\/div>/, albumReplacement);

fs.writeFileSync('e:/Quotation/index.html', content, 'utf-8');
console.log('HTML correctly replaced successfully!');
