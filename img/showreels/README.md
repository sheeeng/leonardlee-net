# Showreel Thumbnails

This directory contains thumbnail images for the showreel videos.

## Required Images

Place the following thumbnail images here:

- `reel1-thumb.jpg` - Acting Demo Reel 2024 thumbnail
- `reel2-thumb.jpg` - Commercial Reel thumbnail
- `reel3-thumb.jpg` - Film & TV Highlights thumbnail
- `reel4-thumb.jpg` - Voice Over Reel thumbnail

## Image Specifications

- **Format**: JPG or PNG
- **Recommended size**: 1280x720px (16:9 aspect ratio)
- **File size**: Keep under 500KB for optimal loading

## Adding Videos

Edit `_data/showreels.yml` to add YouTube or Vimeo IDs:

- For YouTube: Add the video ID to `youtube_id` field
- For Vimeo: Add the video ID to `vimeo_id` field
- For self-hosted: Add the video URL to `video_url` field

Example:

```yaml
- id: 1
  title: "Acting Demo Reel 2024"
  thumbnail: "reel1-thumb.jpg"
  youtube_id: "dQw4w9WgXcQ"  # YouTube video ID
  vimeo_id: ""
  video_url: ""
```
