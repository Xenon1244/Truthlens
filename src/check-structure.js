const fs = require('fs');
const path = require('path');

const componentsPath = path.join(__dirname, 'components', 'articles');

console.log('Checking components directory...');
console.log('Full path:', componentsPath);

if (fs.existsSync(componentsPath)) {
  console.log('✓ components/articles directory exists');
  const files = fs.readdirSync(componentsPath);
  console.log('Files in directory:', files);
} else {
  console.log('✗ components/articles directory does not exist');
}

// Check individual files
const filesToCheck = [
  'BiasIndicator.js',
  'ArticleGrid.js', 
  'FeaturedArticle.js'
];

filesToCheck.forEach(file => {
  const filePath = path.join(componentsPath, file);
  if (fs.existsSync(filePath)) {
    console.log(`✓ ${file} exists`);
  } else {
    console.log(`✗ ${file} does not exist`);
  }
});