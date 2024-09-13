function ConvertDataToBr(data) {
        let  stringData = new Date(data);
        let day = stringData.getUTCDate();
        let month = stringData.getUTCMonth();
        let year = stringData.getUTCFullYear();

        return `${day} / ${month} / ${year}`;        
}

export default ConvertDataToBr;