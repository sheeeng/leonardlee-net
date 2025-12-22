# README

```shell
magick input.png -alpha set -channel RGBA -fuzz 32% -fill none -floodfill +0+0 white -shave 1x1 output.png
```

```shell
find img/portfolio -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -not -name "*.webp" | while read file; do outfile="${file%.*}.webp"; echo "Converting $file to $outfile"; cwebp "$file" -o "$outfile"; done
```

```shell
find img/portfolio/samurai-armor-photo-studio/portrait -type f -iname "*.webp" | while read file; do echo "Rotating $file"; magick "$file" -rotate -90 "$file"; done
```
