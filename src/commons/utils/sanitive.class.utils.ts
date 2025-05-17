import { ClassConstructor, plainToInstance } from 'class-transformer';

/**
 * Função para sanitizar um objeto, transformando-o em uma instância de uma classe.
 * @param cls
 * @param plain
 * @returns
 */
export function sanitize<T, V>(cls: ClassConstructor<T>, plain: V): T {
  return plainToInstance(cls, plain);
}
