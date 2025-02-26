import { strings, normalize } from '@angular-devkit/core';
import { apply, mergeWith, Rule, template, url, move, chain, Tree } from '@angular-devkit/schematics';

export function entity(options: { name: string; path?: string }): Rule {
    return () => {
        const path = options.path || 'src/3-widgets';
        const opt = { ...options, path };
        const templateSource = apply(url('./files'), [
            template({
                ...strings,
                ...opt,
            }),
            move(normalize(`${path}/${options.name}`)),
        ]);

        const indexRule = updateIndexFile(options.name, path);

        return chain([mergeWith(templateSource), indexRule]);
    };
}

function updateIndexFile(entityName: string, path: string): Rule {
    return (tree: Tree) => {
        const indexPath = `${path}/${entityName}/index.ts`;
        const content =
            `export * from './model/${entityName}.model';\n` +
            `export * from './api/${entityName}.service';\n` +
            `export * from './ui/${entityName}.component';\n`;

        if (tree.exists(indexPath)) {
            const currentContent = tree.read(indexPath)?.toString() || '';
            tree.overwrite(indexPath, currentContent + content);
        } else {
            tree.create(indexPath, content);
        }
        return tree;
    };
}
