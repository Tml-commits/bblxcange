const fs = require('fs');
const path = require('path');

const files = [
  'src/app/dashboard/assets/page.tsx',
  'src/app/dashboard/assets/[type]/page.tsx'
];

const replacements = [
  { regex: /text-white\/[0-9]+/g, replacement: 'text-[var(--text-muted)]' },
  { regex: /text-white/g, replacement: 'text-[var(--text-primary)]' },
  { regex: /color="white"/g, replacement: 'color="var(--text-primary)"' },
  { regex: /color:\s*["']white["']/g, replacement: 'color: "var(--text-primary)"' },
  { regex: /bg-white\/[0-9]+/g, replacement: 'bg-[var(--border-color)]' },
];

for (const file of files) {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    for (const r of replacements) {
      content = content.replace(r.regex, r.replacement);
    }

    // specific fix for text-[var(--text-primary)] on colored buttons where we actually want white
    content = content.replace(/bg-purple-600 text-\[var\(--text-primary\)\]/g, 'bg-purple-600 text-white');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`File not found: ${filePath}`);
  }
}
