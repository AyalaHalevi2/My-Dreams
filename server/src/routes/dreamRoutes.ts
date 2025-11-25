// src/routes/dreamRoutes.ts
import { Router } from 'express';
import {
    getDreams,
    getDreamById,
    createDream,
    updateDream,
    deleteDream,
    toggleFavorite,
    getFavoriteDreams,
    getUniqueTags,
    getDreamStatistics,
    searchDreams
} from '../controllers/dreamsControllers';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// All dream routes require authentication
router.use(authenticate);

// Utility/Search/Stats Routes (must be before /:id routes)
router.get('/favorites', getFavoriteDreams);
router.get('/tags', getUniqueTags);
router.get('/stats', getDreamStatistics);
router.get('/search', searchDreams);

// CRUD Routes
router.get('/', getDreams);
router.get('/:id', getDreamById);
router.post('/', createDream);
router.put('/:id', updateDream);
router.delete('/:id', deleteDream);
router.patch('/:id/favorite', toggleFavorite); // Toggle favorite status

export default router;

