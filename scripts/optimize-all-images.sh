#!/bin/bash

# Create responsive image sizes for all portfolio and showreel images
# Thumbnail sizes: 400w (mobile), 800w (desktop/retina)

echo "Creating responsive portfolio images..."

# Find all portfolio images (portrait and landscape)
find img/portfolio -type f -name "*.webp" ! -name "*-400w.webp" ! -name "*-800w.webp" | while read img; do
  dir=$(dirname "$img")
  filename=$(basename "$img" .webp)

  echo "Processing: $img"
  magick "$img" -resize 400x "$dir/${filename}-400w.webp"
  magick "$img" -resize 800x "$dir/${filename}-800w.webp"
done

echo ""
echo "Creating responsive showreel thumbnails..."

# Find all showreel thumbnails
find img/showreels -type f -name "*.webp" ! -name "*-400w.webp" ! -name "*-800w.webp" | while read img; do
  dir=$(dirname "$img")
  filename=$(basename "$img" .webp)

  echo "Processing: $img"
  magick "$img" -resize 400x "$dir/${filename}-400w.webp"
  magick "$img" -resize 800x "$dir/${filename}-800w.webp"
done

echo ""
echo "Creating additional hero image size..."
magick img/DSC0077-1200w.webp -resize 600x img/DSC0077-600w.webp 2>/dev/null || echo "Already exists"

echo ""
echo "Done! Summary:"
echo "Portfolio images (400w):"
find img/portfolio -name "*-400w.webp" | wc -l
echo "Portfolio images (800w):"
find img/portfolio -name "*-800w.webp" | wc -l
echo "Showreel images (400w):"
find img/showreels -name "*-400w.webp" | wc -l
echo "Showreel images (800w):"
find img/showreels -name "*-800w.webp" | wc -l
