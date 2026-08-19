const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src/app/dashboard/spot');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Backgrounds
  content = content.replace(/bg-\[#(1A1D24|13171E|0C0E12|0f1720)\]/g, 'bg-[var(--background)]');
  content = content.replace(/bg-\[#(2A2B31|2A2D36)\]/g, 'bg-[var(--bg-card)]');
  
  // Borders
  content = content.replace(/border-gray-800/g, 'border-[var(--border-color)]');
  content = content.replace(/border-\[#2A2B31\]/g, 'border-[var(--border-color)]');
  content = content.replace(/border-white\/5/g, 'border-[var(--border-color)]');

  // Text Colors
  content = content.replace(/text-[#8A9BB5]/g, 'text-[var(--text-muted)]');
  content = content.replace(/text-gray-[345]00/g, 'text-[var(--text-muted)]');
  content = content.replace(/color="#8A9BB5"/g, 'color="var(--text-muted)"');
  
  // Replace text-white and #FFFFFF with CSS variables, but only in generic spots.
  // We'll replace all text-white, then revert the specific colored buttons.
  content = content.replace(/text-white/g, 'text-[var(--text-primary)]');
  content = content.replace(/color="white"/g, 'color="var(--text-primary)"');
  
  // Revert buttons that should keep white text (Buy Long, Buy Short, etc.)
  content = content.replace(/bg-\[#14B8A6\] text-\[var\(--text-primary\)\]/g, 'bg-[#14B8A6] text-white');
  content = content.replace(/bg-\[#EF4444\] text-\[var\(--text-primary\)\]/g, 'bg-[#EF4444] text-white');
  content = content.replace(/bg-purple-600 text-\[var\(--text-primary\)\]/g, 'bg-purple-600 text-white');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${path.basename(filePath)}`);
}

fs.readdirSync(directoryPath).forEach(file => {
  if (file.endsWith('.tsx')) {
    processFile(path.join(directoryPath, file));
  }
});

