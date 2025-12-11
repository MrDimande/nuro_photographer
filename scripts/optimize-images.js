/**
 * Image Optimization Script
 * 
 * Optimizes all images in the public folder:
 * - Converts to WebP format
 * - Compresses with quality settings
 * - Creates responsive sizes
 * 
 * Run with: node scripts/optimize-images.js
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, '../public');
const OUTPUT_DIR = path.join(__dirname, '../public/optimized');

// Quality settings
const QUALITY = {
  webp: 85,
  jpeg: 85,
};

// Responsive sizes
const SIZES = [
  { suffix: '-sm', width: 640 },
  { suffix: '-md', width: 1024 },
  { suffix: '-lg', width: 1920 },
];

async function optimizeImages() {
  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Get all image files
  const files = fs.readdirSync(INPUT_DIR).filter(file => 
    /\.(jpg|jpeg|png|webp)$/i.test(file)
  );

  console.log(`Found ${files.length} images to optimize...`);

  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    const baseName = path.parse(file).name;

    try {
      const image = sharp(inputPath);
      const metadata = await image.metadata();

      console.log(`Processing: ${file} (${metadata.width}x${metadata.height})`);

      // Create WebP version at original size
      await sharp(inputPath)
        .webp({ quality: QUALITY.webp })
        .toFile(path.join(OUTPUT_DIR, `${baseName}.webp`));

      // Create responsive sizes
      for (const size of SIZES) {
        if (metadata.width > size.width) {
          await sharp(inputPath)
            .resize(size.width, null, { withoutEnlargement: true })
            .webp({ quality: QUALITY.webp })
            .toFile(path.join(OUTPUT_DIR, `${baseName}${size.suffix}.webp`));
        }
      }

      console.log(`✓ Optimized: ${file}`);
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error.message);
    }
  }

  console.log('\nOptimization complete!');
}

optimizeImages();
