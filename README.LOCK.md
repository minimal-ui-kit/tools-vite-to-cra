### Setting up locally and testing

```bash
npm i
npm run bundle-packages:watch
```

- In another terminal, run the following commands:

```bash
cp package.json dist/package.json
cd dist
npm i -g .
```

---

### Publish

```bash
npm run publish-package
```

### Updating an existing package README file

```bash
npm version patch
npm publish
```
