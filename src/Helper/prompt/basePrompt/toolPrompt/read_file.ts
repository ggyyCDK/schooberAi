export function getReadFileDescription(workDir: string): string {
    return `## read_file
Description: Request to read the contents of one or more files at the specified path.The tool outputs line-numbered content (e.g. "1 | const x = 1") for easy reference when creating diffs or discussing code, Use this when you need to examine the contents of an existing file you do not know the contents of, for example to analyze code, review text files, or extract information from configuration files. Automatically extracts raw text from PDF and DOCX files. May not be suitable for other types of binary files, as it returns the raw content as a string.
Parameters:
- args: Contains one or more file elements, where each file contains:
  - path: (required) File path (relative to workspace directory ${workDir})

Usage:
<read_file>
<args>
  <file>
    <path>path/to/file</path>
  </file> 
</args>
</read_file>

Examples:

1. Reading a single file:
<read_file>
<args>
  <file>
    <path>src/app.ts</path>
  </file>
</args>
</read_file>

2. Reading multiple files
<read_file>
<args>
  <file>
    <path>src/app.ts</path>
  </file>
  <file>
    <path>src/utils.ts</path>
  </file>
</args>
</read_file>

IMPORTANT: You MUST use this Efficient Reading Strategy:
- You MUST read all related files and implementations together in a single operation (up to 5 files at once)
- You MUST obtain all necessary context before proceeding with changes
- When you need to read more than 5 files, prioritize the most critical files first, then use subsequent read_file requests for additional files`
}
