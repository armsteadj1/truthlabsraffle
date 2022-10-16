import ALL_INCLUDED from "../collections_to_track";

const mockAssets = {
    "inducted": { floor_price: 0.029 },
    "triadron": { floor_price: 0.098 },
    "favored": { floor_price: 0.32 },
    "believer": { floor_price: 0.0459 },
    "puzzler": { floor_price: 1.5 },
    "harbinger": { floor_price: 4.2 },
    "mentor": { floor_price: 10 }
};
const getAllCollectionData = async (collections) => Promise.all(collections.map(async ({ slug }) => (await fetch(`https://api.opensea.io/api/v1/collection/${slug}`)).json()))
const findCollectionStats = (slug, collections) => collections.filter(({ collection }) => collection.slug === slug)[0].collection.stats
const findAssetStats = (slug, assets) => assets[slug];

const getStats = async () => {
    const allIncludedObject = ALL_INCLUDED.reduce((it, cur) => (it[cur.slug] = cur, it), {})
    const collections = ALL_INCLUDED.filter(c => c.type === "collection")
    const assets = ALL_INCLUDED.filter(c => c.type === "asset")
    const collectionsStats = await getAllCollectionData(collections);

    collections.map(
        ({ slug }) => {
            const stats = findCollectionStats(slug, collectionsStats);
            allIncludedObject[slug].stats = stats;
            allIncludedObject[slug].floor_price = stats.floor_price ?? 0;
            allIncludedObject[slug].costPerRaffle = stats.floor_price * allIncludedObject[slug].perRaffle;
        }
    )

    assets.map(
        ({ slug }) => {
            const stats = findAssetStats(slug, mockAssets);
            allIncludedObject[slug].stats = stats;
            allIncludedObject[slug].floor_price = stats.floor_price ?? 0;
            allIncludedObject[slug].costPerRaffle = stats.floor_price * allIncludedObject[slug].perRaffle;
        }
    )

    return allIncludedObject;
}

export default getStats;