import { Project, SyntaxKind } from "ts-morph";

// キャメルケースからスネークケースに変換する関数
function toSnakeCase(snake_case: string): string {
  return snake_case.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

// ts-morph プロジェクトを作成
const project = new Project();

// ファイルを追加 (style.ts のパスを指定)
const filePath = "../style/style.ts";
const sourceFile = project.addSourceFileAtPath(filePath);

// プロパティを置き換える
sourceFile.forEachDescendant((node) => {
  // プロパティ署名を探す
  if (node.getKind() === SyntaxKind.PropertyAssignment) {
    const property = node.asKind(SyntaxKind.PropertyAssignment);

    if (property) {
      const nameNode = property.getNameNode();

      // プロパティ名が識別子 (キャメルケースの場合)
      if (nameNode.getKind() === SyntaxKind.Identifier) {
        const oldName = nameNode.getText();
        const newName = toSnakeCase(oldName);

        // プロパティ名を変更
        nameNode.replaceWithText(newName);
      }
    }
  }
});

// 書き換えた内容を保存
sourceFile.saveSync();
console.log("style.tsのプロパティ名をスネークケースに変換しました。");
