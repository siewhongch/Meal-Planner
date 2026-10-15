import { Router } from 'express';
import { healthHandler } from './health';
import {
  getMealsByIngredientHandler,
  getMealDetailsHandler,
  getRandomMealHandler,
} from './themealdb';

export const apiRouter = Router();

// /api/health endpoint
apiRouter.get('/health', healthHandler);

// /api/meals endpoints (defaults to chicken_breast filter)
apiRouter.get('/meals', getMealsByIngredientHandler);
apiRouter.get('/meals/filter', getMealsByIngredientHandler);
apiRouter.get('/meals/lookup', getMealDetailsHandler);
apiRouter.get('/meals/random', getRandomMealHandler);

export default apiRouter;
