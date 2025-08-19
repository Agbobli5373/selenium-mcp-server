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
