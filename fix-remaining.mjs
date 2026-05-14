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

function getSizeClasses(sizeStr) {
  const size = parseInt(sizeStr, 10);
  if (isNaN(size)) return 'w-5 h-5 shrink-0';
  if (size <= 18) return 'w-4 h-4 shrink-0';
  if (size <= 22) return 'w-5 h-5 shrink-0';
  return 'w-6 h-6 shrink-0';
}

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. Fix leftover size={...} on dynamic components like <stat.icon size={24} />
  content = content.replace(/<([a-zA-Z0-9_]+\.[a-zA-Z0-9_]+|Icon)\s+([^>]*?)size=\{([0-9]+)\}([^>]*?)\/?>/g, (match, tag, before, size, after) => {
    let classes = getSizeClasses(size);
    let attrs = (before + after).trim();
    // if className exists
    if (attrs.includes('className=')) {
       attrs = attrs.replace(/className=(['"])(.*?)\1/, `className="$2 ${classes}"`);
       // handle expression className={...}
       if (attrs.includes('className={')) {
          // very basic handling for string concat className
          attrs = attrs.replace(/className=\{\`([^`]*)\`\}/, `className={\`$1 ${classes}\`}`);
       }
       return `<${tag} ${attrs} />`;
    } else {
       return `<${tag} className="${classes}" ${attrs} />`;
    }
  });

  // 2. Fix the syntax errors created earlier: className={`w-5 h-5 shrink-0 ` + (`w-4 h-4 shrink-0 ` + (isActive ? 'text-white' : 'text-green-500'}
  // Find things like: className={`w-5 h-5 shrink-0 ` + (`w-4 h-4 shrink-0 ` + (expr}
  content = content.replace(/className=\{\`([w\-\dh\s]+)\`\s*\+\s*\(\`([w\-\dh\s]+)\`\s*\+\s*\((.*?)\}/g, "className={`$1 ${$3}`}");
  
  // Find things like: className={`w-5 h-5 shrink-0 ` + (expr}
  content = content.replace(/className=\{\`([w\-\dh\s]+)\`\s*\+\s*\((.*?)\}/g, "className={`$1 ${$2}`}");

  // Also fix `<CheckCircle2  className={`w-5 h-5 shrink-0 ` + (`w-4 h-4 shrink-0 ` + (isActive ? 'text-white/80' : 'text-green-500'}` without closing paren
  content = content.replace(/className=\{\`([w\-\dh\s]+)\`\s*\+\s*\(\`([w\-\dh\s]+)\`\s*\+\s*\(([^}]+)\}/g, "className={`$1 ${$3}`}");

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed', file);
  }
});
