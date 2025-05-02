const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourceDir = path.join(__dirname, 'images', 'doubleOak');
const outputDir = path.join(__dirname, 'images', 'doubleOak_resized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`Created output directory: ${outputDir}`);
} else {
    console.log(`Output directory already exists: ${outputDir}`);
}

// Helper function to get image file paths
function getImageFiles() {
    console.log(`Reading files from: ${sourceDir}`);
    const files = fs.readdirSync(sourceDir)
        .filter(file => file.endsWith('.jpg'))
        .map(file => ({
            name: file,
            path: path.join(sourceDir, file)
        }));
    console.log(`Found ${files.length} JPG files`);
    return files;
}

// Main function to process images
async function resizeImages() {
    const images = getImageFiles();
    console.log(`Found ${images.length} images to resize.`);
    
    // Process each image
    for (const image of images) {
        try {
            console.log(`Processing ${image.name}...`);
            const outputPath = path.join(outputDir, image.name);
            
            // Get original file size
            const stats = fs.statSync(image.path);
            const originalSizeMB = stats.size / (1024 * 1024);
            const targetSizeMB = 2;
            
            // Calculate resize percentage based on original size
            const sizeRatio = targetSizeMB / originalSizeMB;
            
            // Start with quality of 80 and adjust based on size ratio
            let quality = 80;
            let resizePercentage = 100;
            
            if (sizeRatio < 0.9) {
                // Need significant reduction - resize dimensions and reduce quality
                quality = Math.max(60, Math.min(80, Math.floor(80 * sizeRatio * 1.2)));
                resizePercentage = Math.max(50, Math.min(90, Math.floor(100 * Math.sqrt(sizeRatio))));
            }
            
            console.log(`  Settings: Quality=${quality}%, Resize=${resizePercentage}%`);
            
            // Process the image
            await sharp(image.path)
                .resize({ 
                    width: Math.floor(resizePercentage / 100 * 2000), // Using 2000px as max width
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .jpeg({ quality: quality })
                .toFile(outputPath);
                
            // Verify final size
            if (fs.existsSync(outputPath)) {
                const newStats = fs.statSync(outputPath);
                const newSizeMB = newStats.size / (1024 * 1024);
                console.log(`  Original: ${originalSizeMB.toFixed(2)}MB, New: ${newSizeMB.toFixed(2)}MB`);
                
                // If still too large, do a second pass with more aggressive settings
                if (newSizeMB > 2.2) {
                    console.log(`  Image still too large, doing a second pass...`);
                    const secondQuality = Math.max(50, quality - 10);
                    const secondResize = Math.max(40, resizePercentage - 10);
                    
                    await sharp(image.path)
                        .resize({ 
                            width: Math.floor(secondResize / 100 * 2000),
                            fit: 'inside',
                            withoutEnlargement: true
                        })
                        .jpeg({ quality: secondQuality })
                        .toFile(outputPath);
                        
                    const finalStats = fs.statSync(outputPath);
                    const finalSizeMB = finalStats.size / (1024 * 1024);
                    console.log(`  After second pass: ${finalSizeMB.toFixed(2)}MB (Quality=${secondQuality}%, Resize=${secondResize}%)`);
                }
            } else {
                console.error(`  Failed to create output file: ${outputPath}`);
            }
        } catch (err) {
            console.error(`Error processing ${image.name}:`, err);
        }
    }
    
    console.log('All images have been processed.');
}

// Run the script
resizeImages().catch(err => {
    console.error('Error:', err);
}); 