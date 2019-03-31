import { StatusCommand } from './statusCommand';

export class ClearCommand extends StatusCommand<boolean> {
  protected async perform() {
    const fields = await this.getStatusFields();

    await this.page.evaluate(input => (input.value = ''), fields.emoji);
    await this.page.evaluate(input => (input.value = ''), fields.message);
    await this.page.evaluate(form => form.submit(), fields.form);

    await this.page.waitForResponse(
      response => response.url().includes('users/status') && response.status() === 200,
    );

    return true;
  }
}
