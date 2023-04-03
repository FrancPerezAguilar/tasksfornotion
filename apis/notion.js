const { Client } = require("@notionhq/client");
const { NOTION_TOKEN } = require("../secrets") /*SecureStore.getItemAsync("tfn_notion_user_token")*/;
const db_id = '8954e5ccb5ed466daeec75dd67146408' /*SecureStore.getItemAsync("tfn_database_selected_id")*/;

const notion = new Client({
    auth: NOTION_TOKEN,
});

export const checkConnection = async () => {
    const response = await notion.users.me();
    if (response?.id) {
        return true;
    }
    return false;
}

export const getDatabasesList = async () => {
    const response = await notion.search({
        filter: {
          value: 'database',
          property: 'object'
        },
        sort: {
          direction: 'descending',
          timestamp: 'last_edited_time'
        },
      });
    return response?.results;
}

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
                "multi_select": payload.tagID,
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