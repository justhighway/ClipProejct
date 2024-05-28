import {categories} from '@/constants';
import {Depth1Category, Depth2Category} from '@/types';

const categoryMapping: {[key: string]: number} = {};
let currentId = 1;

Object.entries(categories).forEach(([depth1, depth2List]) => {
  depth2List.forEach(depth2 => {
    categoryMapping[`${depth1}_${depth2}`] = currentId++;
  });
});

export function getCategoryNumber(
  depth1: Depth1Category,
  depth2: Depth2Category,
): number {
  const key = `${depth1}_${depth2}`;
  return categoryMapping[key];
}
