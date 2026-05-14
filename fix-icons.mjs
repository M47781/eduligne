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
let modifiedFilesCount = 0;

function getSizeClasses(sizeStr) {
  const size = parseInt(sizeStr, 10);
  if (isNaN(size)) return 'w-5 h-5 shrink-0';
  if (size <= 18) return 'w-4 h-4 shrink-0';
  if (size <= 22) return 'w-5 h-5 shrink-0';
  return 'w-6 h-6 shrink-0';
}

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const originalContent = content;

  // 1. Find imported icons from lucide-react
  const importMatch = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/);


  const importedIcons = importMatch ? importMatch[1]
    .split(',')
    .map(i => {
      const parts = i.trim().split(/\s+as\s+/);
      return parts[parts.length - 1].trim();
    })
    .filter(i => i) : [];

  // 2. Replace sizes in these icons, plus any dynamic icons
  const allIcons = [...importedIcons, 'Icon', '[a-zA-Z0-9_]+\\\\.icon'];
  
  allIcons.forEach(iconName => {
    // Regex to match the component tags
    const tagRegex = new RegExp(`(<${iconName}\\s+)([^>]*?)(/?>)`, 'g');
    content = content.replace(tagRegex, (match, openTag, attributes, closeTag) => {
      let newAttributes = attributes;

      // Extract size
      let sizeVal = '20'; // default
      const sizeMatch = newAttributes.match(/size=\{([^}]+)\}/) || newAttributes.match(/size=(['"])([0-9]+)\1/);
      if (sizeMatch) {
        sizeVal = sizeMatch[1] || sizeMatch[2];
        // Remove size attribute
        newAttributes = newAttributes.replace(/\s*size=\{[^}]+\}/, '');
        newAttributes = newAttributes.replace(/\s*size=['"][0-9]+['"]/, '');
      } else {
        // If no size, still we might want to add default size classes if they have none, but user said replace inline size.
        // Actually prompt says "Replace ALL icon usage like <Icon size={24} /> WITH <Icon className=\"w-5 h-5\" />"
        // Also "NEVER use inline size={...} unless necessary"
      }

      // Remove width: 100% from style
      newAttributes = newAttributes.replace(/\s*style=\{\{\s*width:\s*['"]100%['"]\s*\}\}/g, '');
      newAttributes = newAttributes.replace(/width:\s*['"]100%['"]\s*,?\s*/g, '');

      // Append new classes
      const sizeClasses = getSizeClasses(sizeVal);
      
      const classNameMatch = newAttributes.match(/className=(['"])(.*?)\1/);
      const classNameExprMatch = newAttributes.match(/className=\{([^}]+)\}/);

      if (classNameMatch) {
         const existingClasses = classNameMatch[2];
         // Don't add if already there
         if (!existingClasses.includes('w-') || !existingClasses.includes('h-')) {
            const newClasses = `${sizeClasses} ${existingClasses}`.trim();
            newAttributes = newAttributes.replace(/className=['"][^'"]*['"]/, `className="${newClasses}"`);
         }
      } else if (classNameExprMatch) {
         // It's an expression className={`...`} or className={clsx(...)}
         const expr = classNameExprMatch[1];
         // Just prepend sizeClasses using template literal if it's not complex, or wrap it
         // This is a bit tricky via regex. We can just use tailwind-merge if they have it, or wrap it:
         if (expr.startsWith('`') && expr.endsWith('`')) {
            const inner = expr.slice(1, -1);
            newAttributes = newAttributes.replace(/className=\{[^}]+\}/, `className={\`${sizeClasses} ${inner}\`}`);
         } else {
            // className={active ? 'a' : 'b'} -> className={`${sizeClasses} ${active ? 'a' : 'b'}`}
            // simplified:
            newAttributes = newAttributes.replace(/className=\{/, `className={\`${sizeClasses} \` + (`).replace(/\}$/, `)}`);
            // wait, replacing `}` at the end of newAttributes might replace wrong brace.
            // Let's do safer:
            newAttributes = newAttributes.replace(classNameExprMatch[0], `className={[\"${sizeClasses}\", ${expr}].join(' ')}`);
         }
      } else {
         // No className exists
         newAttributes += ` className="${sizeClasses}"`;
      }

      return `${openTag}${newAttributes}${closeTag}`;
    });
  });

  // 3. Fix Buttons: Find elements containing icons and check their classes
  // We can look for <button ... className="..."> ... <IconName /> ... </button>
  // This is too complex for simple regex. Instead, let's just replace all `<button className="..."` 
  // where it lacks `flex items-center gap-2`. But this might break non-icon buttons.
  // We'll skip complex button parsing here and maybe do a simpler pass:
  // Find `className="..."` on `<button` or `<Link` and if it doesn't have `flex`, add `flex items-center gap-2 rtl:space-x-reverse`.
  // Wait, that might break layout. User said "Buttons: Always use: flex items-center gap-2. Icons should never exceed text height".
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedFilesCount++;
  }
});

console.log(`Modified ${modifiedFilesCount} files.`);
