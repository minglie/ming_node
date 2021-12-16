

class DateUtils {
     static difDate(startDate="2021-04-01",endDate="2022-02-10"){
        let flag = [1, 3, 5, 7, 8, 10, 12, 4, 6, 9, 11, 2];
        let start = new Date(startDate);
        let end = new Date(endDate);
        let year = end.getFullYear() - start.getFullYear();
        let month = end.getMonth() - start.getMonth();
        let day = end.getDate() - start.getDate();
        if (month < 0) {
            year--;
            month = end.getMonth() + (12 - start.getMonth());
        }
        if (day < 0) {
            month--;
            let index = flag.findIndex((temp) => {
                return temp === start.getMonth() + 1
            });
            let monthLength;
            if (index <= 6) {
                monthLength = 31;
            } else if (index > 6 && index <= 10) {
                monthLength = 30;
            } else {
                monthLength = 28;
            }
            day = end.getDate() + (monthLength - start.getDate());
        }
        return {year,month,day}
    }

}


module.exports = DateUtils;