export default {
    formatDateTime: function (dateTime) {
        const date = new Date(dateTime);
        let day = date.getDate();
        let month = date.getMonth() + 1; // Months are zero-indexed
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        if(day < 10)
            day = '0'+ day
        if(month < 10)
            month = '0'+ month

        const formattedDate = `${day}/${month}/${year}`;
        const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`;

        return `${formattedDate} at ${formattedTime}`;
    },
    capitalize: function (string) {
        if(string === undefined)
            return
        string = string.toLowerCase()
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    orderByDate: function (list){
      list.sort(function (a, b){
        return b.date.localeCompare(a.date)
      })
      return list
    },


}