from PIL import Image

img_path = "/Users/andresugai/.gemini/antigravity/brain/e7a3fc84-0f6b-4c76-adeb-efe0870d25a5/.user_uploaded/media_1790517601219.jpg"
img = Image.open(img_path)
print(f"Size: {img.size}")
