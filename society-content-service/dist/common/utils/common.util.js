"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMenuTree = buildMenuTree;
function buildMenuTree(flatMenus) {
    const map = new Map();
    const roots = [];
    flatMenus.forEach(menu => {
        map.set(menu.menuCode, { ...menu, children: [] });
    });
    flatMenus.forEach(menu => {
        const mappedMenu = map.get(menu.menuCode);
        if (menu.menuLevel === 1 ||
            !menu.parentMenu ||
            menu.parentMenu === menu.menuCode) {
            roots.push(mappedMenu);
        }
        else {
            const parent = map.get(menu.parentMenu);
            if (parent) {
                parent.children.push(mappedMenu);
            }
        }
    });
    return roots;
}
//# sourceMappingURL=common.util.js.map