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

  const serverPageContent = `import ClientPage from './ClientPage';

export function generateStaticParams() {
  return [{ id: 'dummy' }];
}

export default function Page() {
  return <ClientPage />;
}
`;
  fs.writeFileSync(fullPath, serverPageContent, 'utf-8');
  console.log(`Updated generateStaticParams for ${relPath}`);
}
