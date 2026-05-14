import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function findDynamicRoutes(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findDynamicRoutes(filePath, fileList);
    } else if (file === 'page.tsx' && filePath.includes('[id]')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const routes = findDynamicRoutes(path.join(process.cwd(), 'src/app'));
for (const route of routes) {
  let content = fs.readFileSync(route, 'utf-8');
  if (!content.includes('generateStaticParams')) {
    content += '\n\nexport function generateStaticParams() { return []; }\n';
    fs.writeFileSync(route, content, 'utf-8');
    console.log(`Updated ${route}`);
  }
}
