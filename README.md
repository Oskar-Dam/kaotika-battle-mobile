
# 🧠 Kaotika-Battle-Mobile – React + TypeScript + Vite

This project uses **React**, **TypeScript**, and **Vite** as a modern development stack, with ESLint support and a modular architecture.

---

## 📥 Install Dependencies

After cloning the repository, run:

```bash
npm install

## Git Hooks Setup

This project uses custom Git pre-commit and pre-push hooks located in the `.hooks` folder directory to automatically run linting and tests before each commit.

### How to enable the pre-commit hook

After cloning the repository and having the dependencies installed, run the following commands:

```bash
npm run setup-hooks

---

## 🚀 Running the Project

To launch the project in local **production mode**, use the following command:

```bash
npm run dev
```

> ⚠️ Note: Even though `npm run dev` is typically for development, it's configured here to simulate a production-like environment locally.

---

## 💡 Development Requirements

To ensure ESLint configuration is applied correctly and your code stays clean:

1. Make sure you have the **ESLint** extension installed in Visual Studio Code.  
   🔗 [ESLint - VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. ESLint rules will run automatically when you save files.

---

## 🔐 Hardcoding Users

If you want to use hardcoded users when logging in instead of Firebase authentication:

1. Open the `LoginScreen` component.
2. Replace the `LoginFirebase` component with `LoginNoFirebase`:

```tsx
// Before
<LoginFirebase />

// After
<LoginNoFirebase />
```

This disables real authentication and allows working with fake users.

---

## 📦 Useful Scripts

```bash
npm run dev       # Starts the server in local production mode
npm run lint      # Runs ESLint manually
```

---

Let me know if you'd like to add a section for environment variables, Firebase config, folder structure, or project deployment!