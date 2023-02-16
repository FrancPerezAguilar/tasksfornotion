const { Client } = require("@notionhq/client");

export const notion = new Client({
    auth: 'secret_llXTIB6DvDDttnlA37IW0LIxZg4R2p0aLt4NJaZj5LV',
});


export const getContentDatabase = async () => {
    const databaseId = '8954e5ccb5ed466daeec75dd67146408';
    const response = await notion.databases.retrieve({ database_id: databaseId });
    return response;
  }

export const getTaskList = async () => {
    const databaseId = '8954e5ccb5ed466daeec75dd67146408';
    const response = await notion.databases.query({
        database_id: databaseId,
    })
    return response;
}