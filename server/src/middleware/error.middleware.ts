import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('====================================');
  console.error('[Global Error Handler]');
  console.error(err);
  console.error('====================================');

  const error = err instanceof Error ? err : new Error(String(err));

  res.status(500).json({
    success: false,
    error: error.name,
    message: error.message,
    stack: error.stack
  });
}
