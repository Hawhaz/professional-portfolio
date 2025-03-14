#!/bin/bash

# Create directory if it doesn't exist
mkdir -p src/assets/projects/redesigns

# Download placeholder images
curl "https://via.placeholder.com/600x400/4A154B/FFFFFF?text=Slack+Redesign" -o src/assets/projects/redesigns/slack-redesign.png
curl "https://via.placeholder.com/600x400/FF00BF/FFFFFF?text=Lyft+Redesign" -o src/assets/projects/redesigns/lyft-redesign.png
curl "https://via.placeholder.com/600x400/004481/FFFFFF?text=BBVA+Redesign" -o src/assets/projects/redesigns/bbva-redesign.png
curl "https://via.placeholder.com/600x400/2E7D32/FFFFFF?text=Real+Estate+Redesign" -o src/assets/projects/redesigns/realestate-redesign.png

echo "Placeholder images downloaded successfully!"
echo "You can replace these with actual screenshots later." 