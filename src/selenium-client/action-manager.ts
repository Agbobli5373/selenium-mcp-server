/**
 * Manages keyboard actions against the underlying Selenium WebDriver instance.
 *
 * This class provides high-level helpers to press individual keys and key
 * combinations using the WebDriver Actions API. It maps common, human-readable
 * key names (case-insensitive) to Selenium's Key constants where appropriate,
 * and falls back to sending the raw string for unknown keys.
 *
 * Notes:
 * - Each method calls ensureDriverExists() before performing actions and will
 *   throw if no driver is available.
 * - The implementation uses the actions API (with the bridge enabled) to
 *   synthesize keyDown/keyUp events. For combinations, keys are pressed in the
 *   provided order and released in reverse order.
 *
 * Example:
 * - Press Enter:
 *   await actionManager.pressKey('enter');
 *
 * - Press Ctrl+S:
 *   await actionManager.pressKeyCombo(['ctrl', 's']);
 *
 * @public
 */
 
/**
 * Presses a single key.
 *
 * The method accepts a human-friendly key name (case-insensitive). Known names
 * are converted to their corresponding selenium-webdriver Key constants:
 * - enter / return -> Key.ENTER
 * - tab -> Key.TAB
 * - escape / esc -> Key.ESCAPE
 * - space -> Key.SPACE
 * - backspace -> Key.BACK_SPACE
 * - delete -> Key.DELETE
 * - arrowup / up -> Key.ARROW_UP
 * - arrowdown / down -> Key.ARROW_DOWN
 * - arrowleft / left -> Key.ARROW_LEFT
 * - arrowright / right -> Key.ARROW_RIGHT
 * - home, end, pageup, pagedown
 * - f1 .. f12
 * - shift, control / ctrl, alt
 *
 * Any unrecognized key string will be sent as-is.
 *
 * The method performs a keyDown followed by a keyUp on the resolved key.
 *
 * @param key - The key to press (e.g. "enter", "Tab", "a", "ArrowUp").
 * @returns A promise that resolves to a SeleniumResponse indicating success.
 *
 * @throws Error If the WebDriver instance is not available (ensureDriverExists fails)
 *         or if the underlying WebDriver actions fail.
 *
 * @example
 * await actionManager.pressKey('enter');
 * @example
 * await actionManager.pressKey('Escape'); // case-insensitive
 */
 
/**
 * Presses a combination of keys.
 *
 * Keys are pressed in the order provided, and released in the reverse order
 * (typical for modifier combinations like Ctrl+Shift+S). Recognized modifier
 * names are mapped to selenium-webdriver Key constants:
 * - control / ctrl -> Key.CONTROL
 * - shift -> Key.SHIFT
 * - alt -> Key.ALT
 * - meta / cmd -> Key.META
 *
 * Non-modifier keys (letters, digits, function keys, etc.) may also be provided
 * and will be sent either as mapped Key constants or as raw strings if not
 * recognized.
 *
 * Example:
 * - Ctrl+C: ['ctrl', 'c']
 * - Ctrl+Shift+T: ['control', 'shift', 't']
 *
 * @param keys - Array of key names (case-insensitive) that make up the combination.
 *               The order defines the press order; releases occur in reverse.
 * @returns A promise that resolves to a SeleniumResponse indicating success.
 *
 * @throws Error If the WebDriver instance is not available (ensureDriverExists fails)
 *         or if the underlying WebDriver actions fail.
 *
 * @example
 * await actionManager.pressKeyCombo(['ctrl', 's']);
 * @example
 * await actionManager.pressKeyCombo(['control', 'shift', 'N']);
 */
import { Key } from 'selenium-webdriver';
import { SeleniumResponse, BaseManager } from './types.js';

export class ActionManager extends BaseManager {
    async pressKey(key: string): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            const actions = this.driver!.actions({ bridge: true });

            // Handle special keys
            let keyToPress: string;
            switch (key.toLowerCase()) {
                case 'enter':
                case 'return':
                    keyToPress = Key.ENTER;
                    break;
                case 'tab':
                    keyToPress = Key.TAB;
                    break;
                case 'escape':
                case 'esc':
                    keyToPress = Key.ESCAPE;
                    break;
                case 'space':
                    keyToPress = Key.SPACE;
                    break;
                case 'backspace':
                    keyToPress = Key.BACK_SPACE;
                    break;
                case 'delete':
                    keyToPress = Key.DELETE;
                    break;
                case 'arrowup':
                case 'up':
                    keyToPress = Key.ARROW_UP;
                    break;
                case 'arrowdown':
                case 'down':
                    keyToPress = Key.ARROW_DOWN;
                    break;
                case 'arrowleft':
                case 'left':
                    keyToPress = Key.ARROW_LEFT;
                    break;
                case 'arrowright':
                case 'right':
                    keyToPress = Key.ARROW_RIGHT;
                    break;
                case 'home':
                    keyToPress = Key.HOME;
                    break;
                case 'end':
                    keyToPress = Key.END;
                    break;
                case 'pageup':
                    keyToPress = Key.PAGE_UP;
                    break;
                case 'pagedown':
                    keyToPress = Key.PAGE_DOWN;
                    break;
                case 'f1':
                    keyToPress = Key.F1;
                    break;
                case 'f2':
                    keyToPress = Key.F2;
                    break;
                case 'f3':
                    keyToPress = Key.F3;
                    break;
                case 'f4':
                    keyToPress = Key.F4;
                    break;
                case 'f5':
                    keyToPress = Key.F5;
                    break;
                case 'f6':
                    keyToPress = Key.F6;
                    break;
                case 'f7':
                    keyToPress = Key.F7;
                    break;
                case 'f8':
                    keyToPress = Key.F8;
                    break;
                case 'f9':
                    keyToPress = Key.F9;
                    break;
                case 'f10':
                    keyToPress = Key.F10;
                    break;
                case 'f11':
                    keyToPress = Key.F11;
                    break;
                case 'f12':
                    keyToPress = Key.F12;
                    break;
                case 'shift':
                    keyToPress = Key.SHIFT;
                    break;
                case 'control':
                case 'ctrl':
                    keyToPress = Key.CONTROL;
                    break;
                case 'alt':
                    keyToPress = Key.ALT;
                    break;
                default:
                    keyToPress = key;
            }

            await actions.keyDown(keyToPress).keyUp(keyToPress).perform();
            return { success: true, message: `Key '${key}' pressed successfully` };
        } catch (error) {
            throw new Error(`Failed to press key: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async pressKeyCombo(keys: string[]): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            const actions = this.driver!.actions({ bridge: true });

            // Press all keys down
            for (const key of keys) {
                let keyToPress: string;
                switch (key.toLowerCase()) {
                    case 'control':
                    case 'ctrl':
                        keyToPress = Key.CONTROL;
                        break;
                    case 'shift':
                        keyToPress = Key.SHIFT;
                        break;
                    case 'alt':
                        keyToPress = Key.ALT;
                        break;
                    case 'meta':
                    case 'cmd':
                        keyToPress = Key.META;
                        break;
                    default:
                        keyToPress = key;
                }
                actions.keyDown(keyToPress);
            }

            // Release all keys in reverse order
            for (let i = keys.length - 1; i >= 0; i--) {
                let keyToPress: string;
                switch (keys[i].toLowerCase()) {
                    case 'control':
                    case 'ctrl':
                        keyToPress = Key.CONTROL;
                        break;
                    case 'shift':
                        keyToPress = Key.SHIFT;
                        break;
                    case 'alt':
                        keyToPress = Key.ALT;
                        break;
                    case 'meta':
                    case 'cmd':
                        keyToPress = Key.META;
                        break;
                    default:
                        keyToPress = keys[i];
                }
                actions.keyUp(keyToPress);
            }

            await actions.perform();
            return { success: true, message: `Key combination '${keys.join('+')}' pressed successfully` };
        } catch (error) {
            throw new Error(`Failed to press key combination: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}
