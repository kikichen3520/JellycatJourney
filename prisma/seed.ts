import { prisma } from "@/lib/prisma";

const skus = [
  {
    sku: 'SKY2DD',
    name: 'Sky Dragon',
    image: 'https://cdn11.bigcommerce.com/s-23s5gfmhr7/images/stencil/1000w/products/1475/52316/SKY2DD__70361.1769099171.jpg?c=1',
  },
  {
    sku: 'OLV2DD',
    name: 'Malachy Dragon',
    image: 'https://cdn11.bigcommerce.com/s-23s5gfmhr7/images/stencil/1000w/products/1758/49740/OLV2DD__80095.1743498902.jpg?c=1',
  },
  {
    sku: 'LAV2DD',
    name: 'Lavender Dragon',
    image: 'https://cdn11.bigcommerce.com/s-23s5gfmhr7/images/stencil/1000w/products/976/44380/LAV2DD__67931.1727979466.jpg?c=1',
  },
  {
    sku: 'VAL2DD',
    name: 'Heart Dragon',
    image: 'https://cdn11.bigcommerce.com/s-23s5gfmhr7/images/stencil/1000w/products/1918/51714/VAL2DD__87463.1763987166.jpg?c=1',
  },
  {
    sku: 'DEX2DD',
    name: 'Dexter Dragon',
    image: 'https://cdn11.bigcommerce.com/s-23s5gfmhr7/images/stencil/1000w/products/634/2807/DEXTER_DRAGON__15628.1714753891.jpg?c=1',
  },
  {
    sku: 'RBW2DD',
    name: 'Lazulia Dragon',
    image: 'https://cdn11.bigcommerce.com/s-23s5gfmhr7/images/stencil/1000w/products/1834/52315/RBW2DD__48151.1769099171.jpg?c=1',
  },
  {
    sku: 'PERS2DD',
    name: 'Persimmon Dragon',
    image: 'https://cdn11.bigcommerce.com/s-23s5gfmhr7/images/stencil/1000w/products/1470/44796/PERS2DD__60964.1727980014.jpg?c=1',
  },
  {
    sku: 'SNW2DD',
    name: 'Snow Dragon',
    image: 'https://cdn11.bigcommerce.com/s-23s5gfmhr7/images/stencil/1000w/products/1299/5519/DRAGONS_SNOW__12509.1727981322.jpg?c=1',
  },
  {
    sku: 'BARM2OD',
    name: 'Bartholomew Bear Hiking',
    image: 'https://cdn11.bigcommerce.com/s-23s5gfmhr7/images/stencil/1000w/products/2063/53246/BARM2OD__16695.1781272454.png?c=1',
  },
  {
    sku: 'BARM2BR',
    name: 'Bartholomew Bear Bathrobe',
    image: 'https://cdn11.bigcommerce.com/s-23s5gfmhr7/images/stencil/1000w/products/324/51480/BARM2BR__55068.1762120180.png?c=1',
  },
  {
    sku: 'BARM3BR',
    name: 'Bartholomew Bear',
    image: 'https://cdn11.bigcommerce.com/s-23s5gfmhr7/images/stencil/1000w/products/322/52679/BARM3BR__22606.1773232036.jpg?c=1',
  },
  // add 15-20 more real Jellycat products here
]

async function main() {
  for (const sku of skus) {
    await prisma.sku.upsert({
      where: { sku: sku.sku },
      update: {},
      create: sku,
    })
  }
  console.log(`Seeded ${skus.length} SKUs`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })