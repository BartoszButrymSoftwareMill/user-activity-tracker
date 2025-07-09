import { z } from 'zod';
import { activityTypeEnum } from '../db/schema';

const activitySchema = z.object({
  userId: z.string().uuid(),
  type: z.enum(activityTypeEnum.enumValues),
  description: z.string(),
});

export default activitySchema;
