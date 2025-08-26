import { describe, it, expect, vi } from 'vitest';
import { executeToolMethod } from '../../src/server/execute-tool-method';

describe('executeToolMethod (unit)', () => {
  it('calls startBrowser with provided args and returns result', async () => {
    const mockResult = { sessionId: 'abc' };
    const client: any = {
      startBrowser: vi.fn().mockResolvedValue(mockResult),
    };

    const res = await executeToolMethod(client, 'start_browser', { browser: 'chrome', options: { headless: true } });

    expect(client.startBrowser).toHaveBeenCalledWith('chrome', { headless: true });
    expect(res).toBe(mockResult);
  });

  it('calls navigate with URL and returns result', async () => {
    const client: any = {
      navigate: vi.fn().mockResolvedValue('navigated'),
    };

    const res = await executeToolMethod(client, 'navigate', { url: 'https://example.com' });

    expect(client.navigate).toHaveBeenCalledWith('https://example.com');
    expect(res).toBe('navigated');
  });

  it('calls getElementText and returns the text', async () => {
    const client: any = {
      getElementText: vi.fn().mockResolvedValue('Hello world'),
    };

    const res = await executeToolMethod(client, 'get_element_text', { by: 'css', value: '.greeting', timeout: 1000 });

    expect(client.getElementText).toHaveBeenCalledWith('css', '.greeting', 1000);
    expect(res).toBe('Hello world');
  });

  it('throws for unknown tool', async () => {
    const client: any = {};
    await expect(executeToolMethod(client, 'nonexistent_tool', {})).rejects.toThrow('Unknown tool: nonexistent_tool');
  });
});
