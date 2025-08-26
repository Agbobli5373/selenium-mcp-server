import { describe, it, expect, vi } from 'vitest';
import { executeToolMethod } from '../../src/server/execute-tool-method';

describe('executeToolMethod - get_browser_console', () => {
  it('routes to client.getBrowserConsole with provided args and returns logs', async () => {
    const mockLogs = { logs: [{ level: 'SEVERE', message: 'error occurred', timestamp: 1690000000000 }] };
    const client: any = {
      getBrowserConsole: vi.fn().mockResolvedValue(mockLogs),
    };

    const res = await executeToolMethod(client, 'get_browser_console', { level: 'SEVERE', since: 1690000000000 });

    expect(client.getBrowserConsole).toHaveBeenCalledWith('SEVERE', 1690000000000);
    expect(res).toBe(mockLogs);
  });
});
