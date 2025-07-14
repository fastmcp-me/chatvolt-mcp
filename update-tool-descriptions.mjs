import { readdir, readFile, writeFile } from 'fs/promises';
import path from 'path';

const SRC_TOOLS_DIR = 'src/tools';
const BUILD_TOOLS_DIR = 'build/tools';

async function updateToolDescriptions() {
  try {
    const files = await readdir(SRC_TOOLS_DIR);
    const toolFiles = files.filter(file => 
      file.endsWith('.ts') && 
      file !== 'index.ts' && 
      file !== 'tools.test.ts'
    );

    for (const toolFile of toolFiles) {
      const srcFilePath = path.join(SRC_TOOLS_DIR, toolFile);
      const buildFilePath = path.join(BUILD_TOOLS_DIR, toolFile.replace('.ts', '.js'));
      
      try {
        // Use a cache-busting query to ensure we get the fresh version
        const modulePath = path.resolve(buildFilePath) + `?update=${Date.now()}`;
        const module = await import(modulePath);
        const tool = Object.values(module).find(
          (m) => m && typeof m === 'object' && m.name && m.inputSchema
        );

        if (tool && tool.description && tool.inputSchema) {
          const { description, inputSchema } = tool;
          const originalDescription = description.split('\n\nParameters:')[0];
          
          let newDescription = originalDescription;
          
          if (inputSchema.properties && Object.keys(inputSchema.properties).length > 0) {
            newDescription += '\n\nParameters:';
            for (const [paramName, paramDetails] of Object.entries(inputSchema.properties)) {
              const isRequired = inputSchema.required?.includes(paramName);
              newDescription += `\n- \`${paramName}\` (${paramDetails.type}${isRequired ? ', required' : ''}): ${paramDetails.description || ''}`;
              if (paramDetails.enum) {
                const enumValues = paramDetails.enum.slice(0, 5).join(', ');
                newDescription += ` (values: ${enumValues}${paramDetails.enum.length > 5 ? '...' : ''})`;
              }
            }
          }

          const fileContent = await readFile(srcFilePath, 'utf-8');
          // Regex to match description with backticks, single quotes, or double quotes
          const updatedContent = fileContent.replace(
            /description: (`|'|")[\s\S]*?(`|'|"),/,
            `description: \`${newDescription.replace(/`/g, '\\`')}\`,`
          );

          await writeFile(srcFilePath, updatedContent, 'utf-8');
          console.log(`Updated description for: ${toolFile}`);
        } else {
          console.log(`No valid tool found in ${toolFile}`);
        }
      } catch (error) {
        console.error(`Error processing file ${srcFilePath}:`, error);
      }
    }
  } catch (error) {
    console.error('Error updating tool descriptions:', error);
  }
}

updateToolDescriptions();