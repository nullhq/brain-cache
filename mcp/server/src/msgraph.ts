import { Client } from "@microsoft/microsoft-graph-client";

class Graph {

    private createGraphClient(accessToken: string) {
        return Client.init({
            authProvider: (done) => {
                done(null, accessToken);
            },
        });
    }

    async getUserProfile(accessToken: string) {
        const client = this.createGraphClient(accessToken);
        const user = await client.api("/me").get();
        return user;
    }

    async getSites(accessToken: string, search: string = "*") {
        const client = this.createGraphClient(accessToken);
        const response = await client
                .api("/sites")
                .query({ search: search})
                .select("id,displayName,description,webUrl,createdDateTime")
                .get();
        return response.value || [];
    }

    async getSiteById(accessToken: string, siteId: string) {
        const client = this.createGraphClient(accessToken);
        const site = await client.api(`/sites/${siteId}`).get();
        return site;
    }

    async getSiteByUrl(accessToken: string, hostname: string, serverRelativeUrl: string) {
        const client = this.createGraphClient(accessToken);
        const site = await client
                .api(`/sites/${hostname}:${serverRelativeUrl}`)
                .get()
        return site;
    }

    async getRootSite(accessToken: string) {
        const client = this.createGraphClient(accessToken);
        const site = await client.api("/sites/root").get();
        return site;
    }

    async getSiteLists(accessToken: string, siteId: string) {
        const client = this.createGraphClient(accessToken);
        const response = await client
            .api(`/sites/${siteId}/lists`)
            .select("id,name,displayName,description,webUrl,createdDateTime,lastModifiedDateTime")
            .get();
        return response.value;
    }

    async getListById(accessToken: string, siteId: string, listId: string) {
        const client = this.createGraphClient(accessToken);
        const list = await client.api(`/sites/${siteId}/lists/${listId}`).get();
        return list;
    }

     async getListColumns(accessToken: string, siteId: string, listId: string) {
        const client = this.createGraphClient(accessToken);
        const response = await client
            .api(`/sites/${siteId}/lists/${listId}/columns`)
            .get();
        return response.value;
    }

    async getListItems(accessToken: string, siteId: string, listId: string, top: number = 100) {
        const client = this.createGraphClient(accessToken);
        const response = await client
            .api(`/sites/${siteId}/lists/${listId}/items`)
            .expand("fields")
            .top(top)
            .get();
        return response.value;
    }
}

export const graph = new Graph();