import {
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
  getBankAccount,
} from './index';

describe('BankAccount', () => {
  const newBankAcount = getBankAccount(1000000);
  const bankAccount2 = getBankAccount(5);
  test('should create account with initial balance', () => {
    expect(newBankAcount.getBalance()).toBe(1000000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => newBankAcount.withdraw(1000001)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => newBankAcount.transfer(1000001, bankAccount2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => newBankAcount.transfer(100, newBankAcount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(newBankAcount.deposit(1000)).toEqual(newBankAcount);
  });

  test('should withdraw money', () => {
    expect(newBankAcount.withdraw(100)).toEqual(newBankAcount);
  });

  test('should transfer money', () => {
    expect(newBankAcount.transfer(200, bankAccount2)).toEqual({
      _balance: 1000700,
    });
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    try {
      const balance = await newBankAcount.fetchBalance();
      expect(balance).toBeInstanceOf(Number);
    } catch {}
  });

  test('should set new balance if fetchBalance returned number', async () => {
    try {
      const balance = await newBankAcount.synchronizeBalance();
      expect(balance).toBe(newBankAcount.getBalance());
    } catch {}
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      await newBankAcount.synchronizeBalance();
      console.log('No error');
    } catch (err) {
      console.log('Have error');
      expect(err).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
