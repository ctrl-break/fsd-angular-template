const path = require('path');
const fs = require('fs');

// ======================== Common constants and utilities ========================
const LAYERS_ORDER = [
    'app', // 1-app
    'pages', // 2-pages
    'widgets', // 3-widgets
    'features', // 4-features
    'entities', // 5-entities
    'shared', // 6-shared
];

const API_FILE = 'index.ts';

const regex = /\d+-(app|pages|widgets|features|entities|shared)/;

// Converts aliases to absolute paths
function resolveAliasPath(importPath) {
    return importPath.replace(/^@\//, 'src/');
}

// Removes the numeric prefix from the layer name
function removeIndexFromLayer(layerPathName) {
    if (!layerPathName.match(regex)) return layerPathName;
    const parts = layerPathName.split('-');
    return parts[1];
}

// Extracts the layer from the file path
function getLayer(filePath) {
    const parts = filePath.split(path.sep);
    const result = parts.find((part) => LAYERS_ORDER.includes(removeIndexFromLayer(part)));
    return result ? removeIndexFromLayer(result) : null;
}

// Extracts the entity from the file path (first directory after the layer)
function getEntity(filePath) {
    const parts = filePath.split(path.sep);
    const layerIndex = parts.findIndex((p) => LAYERS_ORDER.includes(removeIndexFromLayer(p)));
    return layerIndex !== -1 ? parts[layerIndex + 1] : null;
}

// Checks if the import is internal
function isInternalImport(importPath) {
    return importPath.startsWith('@/') || importPath.startsWith('./') || importPath.startsWith('../');
}

// ======================== Rule 1: Prevent imports from upper layers ========================
function createNoUpperLayerImports() {
    return {
        meta: { type: 'problem' },
        create(context) {
            return {
                ImportDeclaration(node) {
                    const currentPath = context.getFilename();
                    const importPath = node.source.value;

                    if (!isInternalImport(importPath)) return;

                    const currentLayer = getLayer(currentPath);
                    const targetLayer = getLayer(resolveAliasPath(importPath));

                    if (!currentLayer || !targetLayer) return;

                    const currentIdx = LAYERS_ORDER.indexOf(currentLayer);
                    const targetIdx = LAYERS_ORDER.indexOf(targetLayer);

                    if (targetIdx < currentIdx) {
                        context.report({
                            node,
                            message: `Import from layer "${targetLayer}" into "${currentLayer}" is forbidden`,
                        });
                    }
                },
            };
        },
    };
}

// ======================== Rule 2: Prevent cross-imports within the same layer ========================
function createNoCrossLayerImports() {
    return {
        meta: { type: 'problem' },
        create(context) {
            return {
                ImportDeclaration(node) {
                    const currentPath = context.getFilename();
                    const importPath = node.source.value;

                    if (!isInternalImport(importPath)) return;

                    const currentLayer = getLayer(currentPath);
                    const targetLayer = getLayer(resolveAliasPath(importPath));

                    // Skip if layers are different
                    if (currentLayer !== targetLayer) return;

                    const currentEntity = getEntity(currentPath);
                    const targetEntity = getEntity(resolveAliasPath(importPath));

                    if (currentEntity && targetEntity && currentEntity !== targetEntity) {
                        context.report({
                            node,
                            message: `Cross-import between entities "${currentEntity}" and "${targetEntity}" within layer "${currentLayer}" is forbidden`,
                        });
                    }
                },
            };
        },
    };
}

// ======================== Rule 3: Import only through the public API ========================
function createPublicApiImports() {
    return {
        meta: { type: 'problem' },
        create(context) {
            return {
                ImportDeclaration(node) {
                    const importPath = node.source.value;
                    const currentPath = context.getFilename();

                    if (!isInternalImport(importPath)) return;
                    if (!importPath.includes('@/')) return;

                    const currentLayer = getLayer(currentPath);
                    if (!currentLayer || currentLayer === 'app') return;

                    if (importPath.split('/')?.length <= 3) return;

                    context.report({
                        node,
                        message: `Import must be done only through the public API (${API_FILE})`,
                    });
                },
            };
        },
    };
}

// Export the rules
module.exports = {
    rules: {
        'no-upper-layer-imports': createNoUpperLayerImports(),
        'no-cross-layer-imports': createNoCrossLayerImports(),
        'public-api-imports': createPublicApiImports(),
    },
};
