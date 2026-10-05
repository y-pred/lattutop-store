-- Add the new lifestyle photo and Instagram-reel video to the Coder
-- collectible's gallery. ProductGallery.jsx auto-detects video files by
-- extension (.mp4/.webm/.mov) and renders a <video> player instead of an
-- <Image> for those entries.

update public.products
set images = ARRAY[
  '/products/coder-collectible/group.jpg',
  '/products/coder-collectible/grey.jpg',
  '/products/coder-collectible/olive.jpg',
  '/products/coder-collectible/black.jpg',
  '/products/coder-collectible/lifestyle.jpg',
  '/products/coder-collectible/reel.mp4'
]
where id = 'coder-collectible';
