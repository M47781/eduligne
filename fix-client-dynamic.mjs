import fs from 'fs';
import path from 'path';

const filesToFix = [
  'src/app/admin/users/[id]/page.tsx',
  'src/app/parent/children/[id]/page.tsx',
  'src/app/student/courses/[id]/page.tsx',
  'src/app/student/quiz/[id]/page.tsx',
  'src/app/student/stem/project/[id]/page.tsx'
];

for (const relPath of filesToFix) {
  const fullPath = path.join(process.cwd(), relPath);
  if (!fs.existsSync(fullPath)) continue;

  let content = fs.readFileSync(fullPath, 'utf-8');
  
  // Remove the generateStaticParams we injected earlier
  content = content.replace(/export function generateStaticParams\(\) \{ return \[\]; \}/g, '');
  
  // Rename the current page.tsx to ClientPage.tsx
  const clientPagePath = path.join(path.dirname(fullPath), 'ClientPage.tsx');
  fs.writeFileSync(clientPagePath, content, 'utf-8');
  
  // Create a new Server Component page.tsx
  const serverPageContent = `import ClientPage from './ClientPage';

export function generateStaticParams() {
  return [];
}

export default function Page() {
  return <ClientPage />;
}
`;
  fs.writeFileSync(fullPath, serverPageContent, 'utf-8');
  console.log(`Refactored ${relPath} into Server/Client components`);
}
