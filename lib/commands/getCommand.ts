import { ElementHandle } from 'puppeteer';
import { Status } from '../types';
import { StatusCommand } from './statusCommand';

async function getPropertyAsJSON<T extends keyof HTMLInputElement>(
  element: ElementHandle<any>,
  propertyName: T,
): Promise<HTMLInputElement[T]> {
  const property = await element.getProperty(propertyName);
  return property.jsonValue();
}

export class GetCommand extends StatusCommand<Status> {
  protected async perform() {
    const fields = await this.getStatusFields();
    const [emojiValue, messageValue, busyValue] = await Promise.all([
      getPropertyAsJSON(fields.emoji, 'value'),
      getPropertyAsJSON(fields.message, 'value'),
      getPropertyAsJSON(fields.busy, 'checked'),
    ]);
    return {
      busy: busyValue,
      emoji: emojiValue as Status['emoji'],
      message: messageValue,
    };
  }
}
