import { NoDupsPipe } from './no-dups.pipe';

describe('NoDupsPipe', () => {
  it('create an instance', () => {
    const pipe = new NoDupsPipe();
    expect(pipe).toBeTruthy();
  });
});
