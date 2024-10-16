import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@use-morph/mdx-plugin';
import remarkGfm from '@use-morph/remark-gfm-plugin';
import { Plugin } from 'vite';

function addImportToMDX(): Plugin {
  return {
    name: 'add-import-to-mdx',
    enforce: 'pre',
    transform(code, id) {
      // MDXファイルだけを対象にする
      if (id.endsWith('.mdx')) {
        // 既にインポートされていないか確認
        if (!code.includes("import { variable } from '@use-morph/page'")) {
          // 行頭にインポート文を追加
          return {
            code: `import { variable } from '@use-morph/page';\n${code}`,
            map: null,
          };
        }
      }
      return null;
    },
  };
}

const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [],
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), { enforce: 'pre', ...mdx(mdxOptions) }, addImportToMDX()],
  server: {
    port: 3000,
  },
});
