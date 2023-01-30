import mysql from "mysql2";

const pool = mysql.createPool({
    host: process.env.HOST_MYSQL,
    port: process.env.PORT_MYSQL,
    user: process.env.USER_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    database: process.env.DB_MYSQL,
  });
  
const promisePool = pool.promise();

async function shop(slugify){

    const id_shop = await getIdShopBySlug(slugify);
    if (!id_shop) {
        return null;
    }

    const article = await getArticleByIdShop(id_shop);
    if (!article) {
        return null;
    }
}

async function getIdShopBySlug(slugify) {
    try {
        const [rows, _] = await promisePool.query(
            `SELECT id_shop FROM shops WHERE slugify_name = ?`,
            [slugify]
        );

        if (!rows || rows?.length === 0) {
            return null;
        }
        return rows[0].id_shop;
    } 
    catch (error) {
        return null;
    }
  }; 

async function getArticleByIdShop(id_shop) {
    try {
        const [rows, _] = await promisePool.query(
            `SELECT * FROM articles WHERE id_shop = ?`,
            [id_shop]
        );

        if (!rows || rows?.length === 0) {
            return null;
        }
        console.log("Value rows : ", rows);
        return rows[0].id_shop;
    } 
    catch (error) {
        return null;
        //pour test 
    }
};

export default onlineShop; 