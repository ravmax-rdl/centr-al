import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { unstable_cache } from 'next/cache';

async function fetchUserCount(): Promise<number> {
  const payload = await getPayload({ config: configPromise });

  try {
    const result = await payload.count({
      collection: 'users',
    });

    return result.totalDocs;
  } catch (error) {
    console.error('Error fetching user count:', error);
    return 0;
  }
}

/**
 * Get the total number of users in the database
 * This function is cached for 5 minutes to avoid excessive database queries
 */
export const getUserCount = unstable_cache(fetchUserCount, ['user-count'], {
  revalidate: 300, // Cache for 5 minutes
  tags: ['users-count'],
});

/**
 * Format the user count for display (e.g., 2400 -> "2.4K")
 */
export function formatUserCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  } else {
    return count.toString();
  }
}
