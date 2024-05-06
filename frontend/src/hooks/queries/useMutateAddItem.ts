import {addItem} from '@/api';
import {UseMutationCustomOptions} from '@/types/common';
import {useMutation} from '@tanstack/react-query';

export default function useMutateAddItem(
  mutationOptions?: UseMutationCustomOptions,
) {
  return useMutation({
    mutationFn: addItem,
    ...mutationOptions,
  });
}
