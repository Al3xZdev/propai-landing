<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:tool-installation-rules -->
# Tool Installation Rules

## Important: No sudo available

- Do NOT use `sudo` - it is not available in this environment
- Install tools and programs in the user's home directory (~/.local, ~/bin, or project-local)
- Use `--prefix=~/.local` or similar flags when installing global tools

## Examples
- npm global packages: `npm install -g package --prefix=~/.local`
- Python packages: `pip install --user package`
- Go tools: `go install package@latest` (installs to ~/go/bin by default)

## Future Agents
When you need a tool that requires installation:
1. Check if it's already installed: `which toolname` or `toolname --version`
2. If not available, install in home directory without sudo
3. Add the tool installation info to this file so others know where to find it
<!-- END:tool-installation-rules -->
