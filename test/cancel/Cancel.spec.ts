import Cancel, { isCancel } from '../../cancel/Cancel'

describe('cancel::Cancel', () => {
  test('should return correct result when message is specified', () => {
    const cancel = new Cancel('Operation has been canceled')
    expect(cancel.message).toBe('Operation has been canceled')
  })

  test('should return true if value is a Cancel', () => {
    expect(isCancel(new Cancel())).toBeTruthy()
  })

  test('should return false if value is not a Cancel', () => {
    expect(isCancel({ foo: 'bar' })).toBeFalsy()
  })
})
