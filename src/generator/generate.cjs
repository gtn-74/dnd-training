"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_morph_1 = require("ts-morph");
// キャメルケースからスネークケースに変換する関数
function toSnakeCase(camelCase) {
    return camelCase.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}
// ts-morph プロジェクトを作成
var project = new ts_morph_1.Project();
// ファイルを追加 (style.ts のパスを指定)
var filePath = "../style/style.ts";
var sourceFile = project.addSourceFileAtPath(filePath);
// プロパティを置き換える
sourceFile.forEachDescendant(function (node) {
    // プロパティ署名を探す
    if (node.getKind() === ts_morph_1.SyntaxKind.PropertyAssignment) {
        var property = node.asKind(ts_morph_1.SyntaxKind.PropertyAssignment);
        if (property) {
            var nameNode = property.getNameNode();
            // プロパティ名が識別子 (キャメルケースの場合)
            if (nameNode.getKind() === ts_morph_1.SyntaxKind.Identifier) {
                var oldName = nameNode.getText();
                var newName = toSnakeCase(oldName);
                // プロパティ名を変更
                nameNode.replaceWithText(newName);
            }
        }
    }
});
// 書き換えた内容を保存
sourceFile.saveSync();
console.log("style.tsのプロパティ名をスネークケースに変換しました。");
