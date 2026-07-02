import os

try:
    from PIL import Image
except ImportError:
    print("\n[!] Pillow kütüphanesi eksik. Lütfen terminalde şu komutu çalıştırıp tekrar dene:")
    print("    pip install Pillow\n")
    exit(1)

# Path to the uploaded media file in the system generated brain folder
src = r"C:\Users\Scumy\.gemini\antigravity\brain\c6dc3343-7559-43c7-abf8-45b5510c0189\media__1782986783808.png"
dst = r"C:\Users\Scumy\.gemini\antigravity\scratch\portfolio-cv\favicon.png"

if not os.path.exists(src):
    print(f"HATA: Kaynak logo görseli bulunamadı: {src}")
    exit(1)

# Load the image
img = Image.open(src)
width, height = img.size
print(f"Görsel yüklendi: {width}x{height}")

# Since the text "EB" is centered, we crop a square area around the center
crop_size = int(height * 0.9)
left = (width - crop_size) // 2
top = (height - crop_size) // 2
right = left + crop_size
bottom = top + crop_size

cropped_img = img.crop((left, top, right, bottom))
cropped_img = cropped_img.convert("RGBA")

# Make the dark background transparent
data = cropped_img.getdata()
new_data = []

print("Arka plan şeffaflaştırılıyor...")
for item in data:
    r, g, b, a = item
    # If the pixel is very dark (close to black background), set alpha to 0
    if r < 35 and g < 35 and b < 38:
        new_data.append((0, 0, 0, 0))
    else:
        new_data.append(item)

cropped_img.putdata(new_data)

# Resize to standard favicon sizes and save
favicon_32 = cropped_img.resize((32, 32), Image.Resampling.LANCZOS)
favicon_32.save(dst)

# Also save a high resolution one for mobile shortcuts
dst_large = r"C:\Users\Scumy\.gemini\antigravity\scratch\portfolio-cv\favicon-large.png"
cropped_img.resize((192, 192), Image.Resampling.LANCZOS).save(dst_large)

print(f"\n✔ BAŞARILI! Sekme ikonları oluşturuldu:")
print(f"  - Standart Favicon (32x32): {dst}")
print(f"  - Büyük İkon (192x192): {dst_large}")
