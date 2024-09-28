import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import packageJSON from './package.json';

export default ({ mode }) => {
    const isDev = mode === 'development';

    // GH-pages has /<repo>/ in the path (see "homepage" in package.json)
    const splitHomepage = packageJSON.homepage.split('/');
    const base = !isDev ? `/${splitHomepage[splitHomepage.length - 2]}/` : '/';

    return defineConfig({
        base,
        plugins: [
            react(),
            checker({
                typescript: isDev,
                overlay: {
                    initialIsOpen: false,
                },
            }),
        ],
    });
};
