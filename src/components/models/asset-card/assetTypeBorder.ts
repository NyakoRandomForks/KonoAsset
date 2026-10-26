import { AssetType } from '@/lib/bindings'

export const assetTypeBorderClassName: Record<AssetType, string> = {
  Avatar: 'border-avatar',
  AvatarWearable: 'border-avatar-wearable',
  WorldObject: 'border-world-object',
  OtherAsset: 'border-other-asset',
}
