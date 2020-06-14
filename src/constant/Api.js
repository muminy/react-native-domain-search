export default async function getApi(URL){
    const API = 'https://puuwto.com/api/domain/'+ URL;
    const whois = await fetch(API);
    const whoisJson = await whois.json();
    const record = whoisJson;
    return {
        updatedDate: record.updatedDate || 'NOT_FOUND',
        expiresDate: record.registrarRegistrationExpirationDate ? record.registrarRegistrationExpirationDate : ( record.registryExpiryDate || 'NOT_FOUND'),
        nameServers: record.nameServer || 'NOT_FOUND',
        status: record.domainName ? 'active' : 'inactive',
        registrarName: record.registrar || 'NOT_FOUND'
    };
}