import types, { showError, showSuccess, showPageLoader } from '.';
import { messages } from '../utils';

describe('Actions', () => {
  it('should return error message', () => {
    expect(showError('test')).toEqual({ type: types.ERROR, payload: 'test' });
  });
  it('should return success message', () => {
    expect(showSuccess('test')).toEqual({ type: types.SUCCESS, payload: 'test' });
  });
  it('should return error message', () => {
    expect(showPageLoader('test')).toEqual({ type: types.SHOW_PAGE_LOADER, payload: 'test' });
  });
  it('should return network error message if no error is provided', () => {
    expect(showError()).toEqual({ type: types.ERROR, payload: messages.NETWORK_ERROR });
  });
  it('should return default success message if no message is provided', () => {
    expect(showSuccess()).toEqual({ type: types.SUCCESS, payload: messages.SUCCESS });
  });
});
