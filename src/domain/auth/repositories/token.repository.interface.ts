export interface ITokenRepositoryInterface {
  generateToken(payload: unknown): string;
  verifyToken(token: string): unknown;
}
