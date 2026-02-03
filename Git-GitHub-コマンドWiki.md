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
