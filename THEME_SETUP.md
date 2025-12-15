# Freelancer Theme Setup

This site uses the Freelancer Jekyll theme - a one-page Bootstrap portfolio theme.

## Installation

1. **Install dependencies:**

   ```bash
   bundle install
   ```

2. **Run the site locally:**

   ```bash
   bundle exec jekyll serve
   ```

3. **View your site:**
   Open <http://localhost:4000> in your browser

## Customization

### _config.yml

Edit `_config.yml` to customize:

- `title`: Your name
- `email`: Your email address
- `skills`: Your tagline/skills
- `description`: Site description
- `color`: Theme colors (primary, secondary)
- `social`: Your social media links
- `address`: Your contact address
- `footer`: Footer text

### Portfolio Items

Create new portfolio projects in `_posts/` with this format:

```markdown
---
layout: default
modal-id: 1
date: 2025-12-15
img: project-image.png
alt: image description
project-date: December 2025
client: Client Name
category: Web Development
description: Your project description here
---
```

### Images

- Place portfolio images in `/img/portfolio/`
- Update profile picture at `/img/profile.png`

### Contact Form

The theme uses Formspree for contact forms (static mode). Update your email in `_config.yml`.

## Theme Documentation

- [Freelancer Theme GitHub](https://github.com/jeromelachaud/freelancer-theme)
- [Jekyll Documentation](https://jekyllrb.com/docs/)

## Colors

Update the color scheme in `_config.yml`:

- `primary`: Main color (header, links)
- `secondary`: Footer color
- `secondary-dark`: Footer bottom color

Use hex colors without the `#` symbol.
