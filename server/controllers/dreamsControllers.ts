// src/controllers/dreamController.ts
import { Response } from 'express';
import mongoose, { PipelineStage } from 'mongoose';
import { AuthRequest } from '../middleware/authMiddleware';
import { Dream } from '../models//dreamModel';

/**
 * @desc Get all user's dreams
 * @route GET /api/dreams
 * @access Private
 */
export const getDreams = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    // Find all dreams for the user, sorted by creation date (newest first)
    const dreams = await Dream.find({ userId }).sort({ date: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: dreams.length,
      dreams,
    });
  } catch (error: any) {
    console.error('Get Dreams Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch dreams' });
  }
};

/**
 * @desc Get a single dream by ID
 * @route GET /api/dreams/:id
 * @access Private
 */
export const getDreamById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const dreamId = req.params.id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(dreamId)) {
        res.status(400).json({ success: false, message: 'Invalid dream ID format' });
        return;
    }

    // Find dream by ID and ensure it belongs to the authenticated user
    const dream = await Dream.findOne({ _id: dreamId, userId });

    if (!dream) {
      res.status(404).json({ success: false, message: 'Dream not found' });
      return;
    }

    res.status(200).json({
      success: true,
      dream,
    });
  } catch (error: any) {
    console.error('Get Dream By ID Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch dream' });
  }
};

/**
 * @desc Create a new dream
 * @route POST /api/dreams
 * @access Private
 */
export const createDream = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { title, content, date, clarity, mood, tags } = req.body;

    if (!userId) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    if (!title || !content) {
      res.status(400).json({ success: false, message: 'Title and content are required' });
      return;
    }

    const newDream = await Dream.create({
      userId,
      title,
      content,
      date,
      clarity,
      mood,
      tags: tags || [],
    });

    res.status(201).json({
      success: true,
      dream: newDream,
    });
  } catch (error: any) {
    console.error('Create Dream Error:', error);
    // Handle validation errors (e.g., clarity out of range)
    if (error.name === 'ValidationError') {
        res.status(400).json({ success: false, message: error.message });
        return;
    }
    res.status(500).json({ success: false, message: 'Failed to create dream' });
  }
};

/**
 * @desc Update a dream
 * @route PUT /api/dreams/:id
 * @access Private
 */
export const updateDream = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const dreamId = req.params.id;
    const updateData = req.body;

    if (!userId) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(dreamId)) {
        res.status(400).json({ success: false, message: 'Invalid dream ID format' });
        return;
    }

    // Prevent user from changing the userId
    if (updateData.userId) {
        delete updateData.userId;
    }
    // Update the updatedAt field
    updateData.updatedAt = new Date();

    const dream = await Dream.findOneAndUpdate(
      { _id: dreamId, userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!dream) {
      res.status(404).json({ success: false, message: 'Dream not found or not authorized' });
      return;
    }

    res.status(200).json({
      success: true,
      dream,
    });
  } catch (error: any) {
    console.error('Update Dream Error:', error);
    if (error.name === 'ValidationError') {
        res.status(400).json({ success: false, message: error.message });
        return;
    }
    res.status(500).json({ success: false, message: 'Failed to update dream' });
  }
};

/**
 * @desc Delete a dream
 * @route DELETE /api/dreams/:id
 * @access Private
 */
export const deleteDream = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const dreamId = req.params.id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(dreamId)) {
        res.status(400).json({ success: false, message: 'Invalid dream ID format' });
        return;
    }

    const dream = await Dream.findOneAndDelete({ _id: dreamId, userId });

    if (!dream) {
      res.status(404).json({ success: false, message: 'Dream not found or not authorized' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Dream deleted successfully',
      dream
    });
  } catch (error: any) {
    console.error('Delete Dream Error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete dream' });
  }
};

/**
 * @desc Toggle favorite status of a dream
 * @route PATCH /api/dreams/:id/favorite
 * @access Private
 */
export const toggleFavorite = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const dreamId = req.params.id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(dreamId)) {
        res.status(400).json({ success: false, message: 'Invalid dream ID format' });
        return;
    }

    const dream = await Dream.findOne({ _id: dreamId, userId });

    if (!dream) {
      res.status(404).json({ success: false, message: 'Dream not found or not authorized' });
      return;
    }

    // Toggle the status
    dream.isFavorite = !dream.isFavorite;
    dream.updatedAt = new Date(); // Update timestamp
    await dream.save();

    res.status(200).json({
      success: true,
      message: `Dream ${dream.isFavorite ? 'favorited' : 'unfavorited'}`,
      isFavorite: dream.isFavorite,
    });
  } catch (error: any) {
    console.error('Toggle Favorite Error:', error);
    res.status(500).json({ success: false, message: 'Failed to toggle favorite status' });
  }
};

/**
 * @desc Get all favorite dreams
 * @route GET /api/dreams/favorites
 * @access Private
 */
export const getFavoriteDreams = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    // Find all favorite dreams for the user
    const dreams = await Dream.find({ userId, isFavorite: true }).sort({ date: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: dreams.length,
      dreams,
    });
  } catch (error: any) {
    console.error('Get Favorite Dreams Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch favorite dreams' });
  }
};

/**
 * @desc Get all unique tags used by the user
 * @route GET /api/dreams/tags
 * @access Private
 */
export const getUniqueTags = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    const tags = await Dream.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $project: { _id: 0, tag: '$_id', count: 1 } }
    ]);

    res.status(200).json({
      success: true,
      count: tags.length,
      tags,
    });
  } catch (error: any) {
    console.error('Get Unique Tags Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch unique tags' });
  }
};

/**
 * @desc Get dream statistics
 * @route GET /api/dreams/stats
 * @access Private
 */
export const getDreamStatistics = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            res.status(401).json({ success: false, message: 'User not authenticated' });
            return;
        }

        const userObjectId = new mongoose.Types.ObjectId(userId);

        // 1. Total Dreams and Dreams This Month
        const totalDreamsPromise = Dream.countDocuments({ userId: userObjectId });

        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const dreamsThisMonthPromise = Dream.countDocuments({
            userId: userObjectId,
            date: { $gte: startOfMonth }
        });

        // 2. Average Clarity
        const avgClarityPipeline: PipelineStage[] = [
            { $match: { userId: userObjectId, clarity: { $exists: true } } },
            { $group: { _id: null, averageClarity: { $avg: '$clarity' } } }
        ];
        const avgClarityPromise = Dream.aggregate(avgClarityPipeline);

        // 3. Top Tags
        const topTagsPipeline: PipelineStage[] = [
            { $match: { userId: userObjectId, tags: { $exists: true, $ne: [] } } },
            { $unwind: '$tags' },
            { $group: { _id: '$tags', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }, // Top 5 tags
            { $project: { _id: 0, tag: '$_id', count: 1 } }
        ];
        const topTagsPromise = Dream.aggregate(topTagsPipeline);

        // 4. Mood Distribution
        const moodDistributionPipeline: PipelineStage[] = [
            { $match: { userId: userObjectId, mood: { $exists: true } } },
            { $group: { _id: '$mood', count: { $sum: 1 } } },
            { $project: { _id: 0, mood: '$_id', count: 1 } }
        ];
        const moodDistributionPromise = Dream.aggregate(moodDistributionPipeline);

        // 5. Dreams by Month (last 6 months)
        const dateLimit = new Date();
        dateLimit.setMonth(dateLimit.getMonth() - 6);

        const dreamsByMonthPipeline: PipelineStage[] = [
            { $match: { userId: userObjectId, date: { $gte: dateLimit } } },
            { $group: {
                _id: { $dateToString: { format: '%Y-%m', date: '$date' } },
                count: { $sum: 1 }
            } },
            { $sort: { _id: 1 } },
            { $project: { _id: 0, month: '$_id', count: 1 } }
        ];
        const dreamsByMonthPromise = Dream.aggregate(dreamsByMonthPipeline);

        // Execute all promises concurrently
        const [
            totalDreams,
            dreamsThisMonth,
            avgClarityResult,
            topTags,
            moodDistributionRaw,
            dreamsByMonth
        ] = await Promise.all([
            totalDreamsPromise,
            dreamsThisMonthPromise,
            avgClarityPromise,
            topTagsPromise,
            moodDistributionPromise,
            dreamsByMonthPromise
        ]);

        const averageClarity = avgClarityResult.length > 0
            ? parseFloat(avgClarityResult[0].averageClarity.toFixed(2))
            : 0;

        const moodDistribution = moodDistributionRaw.reduce((acc: { [key: string]: number }, item) => {
            acc[item.mood] = item.count;
            return acc;
        }, {});

        res.status(200).json({
            success: true,
            statistics: {
                totalDreams,
                dreamsThisMonth,
                averageClarity,
                topTags,
                moodDistribution,
                dreamsByMonth
            }
        });
    } catch (error: any) {
        console.error('Get Dream Statistics Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch dream statistics' });
    }
};

/**
 * @desc Search and filter dreams
 * @route GET /api/dreams/search
 * @access Private
 */
export const searchDreams = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { q, tags, mood, from, to } = req.query;

    if (!userId) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    const query: any = { userId };

    // Text search in title or content
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
      ];
    }

    // Filter by tags
    if (tags && typeof tags === 'string') {
      const tagArray = tags.split(',').map(tag => tag.trim().toLowerCase());
      query.tags = { $in: tagArray };
    }

    // Filter by mood
    if (mood && typeof mood === 'string') {
        query.mood = mood;
    }

    // Filter by date range
    query.date = {};
    if (from) {
      query.date.$gte = new Date(from as string);
    }
    if (to) {
      // Add one day to 'to' date to include dreams on that day
      const toDate = new Date(to as string);
      toDate.setDate(toDate.getDate() + 1);
      query.date.$lt = toDate;
    }
    // Remove date filter if no boundaries were set
    if (Object.keys(query.date).length === 0) {
      delete query.date;
    }

    const dreams = await Dream.find(query).sort({ date: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: dreams.length,
      dreams,
    });
  } catch (error: any) {
    console.error('Search Dreams Error:', error);
    res.status(500).json({ success: false, message: 'Failed to search dreams' });
  }
};
