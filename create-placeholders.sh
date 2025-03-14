#!/bin/bash

# Create directory if it doesn't exist
mkdir -p src/assets/projects/redesigns

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed. Please install it first with:"
    echo "sudo apt-get install imagemagick"
    exit 1
fi

# Generate placeholder images using ImageMagick
convert -size 600x400 gradient:'#4A154B-#7C3085' \
    -gravity center -pointsize 30 -fill white \
    -annotate 0 "Slack Redesign" \
    src/assets/projects/redesigns/slack-redesign.png

convert -size 600x400 gradient:'#FF00BF-#7A26C1' \
    -gravity center -pointsize 30 -fill white \
    -annotate 0 "Lyft Redesign" \
    src/assets/projects/redesigns/lyft-redesign.png

convert -size 600x400 gradient:'#004481-#1973B8' \
    -gravity center -pointsize 30 -fill white \
    -annotate 0 "BBVA México Redesign" \
    src/assets/projects/redesigns/bbva-redesign.png

convert -size 600x400 gradient:'#2E7D32-#81C784' \
    -gravity center -pointsize 30 -fill white \
    -annotate 0 "Real Estate Redesign" \
    src/assets/projects/redesigns/realestate-redesign.png

echo "Placeholder images created successfully!"
echo "You can replace these with actual screenshots later." 