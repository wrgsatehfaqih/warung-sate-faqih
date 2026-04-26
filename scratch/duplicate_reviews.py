import sys
import re

file_path = 'index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Card 1 to 4
review_cards = """                    <!-- Review 1 -->
                    <div class="snap-center shrink-0 w-[85vw] md:w-[420px] bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-brand-orange cursor-grab active:cursor-grabbing">
                        <div class="flex text-brand-gold text-sm mb-4"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                        <p class="text-gray-700 italic mb-6 leading-relaxed">"Rasa sate kambingnya tidak pernah berubah sejak saya diajak kakek saya makan di sini tahun 90-an. Dagingnya empuk, bumbunya meresap juara! Aroma asapnya sangat khas."</p>
                        <div class="flex items-center space-x-3 mt-auto">
                            <div class="w-10 h-10 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold">B</div>
                            <div>
                                <p class="font-bold text-sm text-brand-dark">Budi Santoso</p>
                                <p class="text-xs text-gray-500">Local Guide</p>
                            </div>
                        </div>
                    </div>
                    <!-- Review 2 -->
                    <div class="snap-center shrink-0 w-[85vw] md:w-[420px] bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-brand-gold cursor-grab active:cursor-grabbing">
                        <div class="flex text-brand-gold text-sm mb-4"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                        <p class="text-gray-700 italic mb-6 leading-relaxed" data-i18n="rev_2">"Pelayanannya sangat ramah dan hangat. Gule nya sangat recommended. Sangat cocok untuk makan bersama keluarga besar. Tempat legendaris yang membuktikan kualitas."</p>
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold">D</div>
                            <div>
                                <p class="font-bold text-sm text-brand-dark">Dian Pertiwi</p>
                                <p class="text-xs text-gray-500">2 bulan lalu</p>
                            </div>
                        </div>
                    </div>
                    <!-- Review 3 -->
                    <div class="snap-center shrink-0 w-[85vw] md:w-[420px] bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-brand-brown cursor-grab active:cursor-grabbing">
                        <div class="flex text-brand-gold text-sm mb-4"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                        <p class="text-gray-700 italic mb-6 leading-relaxed" data-i18n="rev_3">"Warung sate yang sesungguhnya! Bumbu kacangnya ditumbuk kasar, rasanya otentik. Walau tempatnya sederhana tapi auranya luar biasa. Bintang 5 untuk warisan rasa ini!"</p>
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-[#1A1A1A] text-white rounded-full flex items-center justify-center font-bold">A</div>
                            <div>
                                <p class="font-bold text-sm text-brand-dark">Andi Wijaya</p>
                                <p class="text-xs text-gray-500">Local Guide</p>
                            </div>
                        </div>
                    </div>
                    <!-- Review 4 (Tambahan agar slider terasa lebih panjang) -->
                    <div class="snap-center shrink-0 w-[85vw] md:w-[420px] bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-brand-dark cursor-grab active:cursor-grabbing">
                        <div class="flex text-brand-gold text-sm mb-4"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                        <p class="text-gray-700 italic mb-6 leading-relaxed" data-i18n="rev_4">"Sate dan gulenya mantap! Potongan daging besar-besar, kuah gule medok rempahnya berasa banget. Wajib mampir kalau lagi di Jombang atau lewat Mojowarno."</p>
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-brand-gold text-white rounded-full flex items-center justify-center font-bold">S</div>
                            <div>
                                <p class="font-bold text-sm text-brand-dark">Siti Nurhaliza</p>
                                <p class="text-xs text-gray-500">5 bulan lalu</p>
                            </div>
                        </div>
                    </div>"""

all_reviews = review_cards + "\n" + review_cards.replace("Review 1", "Review 5").replace("Review 2", "Review 6").replace("Review 3", "Review 7").replace("Review 4 (Tambahan agar slider terasa lebih panjang)", "Review 8")

# We will replace everything inside <div id="reviews-container" ...> ... </div>
import re
new_content = re.sub(r'(<div id="reviews-container"[^>]*>).*?(</div>\s*</div>\s*</div>\s*</section>)', r'\1\n' + all_reviews + r'\n                \2', content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
