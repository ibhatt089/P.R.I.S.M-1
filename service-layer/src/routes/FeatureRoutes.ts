import { Router } from 'express';
import { FeatureController } from '../controllers/FeatureController';

const featureController = new FeatureController();
const featureRoutes = Router();

featureRoutes.get('/:id', (req, res, next) => featureController.getFeatureById(req, res, next));
featureRoutes.post('/', (req, res, next) => featureController.createFeature(req, res, next));
featureRoutes.put('/:id', (req, res, next) => featureController.updateFeature(req, res, next));
featureRoutes.delete('/:id', (req, res, next) => featureController.deleteFeature(req, res, next));

export default featureRoutes;