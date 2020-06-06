import { API_KEY } from "./API_KEY";

export default async function getApi(URL){
    const API = 'https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey='+ API_KEY +'&domainName='+ URL +'&outputFormat=JSON';
    const whois = await fetch(API);
    const whoisJson = await whois.json();
    const record = whoisJson.WhoisRecord;
    return {
        updatedDate: record.dataError === 'MISSING_WHOIS_DATA' ? record.dataError : record.registryData.updatedDate,
        expiresDate: record.dataError === 'MISSING_WHOIS_DATA' ? record.dataError : record.registryData.expiresDate,
        nameServers: record.dataError === 'MISSING_WHOIS_DATA' ? record.dataError : record.registryData?.nameServers?.hostNames,
        status: record.dataError === 'MISSING_WHOIS_DATA' ? record.dataError : record.status,
        registrarName: record.dataError === 'MISSING_WHOIS_DATA' ? record.dataError : record.registrarName
    };
}