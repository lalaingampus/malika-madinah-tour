For this project, when the user asks to add or change a feature, default to this workflow unless the user says otherwise:

1. Check `package.json` for the correct dev command.
2. Start the app with `pnpm run dev` if a dev server is not already running.
3. Implement the requested change.
4. Verify the change in the running app, preferably with Playwright against the local dev URL.
5. Report what changed and how it was verified.

If the change is purely backend, config-only, or the dev server is not needed, use judgment and skip unnecessary browser verification.
