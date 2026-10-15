import type { Request, Response } from 'express';

/**
 * Health check endpoint for the serverless API.
 * Responds with system status, uptime, and configuration readiness.
 */
export async function healthHandler(req: Request, res: Response): Promise<void> {
  const apiKeyConfigured = Boolean(process.env.THEMEALDB_API_KEY);

  res.status(200).json({
    status: 'healthy',
    service: 'meal-planner-api',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    integrations: {
      themealdb: {
        status: 'active',
        keyConfigured: apiKeyConfigured,
        keySource: apiKeyConfigured ? 'environment' : 'default_test_key',
      },
    },
  });
}

export default healthHandler;
