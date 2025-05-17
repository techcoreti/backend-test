import { SetMetadata } from '@nestjs/common';

export const Profiles = (...args: string[]) => SetMetadata('profile', args);
