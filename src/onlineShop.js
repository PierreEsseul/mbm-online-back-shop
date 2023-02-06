import mysql from "mysql2";
import dotenv from 'dotenv';

dotenv.config();


const pool = mysql.createPool({
    host: process.env.HOST_MYSQL,
    port: process.env.PORT_MYSQL,
    user: process.env.USER_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    database: process.env.DB_MYSQL,
  });
  
const promisePool = pool.promise();

async function shop(slugify){
    const shopValue = await getShopBySlug(slugify);
    if (!shopValue) {
        return null;
    };

    const user = await getUserByIdShop(shopValue.id_user);
    if (!user) {
        return null;
    };

    const articles = await getArticlesByIdShop(shopValue.id_shop);
    if (!articles) {
        return null;
    };

    const address = await getAddressByIdShop(shopValue.id_shop);
    if (!address) {
        return null;
    };

    return { user, shop: shopValue, articles, address };
}

async function getShopBySlug(slugify) {
    try {
        const [rows, _] = await promisePool.query(
            `SELECT * FROM shops WHERE slugify_name = ?`,
            [slugify]
        );
        if (!rows || rows?.length === 0) {
            return null;
        }

        const { created_at, updated_at, ...row } = rows[0];
        return row;
    } 
    catch (error) {
        console.error('Error: getIdShopBySlug(): ', error)
        return null;
    }
  }; 

async function getUserByIdShop(id_user) {
    try {
        const [rows, _] = await promisePool.query(
            `SELECT * FROM users WHERE id_user = ?`,
            [id_user]
        );
        if (!rows || rows?.length === 0) {
            return null;
        }

        const { created_at, updated_at, ...row } = rows[0];
        return row;
    }
    catch {
        console.error('Error: getUserByIdShop(): ', error)
        return null;
    }
};

async function getArticlesByIdShop(id_shop) {
    try {
        const [rows, _] = await promisePool.query(
            `SELECT * FROM articles WHERE id_shop = ?`,
            [id_shop]
        );

        if (!rows || rows?.length === 0) {
            return null;
        }
        return rows.map(row => {
            const { created_at, updated_at, ...rest } = row;
            return rest;
        });
    } 
    catch (error) {
        return null;
    }
};

async function getAddressByIdShop(id_shop) {
    try {
        const [rows, _] = await promisePool.query(
            `SELECT * FROM address WHERE id_shop = ?`,
            [id_shop]
        );

        if (!rows || rows?.length === 0) {
            return null;
        }

        const { created_at, updated_at, ...row } = rows[0];
        return row;
    } 
    catch (error) {
        return null;
    }
};

export default shop; 