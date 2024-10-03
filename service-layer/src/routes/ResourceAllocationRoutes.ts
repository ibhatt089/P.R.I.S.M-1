import { Router } from 'express';
import { ResourceAllocationController } from '../controllers/ResourceAllocationController';

const resourceAllocationController = new ResourceAllocationController();
const resourceAllocationRoutes = Router();

resourceAllocationRoutes.get('/:id', (req, res, next) => resourceAllocationController.getAllocationById(req, res, next));
resourceAllocationRoutes.post('/', (req, res, next) => resourceAllocationController.createAllocation(req, res, next));
resourceAllocationRoutes.put('/:id', (req, res, next) => resourceAllocationController.updateAllocation(req, res, next));
resourceAllocationRoutes.delete('/:id', (req, res, next) => resourceAllocationController.deleteAllocation(req, res, next));
resourceAllocationRoutes.get('/', (req, res, next) => resourceAllocationController.listAllocations(req, res, next));

export default resourceAllocationRoutes;