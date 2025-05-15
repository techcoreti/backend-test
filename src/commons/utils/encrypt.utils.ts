import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class CryptService {
  private readonly saltRounds = 10;
  private readonly publicKey: string;
  private readonly privateKey: string;

  constructor(private readonly configService: ConfigService) {
    this.publicKey = this.configService
      .get('auth.publicKey')
      .replace(/\\n/g, '\n')!;
    this.privateKey = this.configService
      .get('auth.privateKey')
      .replace(/\\n/g, '\n')!;
  }

  async passwordCrypt(text: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(text, salt);
  }
  async passwordValidate(text: string, hash: string): Promise<boolean> {
    return bcrypt.compare(text, hash);
  }
  async encryptData(data: string): Promise<string> {
    return crypto
      .publicEncrypt(this.publicKey, Buffer.from(data))
      .toString('base64');
  }
  async decryptData(data: string): Promise<string> {
    return crypto
      .privateDecrypt(this.privateKey, Buffer.from(data, 'base64'))
      .toString();
  }
}
