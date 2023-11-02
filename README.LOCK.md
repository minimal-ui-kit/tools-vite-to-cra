## SETTING UP LOCALLY AND TESTING

**Terminal 1:**

```bash
npm i
npm run bundle-packages:watch
```

**Terminal 2:**

```bash
cp package.json dist/package.json
cd dist
npm i -g .
```

---

### PUBLISH WITH SCOPES

**Step 1:** `package.json`

```bash
"name": "@minimals/vite-to-cra"
```

**Step 2:**

```bash
npm publish --access public
```

**Step 3:**

```bash
npm run publish-package
```

**Run:**

```bash
npx @minimals/vite-to-cra@latest
```

---

### PUBLISH WITHOUT SCOPES

**Step 1:** `package.json`

```bash
"name": "vite-to-cra"
```

**Step 2:**

```bash
npm run publish-package
```

**Run:**

```bash
npx vite-to-cra@latest
```

---

## UPDATING AN EXISTING PACKAGE README FILE

```bash
npm version patch
npm run publish-package
```
