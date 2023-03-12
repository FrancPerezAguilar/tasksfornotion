const { Client } = require("@notionhq/client");
const { NOTION_TOKEN } = require("../secrets");
const db_id = '8954e5ccb5ed466daeec75dd67146408';

export const notion = new Client({
    auth: NOTION_TOKEN,
});


export const getContentDatabase = async () => {
    const databaseId = db_id;
    const response = await notion.databases.retrieve({ database_id: databaseId });
    return response;
  }

export const getTaskList = async () => {
    const databaseId = db_id;
    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
              property: "Done",
              checkbox: {
                equals: false
                }
        },
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

export const createTask = async ( payload ) => {
    const response = await notion.pages.create({
        "parent": {
            "type": "database_id",
            "database_id": db_id
        },
        "properties": {
            "Done": {
                "checkbox": false,
            },
            "Name": {
                "title": [
                    {
                        "text": {
                            "content": payload.name,
                        }
                    }
                ]
            },
            "Tags": {
                "multi_select": [
                    {
                      "id": payload.tagID,
                    }
                ],
            },
            "Date": {
                "date": {
                  "start": payload.date,
                }
            },
        },
    });
    return response;
}