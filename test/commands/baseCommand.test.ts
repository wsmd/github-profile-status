import { BaseCommand } from '../../lib/commands/baseCommand';

describe('commands/BaseCommand', () => {
  it("throws if an inhereted command does not implemnt its own 'perform' method", () => {
    class CoolCommand extends BaseCommand<any> {}

    const command = new CoolCommand({} as any);

    expect(() => command.perform()).toThrowError(/not implemented/);
  });
});
