import type { Plugin } from 'vite';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compile } from './compile.ts';

// Vite plugin: .vey modules compile to JavaScript on load; views use React.
export function vey(options: { jsxImport?: string } = {}): Plugin {
  const here = dirname(fileURLToPath(import.meta.url));
  return {
    name: 'vey',
    enforce: 'pre',
    config: () => ({ resolve: { alias: { 'vey/runtime': join(here, 'runtime.ts') } } }),
    resolveId(source, importer) {
      // Extensionless relative imports may point at .vey files.
      if (importer && source.startsWith('.') && !/\.[a-z]+$/i.test(source)) {
        const base = join(dirname(importer.split('?')[0]), source);
        for (const ext of ['.vey', '/index.vey']) { if (existsSync(base + ext)) return base + ext; }
      }
      return null;
    },
    transform(code, id) {
      const [file, query = ''] = id.split('?', 2);
      if (!file.endsWith('.vey') || new URLSearchParams(query).has('raw') || new URLSearchParams(query).has('url')) return null;
      const r = compile(code, { file: id, target: 'js', jsxImport: options.jsxImport });
      if (!r.ok) { const d = r.diagnostics[0]; this.error({ message: d.message, loc: { file: id, line: d.line, column: d.col } }); }
      return { code: r.code, map: null };
    },
  };
}
