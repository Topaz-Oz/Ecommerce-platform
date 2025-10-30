"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const cloudinary_1 = require("cloudinary");
const prisma = new client_1.PrismaClient();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const avatarUrls = {
    admin: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        'https://images.unsplash.com/photo-1548142813-c348350df52b',
    ],
    enterprise: [
        'https://images.unsplash.com/photo-1560179707-f14e90ef3623',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
    ],
    seller: [
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e',
        'https://images.unsplash.com/photo-1560250097-0b93528c311a',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
    ],
    logistics: [
        'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088',
        'https://images.unsplash.com/photo-1580674285054-bed31e145f59',
        'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc',
    ],
    shipper: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce',
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
        'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f',
        'https://images.unsplash.com/photo-1542178243-bc20204b769f',
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef',
        'https://images.unsplash.com/photo-1463453091185-61582044d556',
    ],
};
const productImages = {
    nivea: [
        'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8',
        'https://images.unsplash.com/photo-1570194065650-d707c8a231ba',
        'https://images.unsplash.com/photo-1612817288484-6f916006741a',
        'https://images.unsplash.com/photo-1592136957897-65126e3d2b25',
        'https://images.unsplash.com/photo-1598452963314-b09f397a5c48',
        'https://images.unsplash.com/photo-1573575155376-b5010099301b',
        'https://images.unsplash.com/photo-1601612628452-9e99ced43524',
        'https://images.unsplash.com/photo-1595535873420-a599195b3f4a',
    ],
    kolmar: [
        'https://images.unsplash.com/photo-1571781926291-c477ebfd024b',
        'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908',
        'https://images.unsplash.com/photo-1598452963314-b09f397a5c48',
        'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9',
        'https://images.unsplash.com/photo-1596755389378-c31d21fd1273',
        'https://images.unsplash.com/photo-1584949514490-73fc1a2d114c',
        'https://images.unsplash.com/photo-1598452963314-b09f397a5c48',
        'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908',
    ],
    seller: [
        'https://images.unsplash.com/photo-1527613426441-4da17471b66d',
        'https://images.unsplash.com/photo-1556228578-0d85b1a4d571',
        'https://images.unsplash.com/photo-1537349371197-4840074883ab',
        'https://images.unsplash.com/photo-1526947425960-945c6e72858f',
        'https://images.unsplash.com/photo-1571646034647-52e6ea84b28c',
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348',
        'https://images.unsplash.com/photo-1527613426441-4da17471b66d',
        'https://images.unsplash.com/photo-1556228578-0d85b1a4d571',
    ],
};
async function uploadImage(url, folder = 'ecommerce_seed') {
    try {
        const res = await cloudinary_1.v2.uploader.upload(url, { folder });
        return res.secure_url;
    }
    catch (err) {
        console.error('❌ Upload thất bại:', err);
        return url;
    }
}
async function main() {
    console.log('🌱 Bắt đầu seed dữ liệu...');
    const admins = await Promise.all([
        prisma.user.create({
            data: {
                email: 'admin1@shop.com',
                password: await bcrypt.hash('123456', 10),
                name: 'Liễu Như Yên',
                role: client_1.Role.ADMIN,
                avatar: await uploadImage(avatarUrls.admin[0], 'admin_avatars'),
            },
        }),
        prisma.user.create({
            data: {
                email: 'admin2@shop.com',
                password: await bcrypt.hash('123456', 10),
                name: 'Bạch Ngưng Băng',
                role: client_1.Role.ADMIN,
                avatar: await uploadImage(avatarUrls.admin[1], 'admin_avatars'),
            },
        }),
    ]);
    console.log('✅ Admin seeded');
    const enterprisesData = [
        {
            user: {
                create: {
                    email: 'nivea@enterprise.com',
                    password: await bcrypt.hash('123456', 10),
                    name: 'NIVEA Official',
                    role: client_1.Role.ENTERPRISE,
                    avatar: await uploadImage(avatarUrls.enterprise[0], 'enterprise_avatars'),
                },
            },
            companyName: 'NIVEA Vietnam',
            taxCode: 'NIV123456',
            verified: true,
            officialBrand: true,
            rating: 4.8,
        },
        {
            user: {
                create: {
                    email: 'kolmar@enterprise.com',
                    password: await bcrypt.hash('123456', 10),
                    name: 'Kolmar Korea',
                    role: client_1.Role.ENTERPRISE,
                    avatar: await uploadImage(avatarUrls.enterprise[1], 'enterprise_avatars'),
                },
            },
            companyName: 'Kolmar Vietnam',
            taxCode: 'KOL123456',
            verified: true,
            officialBrand: true,
            rating: 4.7,
        },
    ];
    const enterprises = await Promise.all(enterprisesData.map((ent) => prisma.enterprise.create({ data: ent })));
    console.log('✅ Enterprise seeded');
    const sellers = [];
    for (let i = 0; i < 4; i++) {
        const sellerUser = await prisma.user.create({
            data: {
                email: `seller${i + 1}@shop.com`,
                password: await bcrypt.hash('123456', 10),
                name: `Shop Owner ${i + 1}`,
                role: client_1.Role.SELLER,
                avatar: await uploadImage(avatarUrls.seller[i], 'seller_avatars'),
            },
        });
        const seller = await prisma.seller.create({
            data: {
                userId: sellerUser.id,
                storeName: `Shop ${i + 1}`,
                verified: true,
                rating: 4.0 + (i + 1) * 0.1,
            },
        });
        sellers.push(seller);
    }
    console.log('✅ Seller seeded');
    const category = await prisma.category.create({
        data: { name: 'Mỹ phẩm' },
    });
    for (const ent of enterprises) {
        const entProductImages = ent.companyName.includes('NIVEA')
            ? productImages.nivea
            : productImages.kolmar;
        for (let i = 0; i < 8; i++) {
            const images = [];
            const imageUrl = await uploadImage(entProductImages[i], 'products');
            images.push(imageUrl);
            await prisma.product.create({
                data: {
                    name: `${ent.companyName} Product ${i + 1}`,
                    description: `Sản phẩm chính hãng từ ${ent.companyName}`,
                    categoryId: category.id,
                    enterpriseId: ent.id,
                    images: images,
                    variants: {
                        create: {
                            color: i % 2 === 0 ? 'White' : 'Black',
                            size: 'Standard',
                            price: 100000 + i * 10000,
                            stock: 50 + i * 5,
                        },
                    },
                },
            });
        }
    }
    console.log('✅ Enterprise Products seeded');
    for (const seller of sellers) {
        for (let i = 0; i < 6; i++) {
            const images = [];
            const imageUrl = await uploadImage(productImages.seller[i], 'seller_products');
            images.push(imageUrl);
            await prisma.product.create({
                data: {
                    name: `${seller.storeName} Exclusive Product ${i + 1}`,
                    description: `Sản phẩm độc quyền của ${seller.storeName}.`,
                    categoryId: category.id,
                    sellerId: seller.id,
                    images: images,
                    variants: {
                        create: [
                            {
                                size: 'M',
                                color: 'Black',
                                price: 90000 + i * 7000,
                                stock: 30,
                            },
                            {
                                size: 'L',
                                color: 'White',
                                price: 90000 + i * 7000,
                                stock: 30,
                            },
                        ],
                    },
                },
            });
        }
    }
    console.log('✅ Seller Products seeded');
    const logisticsNames = ['GHN', 'GHTK', 'DHL'];
    for (const name of logisticsNames) {
        const user = await prisma.user.create({
            data: {
                email: `${name.toLowerCase()}@logistics.com`,
                password: await bcrypt.hash('123456', 10),
                name: `${name} Logistics`,
                role: client_1.Role.LOGISTICS,
                avatar: await uploadImage(avatarUrls.logistics[logisticsNames.indexOf(name)], 'logistics_avatars'),
            },
        });
        const partner = await prisma.logisticsPartner.create({
            data: {
                userId: user.id,
                name,
                baseRate: 25000,
                verified: true,
                rating: 4.5,
            },
        });
        for (let i = 0; i < 3; i++) {
            const shipperUser = await prisma.user.create({
                data: {
                    email: `${name.toLowerCase()}_shipper${i + 1}@mail.com`,
                    password: await bcrypt.hash('123456', 10),
                    name: `${name} Shipper ${i + 1}`,
                    phone: `090${i + 1}000${Math.floor(Math.random() * 90 + 10)}`,
                    avatar: await uploadImage(avatarUrls.shipper[i + logisticsNames.indexOf(name) * 3], 'shipper_avatars'),
                    role: client_1.Role.SHIPPER,
                },
            });
            await prisma.shipper.create({
                data: {
                    userId: shipperUser.id,
                    logisticsPartnerId: partner.id,
                    status: client_1.ShipperStatus.AVAILABLE,
                    rating: 4.2,
                },
            });
        }
    }
    console.log('✅ Logistics Partner & Shippers seeded');
    console.log('🎉 Hoàn tất seed dữ liệu!');
}
main()
    .catch((e) => {
    console.error('❌ Lỗi khi seed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map