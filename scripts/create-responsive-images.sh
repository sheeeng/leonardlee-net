#!/bin/bash

# Create responsive image sizes for hero images
# Mobile: 600w, Tablet: 1200w, Desktop: 1920w

echo "Creating responsive images..."

# DSC0077.webp (mobile portrait)
magick img/DSC0077.webp -resize 600x img/DSC0077-600w.webp
magick img/DSC0077.webp -resize 1200x img/DSC0077-1200w.webp

# DSC_7913.webp (desktop landscape)
magick img/DSC_7913.webp -resize 1200x img/DSC_7913-1200w.webp
magick img/DSC_7913.webp -resize 1920x img/DSC_7913-1920w.webp
magick img/DSC_7913.webp -resize 2560x img/DSC_7913-2560w.webp

echo "Done! Created responsive images:"
ls -lh img/DSC0077-*.webp img/DSC_7913-*.webp
