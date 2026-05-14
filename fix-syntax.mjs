import fs from 'fs';
import path from 'path';

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  content = content.replace(/className=\{\`([w\-\dh\s]+)\`\s*\+\s*\(\`([w\-\dh\s]+)\`\s*\+\s*\((.*?)\}/g, 'className={`$1 ${$3}`}');
  content = content.replace(/className=\{\`([w\-\dh\s]+)\`\s*\+\s*\((.*?)\}/g, 'className={`$1 ${$2}`}');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed syntax in', file);
  }
});
