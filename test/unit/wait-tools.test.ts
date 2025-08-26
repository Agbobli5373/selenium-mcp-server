import { describe, it, expect } from 'vitest';
import { waitTools } from '../../src/tools/wait-tools';

describe('waitTools', () => {
  it('exports an array of wait tools', () => {
    expect(Array.isArray(waitTools)).toBe(true);
    expect(waitTools.length).toBeGreaterThanOrEqual(4);
  });

  it('each tool has name, description and inputSchema', () => {
    for (const tool of waitTools) {
      expect(tool).toHaveProperty('name');
      expect(typeof tool.name).toBe('string');

      expect(tool).toHaveProperty('description');
      expect(typeof tool.description).toBe('string');

      expect(tool).toHaveProperty('inputSchema');
      expect(typeof tool.inputSchema).toBe('object');
      expect(tool.inputSchema).toHaveProperty('properties');
      expect(tool.inputSchema).toHaveProperty('required');
      expect(Array.isArray((tool.inputSchema as any).required)).toBe(true);
    }
  });

  it('wait_for_text_present requires text in required list', () => {
    const textTool = waitTools.find(t => t.name === 'wait_for_text_present');
    expect(textTool).toBeDefined();
    const required = (textTool as any).inputSchema.required as string[];
    expect(required).toContain('text');
    expect(required).toContain('by');
    expect(required).toContain('value');
  });

  it('locator enum includes common strategies', () => {
    const commonTool = waitTools[0];
    const props = (commonTool as any).inputSchema.properties;
    const by = props.by;
    expect(by).toBeDefined();
    expect(Array.isArray(by.enum)).toBe(true);
    expect(by.enum).toEqual(expect.arrayContaining(['id', 'css', 'xpath', 'name', 'tag', 'class']));
  });
});
