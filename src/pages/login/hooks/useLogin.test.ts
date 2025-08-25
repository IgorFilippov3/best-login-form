import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { useLogin } from './useLogin';
import * as mockApi from '@/api/mock';

vi.mock('@/api/mock', () => ({
  mockLoginRequest: vi.fn(),
}));

describe('useLogin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with correct default state', () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.login).toBe('function');
    expect(typeof result.current.clearError).toBe('function');
  });

  it('sets loading state during login attempt', async () => {
    const mockLoginRequest = vi.mocked(mockApi.mockLoginRequest);
    mockLoginRequest.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.login({ email: 'test@example.com', password: 'password', remember: false });
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150));
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('returns user data on successful login', async () => {
    const mockUser = { id: 1, email: 'test@example.com', password: 'password' };
    const mockResponse = { data: { user: mockUser } };

    const mockLoginRequest = vi.mocked(mockApi.mockLoginRequest);
    mockLoginRequest.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useLogin());

    let loginResult;
    await act(async () => {
      loginResult = await result.current.login({ 
        email: 'test@example.com', 
        password: 'password', 
        remember: false 
      });
    });

    expect(loginResult).toEqual(mockResponse);
    expect(result.current.error).toBe(null);
    expect(result.current.isLoading).toBe(false);
  });

  it('sets error state on failed login', async () => {
    const mockLoginRequest = vi.mocked(mockApi.mockLoginRequest);
    mockLoginRequest.mockRejectedValue(new Error('Invalid credentials'));

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      try {
        await result.current.login({ 
          email: 'test@example.com', 
          password: 'wrong', 
          remember: false 
        });
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.error).toBe('Invalid credentials');
    expect(result.current.isLoading).toBe(false);
  });

  it('clears error when login is attempted', async () => {
    const mockLoginRequest = vi.mocked(mockApi.mockLoginRequest);
    mockLoginRequest.mockRejectedValue(new Error('First error'));

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      try {
        await result.current.login({ 
          email: 'test@example.com', 
          password: 'wrong', 
          remember: false 
        });
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.error).toBe('First error');

    mockLoginRequest.mockResolvedValue({ data: { user: { id: 1, email: 'test@example.com', password: 'password' } } });

    await act(async () => {
      await result.current.login({ 
        email: 'test@example.com', 
        password: 'password', 
        remember: false 
      });
    });

    expect(result.current.error).toBe(null);
  });

  it('clears error when clearError is called', async () => {
    const mockLoginRequest = vi.mocked(mockApi.mockLoginRequest);
    mockLoginRequest.mockRejectedValue(new Error('Test error'));

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      try {
        await result.current.login({ 
          email: 'test@example.com', 
          password: 'wrong', 
          remember: false 
        });
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.error).toBe('Test error');

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBe(null);
  });

  it('throws error on failed login', async () => {
    const mockLoginRequest = vi.mocked(mockApi.mockLoginRequest);
    mockLoginRequest.mockRejectedValue(new Error('Login failed'));

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await expect(result.current.login({ 
        email: 'test@example.com', 
        password: 'wrong', 
        remember: false 
      })).rejects.toThrow();
    });
  });

  it('handles non-Error objects in catch block', async () => {
    const mockLoginRequest = vi.mocked(mockApi.mockLoginRequest);
    mockLoginRequest.mockRejectedValue('String error');

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      try {
        await result.current.login({ 
          email: 'test@example.com', 
          password: 'wrong', 
          remember: false 
        });
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.error).toBe(null);
    expect(result.current.isLoading).toBe(false);
  });

  it('sets generic error message when error has no message', async () => {
    const mockLoginRequest = vi.mocked(mockApi.mockLoginRequest);
    const errorWithoutMessage = new Error();
    errorWithoutMessage.message = '';
    mockLoginRequest.mockRejectedValue(errorWithoutMessage);

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      try {
        await result.current.login({ 
          email: 'test@example.com', 
          password: 'wrong', 
          remember: false 
        });
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.error).toBe('Login failed');
  });
});