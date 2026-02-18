# TalkToFigma Connection Setup

## Prerequisites

1. **Bun installed**
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Figma plugin installed**
   - In Figma: Plugins → Search "Talk to Figma" → Install

---

## Configuration

**File:** `.cursor/mcp.json` (or Cursor settings)

```json
{
  "mcpServers": {
    "TalkToFigma": {
      "command": "bunx",
      "args": [
        "cursor-talk-to-figma-mcp@latest"
      ]
    }
  }
}
```

---

## Usage

### 1. Start the Socket Server
```bash
bunx cursor-talk-to-figma-socket
```

This starts a WebSocket server on port 3055.

**Expected output:**
```
WebSocket server running on port 3055
New client connected
```

### 2. Open Figma Plugin
1. In your Figma file: **Plugins → Talk to Figma**
2. Note the **channel code** (e.g., "sn1vwmu2")
3. Keep the plugin panel open

### 3. Connect in Cursor
Share the channel code with Cursor, which will connect to your Figma file.

---

## Troubleshooting

### "Command not found: bunx"
**Solution:** Install Bun first:
```bash
curl -fsSL https://bun.sh/install | bash
source ~/.zshrc
```

### "Request to Figma timed out"
**Solutions:**
- Make sure the TalkToFigma plugin is still open in Figma
- Close and reopen the plugin
- Get a fresh channel code
- Ensure the socket server is still running

### New Channel Code Needed
If you close/reopen the Figma plugin, you'll get a new channel code. Just reconnect with the new code.

---

## What You Can Do Once Connected

- View document structure and all elements
- Get information about selected nodes
- Review color variables and styles
- Check text content and styling
- Create/modify shapes and frames
- Scan for components and text nodes

---

## Notes

- The socket server must stay running in the background
- Each Figma session generates a unique channel code
- Connection is local (not over internet)
- Works with any Figma file you have open
