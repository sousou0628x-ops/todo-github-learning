# Git/GitHub コマンドWiki

このドキュメントは、実際の開発で使うGit/GitHubコマンドの実践的なガイドです。

---

## 📋 目次

1. [基本的なワークフロー](#基本的なワークフロー)
2. [よく使うコマンドセット](#よく使うコマンドセット)
3. [Issue駆動開発のフロー](#issue駆動開発のフロー)
4. [ブランチ戦略](#ブランチ戦略)
5. [トラブルシューティング](#トラブルシューティング)
6. [用語集](#用語集)

---

## 基本的なワークフロー

### 🔄 日常的な開発サイクル

```
1. 変更を加える（コードを編集）
   ↓
2. git add（ステージング：コミット準備）
   ↓
3. git commit（ローカルに記録）
   ↓
4. git push（GitHubにアップロード）
```

### 📝 具体例

```bash
# ファイルを編集した後...

# 1. 何が変わったか確認
git status                    # 変更されたファイル一覧
git diff                      # 具体的な変更内容

# 2. ステージング（コミット準備）
git add ファイル名             # 特定のファイルだけ
git add .                     # 全ての変更をまとめて

# 3. コミット（ローカルに記録）
git commit -m "変更内容の説明"

# 4. GitHubにプッシュ
git push origin ブランチ名
```

---

## よく使うコマンドセット

### 🎯 パターン1: 新機能を開発する

```bash
# 1. 最新のmainブランチを取得
git checkout main
git pull origin main

# 2. 新しいブランチを作成
git checkout -b feature/新機能名

# 3. コードを書く → テスト → 確認
git status                    # 何が変わったか確認
git diff                      # 詳細な変更内容

# 4. コミット
git add .
git commit -m "機能追加: 〇〇を実装"

# 5. GitHubにプッシュ
git push origin feature/新機能名

# 6. GitHubでPull Requestを作成（ブラウザ）

# 7. マージ後、ブランチを削除
git checkout main
git pull origin main
git branch -d feature/新機能名
```

### 🐛 パターン2: バグを修正する（Issue駆動）

```bash
# 1. GitHubでIssueを作成（例：Issue #5）

# 2. Issue番号を使ってブランチ作成
git checkout -b fix/5-bug-description

# 3. バグを修正

# 4. コミット（Issue番号を含める）
git add .
git commit -m "Fix #5: バグの説明と修正内容"

# 5. プッシュ
git push origin fix/5-bug-description

# 6. Pull Requestを作成（本文に "Closes #5" と書く）

# 7. マージすると、Issue #5が自動で閉じる
```

### 🔍 パターン3: 変更を確認・取り消す

```bash
# 変更を確認
git status                    # 変更されたファイル一覧
git diff                      # まだコミットしていない変更
git log --oneline             # コミット履歴

# 変更を取り消す（コミット前）
git restore ファイル名         # 特定ファイルの変更を破棄
git restore .                 # 全ての変更を破棄

# 過去のコミットに戻る
git log --oneline             # コミットIDを確認
git checkout コミットID        # 過去の状態を見る（読み取り専用）
git checkout main             # 現在に戻る
```

### 🌿 パターン4: ブランチを切り替える

```bash
# ブランチ一覧を見る
git branch                    # ローカルブランチ
git branch -a                 # リモートも含めて全て

# ブランチを切り替える
git checkout ブランチ名        # 既存のブランチに切り替え
git checkout -b 新ブランチ名   # 新規作成して切り替え

# ブランチを削除
git branch -d ブランチ名       # マージ済みブランチを削除
git branch -D ブランチ名       # 強制削除（マージしてなくても）
```

---

## Issue駆動開発のフロー

### 📌 なぜIssue駆動？

- ✅ 変更の理由が明確
- ✅ 議論の履歴が残る
- ✅ コミットとIssueが自動リンク
- ✅ 未来の自分が理解できる

### 🔄 完全なフロー

```
1. GitHubでIssueを作成
   ↓
2. Issue番号を使ってブランチ作成
   git checkout -b feature/番号-説明
   ↓
3. コードを書く
   ↓
4. コミット（Issue番号を含める）
   git commit -m "Fix #番号: 説明"
   ↓
5. プッシュ
   git push origin ブランチ名
   ↓
6. Pull Requestを作成
   本文に "Closes #番号" と書く
   ↓
7. レビュー・議論
   ↓
8. マージ
   → Issueが自動で閉じる
   ↓
9. ブランチ削除
   git branch -d ブランチ名
```

### 🎯 Issue番号の魔法

コミットメッセージやPull Requestに以下を書くと自動リンク：

```bash
# Issue #5 にリンクするだけ
git commit -m "タスク追加機能を改善 #5"

# Issue #5 を自動で閉じる（マージ時）
git commit -m "Fix #5: バグを修正"
git commit -m "Closes #5: 機能を実装"
git commit -m "Resolves #5: 問題を解決"
```

---

## ブランチ戦略

### 🌳 ブランチの種類と命名規則

```
main
├── feature/機能名          # 新機能開発
├── fix/番号-バグ説明       # バグ修正
├── hotfix/緊急修正         # 緊急の修正
└── experiment/実験名       # 実験的な変更
```

### 📊 ブランチの使い分け

| ブランチ名 | 用途 | 例 |
|----------|------|-----|
| `main` | 本番環境・常に動く状態 | - |
| `feature/dark-mode` | 新機能開発 | ダークモード追加 |
| `fix/5-delete-bug` | バグ修正（Issue #5） | 削除バグ修正 |
| `hotfix/security` | 緊急修正 | セキュリティ修正 |
| `experiment/new-ui` | 実験 | 新しいUI試作 |

### 🔄 ブランチのライフサイクル

```bash
# 誕生
git checkout -b feature/new-feature

# 成長（開発・コミット）
git add .
git commit -m "機能追加"
git push origin feature/new-feature

# 統合（Pull Request → マージ）
# GitHubでPull Request作成 → レビュー → マージ

# 死（削除）
git checkout main
git pull origin main
git branch -d feature/new-feature
```

---

## トラブルシューティング

### 😱 よくある問題と解決法

#### 問題1: 間違えてmainブランチで変更してしまった

```bash
# 解決策：変更を新しいブランチに移動
git checkout -b feature/new-branch  # 新ブランチ作成（変更も一緒に移動）
git add .
git commit -m "変更内容"
git checkout main                   # mainに戻る
git restore .                       # mainの変更を破棄
```

#### 問題2: コミットメッセージを間違えた（まだpushしてない）

```bash
# 最後のコミットメッセージを修正
git commit --amend -m "正しいメッセージ"
```

#### 問題3: 間違えてコミットしてしまった（まだpushしてない）

```bash
# 最後のコミットを取り消す（変更は残る）
git reset --soft HEAD~1

# 最後のコミットを完全に取り消す（変更も破棄）
git reset --hard HEAD~1
```

#### 問題4: pushした後に間違いに気づいた

```bash
# 新しいコミットで修正する（推奨）
# 間違いを修正 → 新しくコミット → push

# または、強制的に戻す（危険！チーム開発では使わない）
git reset --hard HEAD~1
git push -f origin ブランチ名
```

#### 問題5: ブランチを間違えて削除してしまった

```bash
# 削除したブランチを復活
git reflog                          # 削除前のコミットIDを探す
git checkout -b ブランチ名 コミットID
```

---

## 用語集

### 📚 Git/GitHub用語

| 用語 | 意味 | 例え |
|------|------|------|
| **Repository（リポジトリ）** | プロジェクト全体の保管場所 | プロジェクトフォルダ |
| **Commit（コミット）** | 変更を記録すること | セーブポイント |
| **Branch（ブランチ）** | 並行世界・実験場所 | パラレルワールド |
| **Merge（マージ）** | ブランチを統合すること | 世界線の統合 |
| **Push（プッシュ）** | ローカルからGitHubへアップロード | クラウド保存 |
| **Pull（プル）** | GitHubから最新版をダウンロード | 同期 |
| **Clone（クローン）** | リポジトリを丸ごとコピー | プロジェクトをダウンロード |
| **Fork（フォーク）** | 他人のリポジトリを自分のアカウントにコピー | 自分専用コピー作成 |
| **Issue（イシュー）** | 課題・バグ報告・機能リクエスト | タスク管理 |
| **Pull Request（PR）** | 「この変更をマージしてください」というリクエスト | レビュー依頼 |
| **Staging（ステージング）** | コミット準備エリア | 買い物カゴ |
| **HEAD** | 今いる場所（現在のコミット） | 現在地 |
| **origin** | リモートリポジトリの名前（通常はGitHub） | クラウドの場所 |
| **main/master** | メインブランチ（本番環境） | 正式版 |

### 🎯 コマンドの意味

| コマンド | 意味 | いつ使う？ |
|---------|------|-----------|
| `git status` | 現在の状態を確認 | 常に！変更前後に確認 |
| `git diff` | 何を変更したか詳細表示 | コミット前の確認 |
| `git add` | ステージング（コミット準備） | コミットしたいファイルを選ぶ |
| `git commit` | 変更を記録 | 意味のある単位で記録 |
| `git push` | GitHubにアップロード | 他の人と共有したい時 |
| `git pull` | GitHubから最新版を取得 | 作業開始前 |
| `git log` | コミット履歴を見る | 過去を振り返る時 |
| `git branch` | ブランチ一覧 | どこにいるか確認 |
| `git checkout` | ブランチ切り替え | 別の作業に移る時 |
| `git merge` | ブランチを統合 | 機能を本番に反映 |
| `git restore` | 変更を取り消す | 失敗した時 |

### 🔗 Issue/Pull Requestの関係

```
Issue #1: 「削除確認ダイアログがない」
   ↓ 解決するため
Branch: feature/1-add-delete-confirmation
   ↓ コミット
Commit: "Fix #1: 確認ダイアログを追加"
   ↓ プッシュ
Pull Request #2: "Fix #1: 削除確認ダイアログを追加"
   ↓ マージ
Issue #1が自動で閉じる ✅
```

**番号の仕組み：**
- Issue #1 → Pull Request #2 → Issue #3 → Pull Request #4...
- IssueとPull Requestは同じ番号空間を共有
- どちらも「会話スレッド」として管理される

---

## 🎓 学習のヒント

### 初心者がよく使うコマンド（覚えるべき順）

1. **`git status`** - 最重要！常に確認
2. **`git add .`** - 変更をステージング
3. **`git commit -m "メッセージ"`** - 記録
4. **`git push origin ブランチ名`** - GitHubへ
5. **`git checkout -b ブランチ名`** - 新ブランチ作成
6. **`git checkout main`** - mainに戻る
7. **`git pull origin main`** - 最新版を取得
8. **`git log --oneline`** - 履歴確認
9. **`git diff`** - 変更内容確認
10. **`git restore ファイル名`** - 変更を取り消す

### 🚀 実践的なTips

1. **小さく頻繁にコミット**
   - ❌ 1日の終わりに1回コミット
   - ✅ 機能ごと、修正ごとにコミット

2. **意味のあるコミットメッセージ**
   - ❌ "update", "fix", "change"
   - ✅ "Fix #5: 削除時の確認ダイアログを追加"

3. **ブランチ名は分かりやすく**
   - ❌ "test", "new", "fix"
   - ✅ "feature/dark-mode", "fix/5-delete-bug"

4. **作業前に必ずpull**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/new-feature
   ```

5. **困ったら`git status`**
   - 今どこにいる？
   - 何が変更されてる？
   - 次に何をすべき？

---

## 📖 参考リンク

- [Git公式ドキュメント](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com/)
- [このプロジェクトの教育計画](./教育計画.txt)

---

**最終更新：2026年2月3日**


---

## ステップ4: GitHub Actions（自動デプロイ）

### 🎯 目標：プッシュするだけで自動デプロイ

手動デプロイの問題：
- ❌ FTPでファイルを一つずつアップロード
- ❌ どのファイルを変更したか忘れる
- ❌ アップロード忘れでバグ発生
- ❌ 時間がかかる、面倒

GitHub Actionsの解決策：
- ✅ `git push`するだけで自動デプロイ
- ✅ 全てのファイルが自動で同期
- ✅ ミスがない
- ✅ 数秒で完了

### 📝 GitHub Actionsの設定

#### 1. ワークフローファイルを作成

`.github/workflows/deploy.yml`を作成：

```yaml
name: Deploy to GitHub Pages

# mainブランチにプッシュされたら自動実行
on:
  push:
    branches:
      - main

# GitHub Pagesにデプロイする権限
permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      # 1. リポジトリをチェックアウト
      - name: Checkout
        uses: actions/checkout@v4
      
      # 2. GitHub Pagesの設定
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      # 3. ファイルをアップロード
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      
      # 4. GitHub Pagesにデプロイ
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### 2. GitHub Pagesを有効化

1. リポジトリの「Settings」タブ
2. 左サイドバーの「Pages」
3. Source: **GitHub Actions** を選択

#### 3. プッシュして自動デプロイ

```bash
git add .github/workflows/deploy.yml
git commit -m "CI/CD: GitHub Pagesへの自動デプロイを設定"
git push origin main
```

#### 4. 確認

- **Actionsタブ**：ワークフローの実行状況を確認
- **公開URL**：`https://ユーザー名.github.io/リポジトリ名/`

### 🔄 自動デプロイのフロー

```
コードを変更
   ↓
git add .
git commit -m "機能追加"
git push origin main
   ↓
GitHub Actionsが自動実行
   ├── コードをチェックアウト
   ├── テスト実行（設定すれば）
   ├── ビルド（必要なら）
   └── GitHub Pagesにデプロイ
   ↓
数秒後、自動的にサイトが更新される ✅
```

### 🐛 よくあるエラーと解決法

#### エラー1: "Pages site failed"

```
Get Pages site failed. 
Please verify that the repository has Pages enabled
```

**原因：** GitHub Pagesが有効になっていない

**解決策：**
1. Settings → Pages
2. Source を「GitHub Actions」に変更

#### エラー2: "Permission denied"

```
Error: HttpError: Resource not accessible by integration
```

**原因：** ワークフローに必要な権限がない

**解決策：** `permissions:`セクションを追加
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

#### エラー3: ワークフローが実行されない

**原因：** ファイルパスが間違っている

**確認：**
- `.github/workflows/deploy.yml`（正しい）
- `github/workflows/deploy.yml`（間違い）

### 💡 GitHub Actionsの活用例

#### 例1: 自動テスト

```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run tests
        run: npm test
```

#### 例2: コードの自動チェック

```yaml
name: Lint

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run ESLint
        run: npm run lint
```

#### 例3: Pull Request時のみ実行

```yaml
on:
  pull_request:
    branches:
      - main
```

### 🎓 学んだこと

1. **自動化の力**
   - 人間がやらなくていいことは機械に任せる
   - ミスが減る、時間が節約できる

2. **CI/CD（継続的インテグレーション/デリバリー）**
   - CI: コードをプッシュしたら自動テスト
   - CD: テストが通ったら自動デプロイ

3. **GitHub Actionsの仕組み**
   - YAMLファイルで設定
   - イベント（push, pull_request等）で自動実行
   - 様々なアクション（actions）を組み合わせる

---

## GitHub料金・制限について

### 💰 料金プラン

#### 無料プラン（Free）
- ✅ **パブリックリポジトリ：無制限**
- ✅ **プライベートリポジトリ：無制限**
- ✅ **GitHub Pages：無料**
- ✅ **GitHub Actions：月2,000分無料**
- ✅ **ストレージ：500MB（Actions）**
- ✅ **帯域幅：月1GB（Actions）**

#### 有料プラン（Pro: $4/月）
- ✅ GitHub Actions：月3,000分
- ✅ ストレージ：2GB
- ✅ 高度な機能（コードレビュー等）

### 📊 XSERVERとの比較

| 項目 | XSERVER | GitHub Pages |
|------|---------|--------------|
| **料金** | 約800円/月 | **無料** |
| **容量** | 数百GB | リポジトリ1GB推奨 |
| **用途** | 動的サイト（PHP等） | 静的サイト（HTML/CSS/JS） |
| **データベース** | MySQL等使える | 使えない |
| **サーバーサイド** | PHP, Python等 | 使えない |
| **独自ドメイン** | 簡単 | 設定必要 |
| **SSL証明書** | 無料 | 無料（自動） |

### 🎯 使い分け

**GitHub Pagesが向いている：**
- ✅ 静的サイト（HTML/CSS/JavaScript）
- ✅ ポートフォリオサイト
- ✅ ドキュメントサイト
- ✅ ランディングページ
- ✅ 個人ブログ（Jekyll, Hugo等）
- ✅ 学習用プロジェクト

**XSERVERが必要：**
- ✅ WordPress
- ✅ PHPアプリケーション
- ✅ データベースが必要
- ✅ サーバーサイド処理
- ✅ 大容量ファイル
- ✅ メールサーバー

### 📏 GitHub Pagesの制限

#### リポジトリサイズ
- **推奨：1GB以下**
- 1GBを超えると警告メール
- 厳密な上限はないが、大きすぎると遅くなる

#### ファイルサイズ
- **単一ファイル：100MB以下推奨**
- 100MBを超えるとGit LFSが必要

#### 帯域幅
- **月100GB（ソフトリミット）**
- 超えても通常は問題ない
- 極端に多いとGitHubから連絡が来る可能性

#### ビルド時間
- **10分以内**
- 10分を超えるとタイムアウト

### 💡 実用的なアドバイス

#### 個人開発者の場合

**無料で十分なケース：**
```
静的サイト（HTML/CSS/JS）
+ GitHub Pages（無料）
+ 独自ドメイン（年1,000円程度）
= 年1,000円で運用可能
```

**XSERVERが必要なケース：**
```
WordPress + データベース
+ XSERVER（月800円）
= 月800円必要
```

#### コスト削減の例

**Before（XSERVER）：**
- 静的サイト5個 → 月800円

**After（GitHub Pages）：**
- 静的サイト5個 → 無料
- 節約：年9,600円

### 🚀 GitHub Actionsの無料枠

#### 無料プランの制限

- **月2,000分**（約33時間）
- パブリックリポジトリは無制限
- プライベートリポジトリのみカウント

#### 実際の使用例

```
1回のデプロイ：約30秒
月100回デプロイ：50分
→ 無料枠で十分！
```

#### 超過した場合

- $0.008/分（約1円/分）
- 例：月3,000分使用 → 1,000分超過 → 約1,000円

### 📝 まとめ

**GitHub（無料プラン）で十分な人：**
- 静的サイトのみ
- 個人プロジェクト
- ポートフォリオ
- 学習用

**XSERVERが必要な人：**
- WordPress使用
- データベース必要
- PHP等のサーバーサイド処理
- 大容量ファイル

**両方使う（ハイブリッド）：**
- メインサイト：XSERVER（WordPress）
- ランディングページ：GitHub Pages（無料）
- ドキュメント：GitHub Pages（無料）
- → コスト削減しながら最適な環境

---

**最終更新：2026年2月3日**


---

## ステップ5: コンフリクト解決（マージの衝突）

### 🎯 コンフリクトとは？

**コンフリクト = 2つのブランチで同じ場所を違う風に変更した時に起こる**

```
例：
main: "ToDoリスト"
  ├─ ブランチA: "ToDoアプリ"に変更
  └─ ブランチB: "タスク管理アプリ"に変更

両方をマージしようとすると...
→ Gitが「どっちを使えばいいの？」と困る
→ コンフリクト発生！
```

### 📊 コンフリクトが起こる流れ（図解）

```
時系列：

1. main: "元の内容"
   ↓
2. ブランチAを作成
   main: "元の内容"
   ブランチA: "元の内容" → "変更A"
   ↓
3. mainに戻る
   main: "元の内容"（まだ変更されていない）
   ↓
4. ブランチBを作成
   main: "元の内容"
   ブランチB: "元の内容" → "変更B"
   ↓
5. ブランチAをmainにマージ
   main: "変更A"
   ↓
6. ブランチBをmainにマージしようとする
   main: "変更A"
   ブランチB: "変更B"
   → コンフリクト！
```

### 🔍 コンフリクトマーカーの読み方

コンフリクトが起こると、ファイルにこんなマーカーが表示されます：

```
<<<<<<< HEAD
現在のブランチの内容
=======
マージしようとしているブランチの内容
>>>>>>> ブランチ名
```

**例：**
```
<<<<<<< HEAD
# ToDoアプリ
=======
# タスク管理アプリ
>>>>>>> feature/update-readme-2
```

**意味：**
- `<<<<<<< HEAD` = 今いるブランチ（main）の内容
- `=======` = 区切り線
- `>>>>>>> feature/update-readme-2` = マージしようとしているブランチの内容

### 🛠️ コンフリクト解決の手順

#### ステップ1: コンフリクトを確認

```bash
# マージを試みる
git merge ブランチ名

# エラーメッセージ
# CONFLICT (content): Merge conflict in ファイル名
# Automatic merge failed; fix conflicts and then commit the result.
```

#### ステップ2: どのファイルか確認

```bash
git status

# 出力例：
# Unmerged paths:
#   both modified:   README.md
```

#### ステップ3: ファイルを開いてコンフリクトマーカーを探す

```bash
# ファイルを開く（エディタで）
# コンフリクトマーカーを探す：
# <<<<<<< HEAD
# ...
# =======
# ...
# >>>>>>> ブランチ名
```

#### ステップ4: どちらを採用するか決める

**選択肢：**
1. 現在のブランチの内容を採用
2. マージしようとしているブランチの内容を採用
3. 両方を組み合わせる
4. 全く新しい内容にする

#### ステップ5: マーカーを削除して編集

```
変更前：
<<<<<<< HEAD
# ToDoアプリ
=======
# タスク管理アプリ
>>>>>>> feature/update-readme-2

変更後（例：ToDoアプリを採用）：
# ToDoアプリ
```

#### ステップ6: 解決をコミット

```bash
# 変更をステージング
git add ファイル名

# 状態確認
git status
# All conflicts fixed but you are still merging.

# コミット
git commit -m "Merge: コンフリクト解決"

# プッシュ
git push origin main
```

### 🎯 実践例：わざとコンフリクトを起こす

```bash
# 1. ブランチAを作成
git checkout -b feature/change-a
# ファイルを編集（例：タイトルを"変更A"に）
git add .
git commit -m "変更A"

# 2. mainに戻る
git checkout main

# 3. ブランチBを作成
git checkout -b feature/change-b
# 同じ場所を編集（例：タイトルを"変更B"に）
git add .
git commit -m "変更B"

# 4. mainに戻ってブランチAをマージ
git checkout main
git merge feature/change-a
# → 成功（Fast-forward）

# 5. ブランチBをマージ
git merge feature/change-b
# → コンフリクト発生！

# 6. コンフリクトを解決
# ファイルを開いてマーカーを削除
git add ファイル名
git commit -m "Merge: コンフリクト解決"

# 7. 後片付け
git branch -d feature/change-a
git branch -d feature/change-b
```

### 🚫 コンフリクトを避ける方法

#### 1. 小さく頻繁にマージ

```bash
# 悪い例：1週間後にマージ
# → 大量の変更でコンフリクト多発

# 良い例：毎日マージ
# → 小さな変更なのでコンフリクト少ない
```

#### 2. 同じファイルを同時に編集しない

```
チーム開発の場合：
- Aさん：index.htmlを編集
- Bさん：style.cssを編集
→ コンフリクトしない！

- Aさん：index.htmlの1行目を編集
- Bさん：index.htmlの100行目を編集
→ 同じファイルでも場所が違えばOK
```

#### 3. 作業前に必ずpull

```bash
# 作業開始前
git checkout main
git pull origin main  # 最新版を取得
git checkout -b feature/new

# これで他の人の変更を取り込んでから作業開始
```

#### 4. Pull Requestで早めにレビュー

```
長期間ブランチを放置しない
→ 早めにPull Request作成
→ レビューしてもらう
→ マージ
```

### 🆘 コンフリクト解決中に困ったら

#### マージを中止したい

```bash
# コンフリクト解決を諦めて元に戻す
git merge --abort

# 元の状態に戻る
```

#### どのブランチにいるか分からない

```bash
git branch
# * main  ← 今ここ
#   feature/xxx
```

#### コンフリクトしているファイルを確認

```bash
git status

# Unmerged paths:
#   both modified:   README.md  ← これ
```

#### コンフリクトマーカーを探す

```bash
# ファイル内で検索
# "<<<<<<" で検索すると見つかる
```

### 💡 コンフリクト解決のコツ

1. **焦らない**
   - コンフリクトは普通のこと
   - Gitが壊れたわけではない

2. **一つずつ解決**
   - 複数ファイルでコンフリクトしても
   - 一つずつ落ち着いて解決

3. **分からなければ相談**
   - チーム開発なら相談
   - どちらを採用すべきか確認

4. **テストする**
   - 解決後、動作確認
   - 間違った方を選んでないか確認

### 📝 コンフリクト解決のチェックリスト

```
□ git status でコンフリクトファイルを確認
□ ファイルを開いてマーカーを探す
□ どちらを採用するか決める
□ マーカーを削除して編集
□ 動作確認（テスト）
□ git add ファイル名
□ git commit
□ git push
□ ブランチ削除
```

### 🎓 学んだこと

**コンフリクトは怖くない：**
- ✅ 仕組みを理解すれば簡単
- ✅ マーカーの意味が分かれば解決できる
- ✅ 避ける方法も知っている

**重要なポイント：**
- コンフリクト = 同じ場所を違う風に変更
- マーカー = どちらを使うか選ぶ場所
- 解決 = マーカーを削除して編集

---

**最終更新：2026年2月3日（ステップ5追加）**
