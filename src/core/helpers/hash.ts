import crypto from 'crypto';

import { secret_key } from '../../configs/auth.config.json'

export const getHash = (value: string): string => {
  return (
    crypto
      .createHmac('sha256', secret_key)
      .update(value)
      .digest('hex')
  );
};