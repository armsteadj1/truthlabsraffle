function NFTRow({ floor }) {
    return (
        <tr>
            <td>🔺Illuminati NFT</td>
            <td>8</td>
            <td>{{ floor }}</td>
            <td>1</td>
            <td>1ETH</td>
        </tr>
    )
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
    const res = await fetch(`https://api.opensea.io/api/v1/collection/illuminaticollective`)
    const { stats } = await res.json()

    return {
        props: {
            stats,
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 10, // In seconds
    }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
    const paths = ["illuminaticollective"].map((collection_slug) => ({
        params: { id: collection_slug },
    }))

    return { paths, fallback: 'blocking' }
}

export default Blog