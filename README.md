<div align="center">

<img src="https://raw.githubusercontent.com/BhagirathsinhRana378/Hyperion/main/.github/assets/logo-panel.png" alt="Hyperion logo" width="140">

# Hyperion

### The agentic workspace for orchestrating parallel AI coding agents

Stop juggling 47 browser tabs. One isolated command center per project —<br/>
terminals, agents, tasks, and prompts, in a single view.

<br/>

[![License: MIT](https://img.shields.io/badge/license-MIT-6366f1?style=for-the-badge)](LICENSE)
[![Stars](https://img.shields.io/github/stars/BhagirathsinhRana378/Hyperion?style=for-the-badge&color=6366f1&label=stars)](https://github.com/BhagirathsinhRana378/Hyperion/stargazers)
[![Build](https://img.shields.io/github/actions/workflow/status/BhagirathsinhRana378/Hyperion/ci.yml?style=for-the-badge&label=build)](https://github.com/BhagirathsinhRana378/Hyperion/actions)
[![Discord](https://img.shields.io/badge/discord-join-6366f1?style=for-the-badge&logo=discord&logoColor=white)](#)

**[Website](https://hyperions.bond)** &nbsp;·&nbsp; **[Documentation](https://hyperions.bond/en/docs)** &nbsp;·&nbsp; **[Quick Start](#quick-start)** &nbsp;·&nbsp; **[Report a Bug](https://github.com/BhagirathsinhRana378/Hyperion/issues)** &nbsp;·&nbsp; **[Discussions](https://github.com/BhagirathsinhRana378/Hyperion/discussions)**

<br/>

<img src="https://www.hyperions.bond/_next/image?url=%2Fhero_img.png&w=3840&q=75" alt="Hyperion workspace — multiple AI agents running in parallel" width="100%">

</div>

<br/>

## The problem

Every developer running AI coding agents ends up here:

```
open terminal → run agent → switch to browser → check output → open notes
   → find the prompt → copy it → switch back → paste → agent fails
      → open terminal → debug → repeat
```

Ten tabs, three note apps, and no idea which agent is doing what. **Hyperion collapses that loop into one view.**

<br/>

## Why Hyperion

<table>
<tr>
<td width="50%" valign="top">

### Without Hyperion
- A dozen scattered terminal windows
- Copy-pasting prompts out of old chat logs
- Manually tracking what each agent actually did
- Switching between five different tools
- One project open at a time

</td>
<td width="50%" valign="top">

### With Hyperion
- One scoped terminal grid, per project
- A versioned prompt library, built in
- A kanban board that tracks agent progress live
- One workspace. One view. Everything.
- A sidebar of isolated projects, zero cross-contamination

</td>
</tr>
</table>

The desktop and mobile client is **fully open source** and lives right here in this repo.

<br/>

## Quick start

```bash
git clone https://github.com/BhagirathsinhRana378/Hyperion.git
cd Hyperion
pnpm install
pnpm tauri dev
```

That's it — Hyperion opens as a native desktop app. Requires **Node 20+**, **pnpm 10+**, and **Rust** ([install guide](https://www.rust-lang.org/tools/install)) for the Tauri build.

<details>
<summary><b>First run walkthrough</b></summary>
<br/>

1. Click **+ Create** in the sidebar and name your workspace
2. Open a terminal — it's automatically scoped to that project's directory
3. Drop a task on the kanban board
4. Drag it onto an agent — it starts working immediately
5. Watch output stream live into its terminal pane

</details>

<br/>

## Features

<table>
<tr>
<td width="60%" valign="top">

### 🗂️ Multi-workspace, zero bleed
Every project is a fully isolated environment. Switch workspaces and the terminal grid, agent pool, task board, and prompt forge all re-scope instantly — nothing leaks between projects.

</td>
<td width="40%">

```
┌──────────┐
│ 🟢 auth  │ ← active
│ ⚪ api   │
│ ⚪ mobile│
│ + Create  │
└──────────┘
```

</td>
</tr>
<tr>
<td width="60%" valign="top">

### 🤖 Parallel agent grid
Run multiple AI coding agents side by side, each in its own scoped terminal pane, with real-time output streaming and one-click stop, restart, or reassign.

</td>
<td width="40%">

```
┌──────────┬──────────┐
│ Agent-1  │ Agent-2  │
│ 🔨 Auth  │ 🔨 API  │
│   ✅     │   🔄    │
└──────────┴──────────┘
```

</td>
</tr>
<tr>
<td width="60%" valign="top">

### 📋 Kanban that talks to agents
Create a task, drag it onto an agent, and it starts working — status flows back to the board in real time as the agent progresses.

</td>
<td width="40%">

```
BACKLOG │ DOING │ DONE
────────┼───────┼──────
 Login  │  API  │ Init
 Tests  │  DB   │ CI/CD
```

</td>
</tr>
<tr>
<td width="60%" valign="top">

### ⚡ Prompt Forge
Version your agent prompts like code. Iterate v1.0 → v1.1 → v1.2, A/B test approaches, and attach the winning prompt directly to a kanban task.

</td>
<td width="40%" valign="top">

No more losing the perfect prompt in a chat history you can't search.

</td>
</tr>
</table>

<details>
<summary><b>🐝 Agent Swarm — dependency-aware multi-agent orchestration</b></summary>
<br/>

For tasks too big for one agent. Define what depends on what, and Hyperion figures out the execution order:

```
Agent-1: design database schema
    ↓
Agent-2: build API endpoints     Agent-3: build UI components
    ↓ (both must finish)
Agent-4: write integration tests
```

</details>

<br/>

## How it fits together

```
┌────────────────────────────────────────────────────┐
│                   HYPERION SHELL                    │
│              Tauri 2 · Desktop & Mobile             │
├───────────┬──────────────────────────────────────────┤
│  SIDEBAR   │              WORKSPACE VIEW             │
│ workspaces │  terminal grid · kanban · prompt forge  │
├───────────┴──────────────────────────────────────────┤
│  Workshop Manager · PTY Pool · Agent Spawner         │
│  Task Scheduler · WebSocket · SQLite                 │
└────────────────────────────────────────────────────┘
```

Create a workspace → it gets an isolated scope → terminal grid and board render for it → spawn an agent on a task → a PTY allocates a real terminal → WebSocket streams output into the pane and the board, live. Switch workspaces and the whole stack re-scopes underneath you.

<br/>

## Built with

<div align="center">

| Layer | Tech |
|:--|:--|
| Shell | Tauri 2 · Next.js 16 |
| UI | React 19 · Tailwind v4 · shadcn/ui |
| State | Zustand |
| Terminal | xterm.js · node-pty |
| Agent runtime | Vercel AI SDK / LangChain |
| Real-time | WebSocket |
| Persistence | SQLite |

</div>

<br/>

## Project structure

```
src/
├─ app/            Next.js App Router pages
├─ pages/          workspace, terminal, kanban layouts
├─ components/     terminal · agents · kanban · prompts
├─ stores/         workspace, terminal, agent, kanban state
├─ hooks/          use-workspace, use-pty, use-agent
└─ config/         site, navigation, hotkeys

src-tauri/         Tauri 2 desktop & mobile shell
```

Single flat app — no monorepo, one `package.json`.

<br/>

## Roadmap

| Phase | Status |
|:--|:--|
| Multi-workspace sidebar & scoped state | ✅ Shipped |
| Terminal grid — split, resize, tabs | ✅ Shipped |
| Agent spawn, live output, stop/restart | 🚧 In progress |
| Kanban board with agent dispatch | 🚧 In progress |
| Prompt Forge — versioning & A/B testing | 📋 Planned |
| Agent Swarm — dependency orchestration | 📋 Planned |
| Plugin system & cross-platform builds | 📋 Planned |

<br/>

## Contributing

```bash
git checkout -b feat/my-feature
pnpm check && pnpm typecheck && pnpm build
git commit -m "feat: add workspace switching"
git push origin feat/my-feature
```

Then open a PR. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide, or check the [docs](https://hyperions.bond/en/docs) for architecture deep-dives.

<br/>

## Security

Found a vulnerability? Please open a [private security advisory](https://github.com/BhagirathsinhRana378/Hyperion/security/advisories) instead of a public issue.

<br/>

<div align="center">

## License

[MIT](LICENSE) © [BhagirathsinhRana378](https://github.com/BhagirathsinhRana378)

<br/>

**⭐ Star this repo if Hyperion saves you a browser tab or two.**

</div>
