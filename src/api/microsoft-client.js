// import "isomorphic-fetch";
// import { ClientSecretCredential } from "@azure/identity";
// import { Client } from '@microsoft/microsoft-graph-client';
// import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import axios from 'axios';

const GROUP_ID = 'd1178874-54c3-4bb6-b4bb-8b4790d156b1';
const AUTH_TOKEN = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6IkhhTGZBLXMxR210TkRwTzVLNlpuVWVuaU9JLVB5WTNsMFE1SXVHSmFkdzgiLCJhbGciOiJSUzI1NiIsIng1dCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCIsImtpZCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9lOGUzY2ZlYy1iYzc2LTQxYjQtOWU2OS0zYTdmYjlhMWJiYzMvIiwiaWF0IjoxNjM1Nzc5MDAyLCJuYmYiOjE2MzU3NzkwMDIsImV4cCI6MTYzNTc4NDIyOSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFVUUF1LzhUQUFBQVZPZHY1bmx4LzdheDFQZDF5Y2QrdjZkbU5Pakg4S2NTNXFiNnpxVStWTjA0bml0ek8yMDREdnFtYVN4RXU2YXptdUxSWTRla1FMTjhMVWswS2Vnc2p3PT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcF9kaXNwbGF5bmFtZSI6IkdyYXBoIEV4cGxvcmVyIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6IkRhdmllcyIsImdpdmVuX25hbWUiOiJBZGFtIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiMTA5LjE1Mi4yMDcuMTkxIiwibmFtZSI6IkFkYW0gRGF2aWVzIiwib2lkIjoiMWU4OTNmNTItNzEwZi00MTFjLWE1ZGMtM2MwNTZmN2Q4MWQ4IiwicGxhdGYiOiI1IiwicHVpZCI6IjEwMDMyMDAxOThCNjMwMzgiLCJyaCI6IjAuQVM4QTdNX2o2SGE4dEVHZWFUcF91YUc3dzdYSWk5NzUyYkZJcUsyM1NOcHlVR1F2QUFBLiIsInNjcCI6IkNoYW5uZWwuUmVhZEJhc2ljLkFsbCBEaXJlY3RvcnkuQWNjZXNzQXNVc2VyLkFsbCBvcGVuaWQgcHJvZmlsZSBVc2VyLlJlYWQgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJLZ0c5S3RxV3NLbHJFazUwUW5VenR0dXJ4SVdCMlBzbDR1bDRRNlhFSVFjIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkVVIiwidGlkIjoiZThlM2NmZWMtYmM3Ni00MWI0LTllNjktM2E3ZmI5YTFiYmMzIiwidW5pcXVlX25hbWUiOiJhZEBqb20yMDIxLm9ubWljcm9zb2Z0LmNvbSIsInVwbiI6ImFkQGpvbTIwMjEub25taWNyb3NvZnQuY29tIiwidXRpIjoiRk9HempKZjNya3ktU1BMejh1MkxBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiZmU5MzBiZTctNWU2Mi00N2RiLTkxYWYtOThjM2E0OWEzOGIxIiwiZjAyM2ZkODEtYTYzNy00YjU2LTk1ZmQtNzkxYWMwMjI2MDMzIiwiZjI4YTFmNTAtZjZlNy00NTcxLTgxOGItNmExMmYyYWY2YjZjIiwiNjkwOTEyNDYtMjBlOC00YTU2LWFhNGQtMDY2MDc1YjJhN2E4IiwiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiMjkyMzJjZGYtOTMyMy00MmZkLWFkZTItMWQwOTdhZjNlNGRlIiwiZjJlZjk5MmMtM2FmYi00NmI5LWI3Y2YtYTEyNmVlNzRjNDUxIiwiNzI5ODI3ZTMtOWMxNC00OWY3LWJiMWItOTYwOGYxNTZiYmI4IiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19zdCI6eyJzdWIiOiJiZ2liYWdoMTNndnhqQV93SlQxRERPZlJTOWpJZ2xDZUpFajdkNXo2blJrIn0sInhtc190Y2R0IjoxNjI5NzA3NDY0fQ.D-cXvVZHuUBdchJrkDvrkqruqMk2U5J4p2O5pVvzgcQeB2mjQrEm6U_V7c86Ra5jmiXRl4DCxrgOoQG3R9jfX8LqWl0SBTy_96z5Cf8YB1WR8RL9RabMKiVHtzGyc0mjaTpbx2TKD2dUWnFGZRN_JzNVlzor9g3wEJEj7ff6ba0k55qntf-0v_lIB2Ry_ysKGH9PMPgqWvCTku-UrrkPZ6BzpXlW8oRNbAbPsHuwKCvxi1FyNfB4dvzSud1kT7ClXq-u7fxqmrZ_SSBGB6Se20QOf1EtWL-RKoH9U8jfXb9irJX9IPlguUZtnGqIe_h9cxQYMmiXRv9-FKoiIPYESg';

export const getTeamsMembers = async () => {
    // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    // const authProvider = new TokenCredentialAuthenticationProvider(credential, { });
    // const client = Client.initWithMiddleware({
    //     debugLogging: true,
    //     authProvider,
    // });
    let teamMembers;

    try {
        const teamMembersResponse = await axios.get(`https://graph.microsoft.com/v1.0/groups/${GROUP_ID}/members`, {
            headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`
            }
        });
        teamMembers = teamMembersResponse.data.value;
    } catch (error) {
        console.error('ERROR: Unexpected error getting team members', error);
    }

    return teamMembers;
}
