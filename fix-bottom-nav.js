const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/home/mobile/MobileBottomNav.tsx');

if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace all "#FFFFFF" with "var(--text-primary)"
  content = content.replace(/"#FFFFFF"/g, '"var(--text-primary)"');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated MobileBottomNav.tsx');
} else {
  console.log('File not found');
}
