from PIL import Image

img = Image.open('src/assets/back_cover.png')
# The image is 1080x1080 or similar? Let's check size
print(img.size)
