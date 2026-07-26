#!/usr/bin/env python3

import os
from PIL import Image

def create_social_preview():
    """Create a social media preview image using the first 9 images from the website."""
    
    # List of the first 9 images shown on the website (in order of appearance):
    # the 4 hero videos, then the first 5 tiles of the Experience grid.
    # Keep in sync with HERO_THUMBNAILS / THUMBNAILS_2ND_SECTION /
    # THUMBNAILS_3RD_SECTION in src/lib/thumbnails.ts.
    image_files = [
        "thumbnails/d780a5af-54ca-40db-bc78-e08a908bab07.jpg",
        "thumbnails/2fc0d168-c261-4097-a930-1775efc05993.jpg",
        "thumbnails/21b39e9f-fd09-481a-b7d5-cfd0c951bc94.jpg",
        "thumbnails/e45d0e8c-ac8d-47c4-b32b-c615066d3663.jpg",
        "thumbnails/36fbc33c-2ccc-4702-8337-4541d83d422e.jpg",
        "thumbnails/e8958970-501b-42e8-8005-e9768e951603.jpg",
        "thumbnails/5b927dd5-beba-48cc-ae25-8df1d030979a.jpg",
        "thumbnails/e2723fbb-c855-43db-bf63-3a74211277fd.jpg",
        "thumbnails/3641351b-10eb-4153-a8c4-cfa30fc57c16.jpg"
    ]
    
    # Check that all images exist
    missing_files = []
    for img_file in image_files:
        if not os.path.exists(img_file):
            missing_files.append(img_file)
    
    if missing_files:
        print(f"Missing image files: {missing_files}")
        return
    
    # Load and resize images
    target_size = (400, 225)  # 16:9 aspect ratio for each grid cell
    images = []
    
    for img_file in image_files:
        try:
            img = Image.open(img_file)
            # Convert to RGB if necessary
            if img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Resize to fit within target size while maintaining aspect ratio
            img.thumbnail(target_size, Image.Resampling.LANCZOS)
            
            # Create a new image with the target size and paste the resized image centered
            new_img = Image.new('RGB', target_size, (0, 0, 0))  # Black background
            
            # Calculate position to center the image
            x_offset = (target_size[0] - img.width) // 2
            y_offset = (target_size[1] - img.height) // 2
            
            new_img.paste(img, (x_offset, y_offset))
            images.append(new_img)
            print(f"Loaded and resized: {img_file} (original: {Image.open(img_file).size}, final: {img.size})")
        except Exception as e:
            print(f"Error loading {img_file}: {e}")
            return
    
    # Create 3x3 grid
    grid_width = target_size[0] * 3
    grid_height = target_size[1] * 3
    
    # Create the final grid image
    grid_image = Image.new('RGB', (grid_width, grid_height), (0, 0, 0))
    
    # Paste images in 3x3 grid
    for i, img in enumerate(images):
        row = i // 3
        col = i % 3
        x = col * target_size[0]
        y = row * target_size[1]
        grid_image.paste(img, (x, y))
        print(f"Placed image {i+1} at position ({row+1}, {col+1})")
    
    # Save the final image
    output_file = "social_preview.jpg"
    grid_image.save(output_file, "JPEG", quality=95, optimize=True)
    print(f"Social media preview saved as: {output_file}")
    print(f"Final image dimensions: {grid_width} x {grid_height}")

if __name__ == "__main__":
    create_social_preview()