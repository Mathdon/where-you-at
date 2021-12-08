// import "isomorphic-fetch";
// import { ClientSecretCredential } from "@azure/identity";
// import { Client } from '@microsoft/microsoft-graph-client';
// import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import axios from 'axios';

const GROUP_ID = 'd1178874-54c3-4bb6-b4bb-8b4790d156b1';
const AUTH_TOKEN = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6Ik1ZQ2k4VTZGdFp6TDVJNjlpUE51NDM0dTU2bllDd1pMN09jT0M4S2hQNFUiLCJhbGciOiJSUzI1NiIsIng1dCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCIsImtpZCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9lOGUzY2ZlYy1iYzc2LTQxYjQtOWU2OS0zYTdmYjlhMWJiYzMvIiwiaWF0IjoxNjM4OTcxNTUwLCJuYmYiOjE2Mzg5NzE1NTAsImV4cCI6MTYzODk3NjE5MiwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFVUUF1LzhUQUFBQXU5Mm84cDlwdm04eDZKRXFycDdNQVUyM1puUG9EblhWVmVTV2hOYVRFOEMzamJtdEVwQWtOQnV0NXpXRWFPTUt0ME1IUjB6ZnFoN3hQeXRzVkpPamRRPT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcF9kaXNwbGF5bmFtZSI6IkdyYXBoIEV4cGxvcmVyIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6IkRhdmllcyIsImdpdmVuX25hbWUiOiJBZGFtIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiMTA5LjE0OC40LjEzMyIsIm5hbWUiOiJBZGFtIERhdmllcyIsIm9pZCI6IjFlODkzZjUyLTcxMGYtNDExYy1hNWRjLTNjMDU2ZjdkODFkOCIsInBsYXRmIjoiNSIsInB1aWQiOiIxMDAzMjAwMTk4QjYzMDM4IiwicmgiOiIwLkFTOEE3TV9qNkhhOHRFR2VhVHBfdWFHN3c3WElpOTc1MmJGSXFLMjNTTnB5VUdRdkFBQS4iLCJzY3AiOiJDaGFubmVsLlJlYWRCYXNpYy5BbGwgRGlyZWN0b3J5LkFjY2Vzc0FzVXNlci5BbGwgb3BlbmlkIHByb2ZpbGUgVXNlci5SZWFkIGVtYWlsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiS2dHOUt0cVdzS2xyRWs1MFFuVXp0dHVyeElXQjJQc2w0dWw0UTZYRUlRYyIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJFVSIsInRpZCI6ImU4ZTNjZmVjLWJjNzYtNDFiNC05ZTY5LTNhN2ZiOWExYmJjMyIsInVuaXF1ZV9uYW1lIjoiYWRAam9tMjAyMS5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJhZEBqb20yMDIxLm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6InYyZ3Rja1ZqbWtlMFMwdHlONmdRQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImZlOTMwYmU3LTVlNjItNDdkYi05MWFmLTk4YzNhNDlhMzhiMSIsImYwMjNmZDgxLWE2MzctNGI1Ni05NWZkLTc5MWFjMDIyNjAzMyIsImYyOGExZjUwLWY2ZTctNDU3MS04MThiLTZhMTJmMmFmNmI2YyIsIjY5MDkxMjQ2LTIwZTgtNGE1Ni1hYTRkLTA2NjA3NWIyYTdhOCIsIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCIsIjI5MjMyY2RmLTkzMjMtNDJmZC1hZGUyLTFkMDk3YWYzZTRkZSIsImYyZWY5OTJjLTNhZmItNDZiOS1iN2NmLWExMjZlZTc0YzQ1MSIsIjcyOTgyN2UzLTljMTQtNDlmNy1iYjFiLTk2MDhmMTU2YmJiOCIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfc3QiOnsic3ViIjoiYmdpYmFnaDEzZ3Z4akFfd0pUMURET2ZSUzlqSWdsQ2VKRWo3ZDV6Nm5SayJ9LCJ4bXNfdGNkdCI6MTYyOTcwNzQ2NH0.bM3Bh6YUhQ4hHIIqKpt8mGzEZMyyUY15z96kZqxZjdZ05Ml_aor_P-0h-hdloywADIFF1lhX5gH889p0wViwy5pfsgpMPITGsY1ZJA-FM9FQr6MfpJCNqxAcCNnNfBOoXE7qmHS-tcU0duLODMdPQeU4Kji-OCCoWY4jPbBkqeCfisJeuokxBWdNItjee5IFjj5TW4ai3vDaM2cXN3XCP--Dp0DBbZlkh8wSkNed8C_RTDylb7wpAIMPpoPuekWQp4Skv81Z3uhYjRl6uwYdnL2iMfSwl--v9-HLpuZN0Kb8QVpm3DK3OSvLkvCkGeilv7NOm8Bd_thHTrznc8_N7Q';

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
