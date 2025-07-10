import type { Slots } from 'vue'
export const container = (_: unknown, { slots }: { slots: Slots }) => {
  return slots.default && slots.default()
}
