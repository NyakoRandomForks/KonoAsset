use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::base::{AssetType, Avatar, AvatarWearable, OtherAsset, WorldObject};

#[derive(Serialize, Deserialize, Debug, Clone, specta::Type)]
#[serde(rename_all = "camelCase")]
pub struct AssetSummary {
    pub id: Uuid,
    pub asset_type: AssetType,
    pub name: String,
    pub creator: String,
    pub image_filename: Option<String>,
    pub has_memo: bool,
    pub dependencies: Vec<Uuid>,
    pub booth_item_id: Option<u64>,
    pub published_at: Option<i64>,
    pub category: Option<String>,
    pub tags: Vec<String>,
}

impl From<Avatar> for AssetSummary {
    fn from(asset: Avatar) -> Self {
        Self {
            id: asset.id,
            asset_type: AssetType::Avatar,
            name: asset.description.name,
            creator: asset.description.creator,
            image_filename: asset.description.image_filename,
            has_memo: asset.description.memo.is_some(),
            dependencies: asset.description.dependencies,
            booth_item_id: asset.description.booth_item_id,
            published_at: asset.description.published_at,
            category: None,
            tags: asset.description.tags,
        }
    }
}

impl From<AvatarWearable> for AssetSummary {
    fn from(asset: AvatarWearable) -> Self {
        let category = asset.category;

        Self {
            id: asset.id,
            asset_type: AssetType::AvatarWearable,
            name: asset.description.name,
            creator: asset.description.creator,
            image_filename: asset.description.image_filename,
            has_memo: asset.description.memo.is_some(),
            dependencies: asset.description.dependencies,
            booth_item_id: asset.description.booth_item_id,
            published_at: asset.description.published_at,
            category: (!category.is_empty()).then_some(category),
            tags: asset.description.tags,
        }
    }
}

impl From<WorldObject> for AssetSummary {
    fn from(asset: WorldObject) -> Self {
        let category = asset.category;

        Self {
            id: asset.id,
            asset_type: AssetType::WorldObject,
            name: asset.description.name,
            creator: asset.description.creator,
            image_filename: asset.description.image_filename,
            has_memo: asset.description.memo.is_some(),
            dependencies: asset.description.dependencies,
            booth_item_id: asset.description.booth_item_id,
            published_at: asset.description.published_at,
            category: (!category.is_empty()).then_some(category),
            tags: asset.description.tags,
        }
    }
}

impl From<OtherAsset> for AssetSummary {
    fn from(asset: OtherAsset) -> Self {
        let category = asset.category;

        Self {
            id: asset.id,
            asset_type: AssetType::OtherAsset,
            name: asset.description.name,
            creator: asset.description.creator,
            image_filename: asset.description.image_filename,
            has_memo: asset.description.memo.is_some(),
            dependencies: asset.description.dependencies,
            booth_item_id: asset.description.booth_item_id,
            published_at: asset.description.published_at,
            category: (!category.is_empty()).then_some(category),
            tags: asset.description.tags,
        }
    }
}
