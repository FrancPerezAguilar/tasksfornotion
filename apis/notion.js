const { Client } = require("@notionhq/client");
const { NOTION_TOKEN } = require("../secrets");

export const notion = new Client({
    auth: NOTION_TOKEN,
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
    });
    return response;
}

export const updateTask = async ( pageID, obj ) => {

    const response = await notion.pages.update({
        page_id: pageID,
        properties: obj,
    });
    return response;
}