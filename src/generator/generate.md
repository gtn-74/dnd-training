# ts-morph のメモ書き

## やったこと

- style.ts で定義してるスタイルのキャメルケースをスネークケースに変更

## 大まかなフロー

スクリプトを書く

ts で書いたものを`js`に、コンパイル

コマンド

`tsc generate.ts`

js から cjs に拡張子を変更

`mv generate.js generate.cjs`

<!-- ! cjsが何か後々調べる -->

`cjs`となった、スクリプトを実行

`node generate.cjs`

完成！

## メモ

tsconfig の`"include"`にも何かしらの影響を与えている後程調べる
