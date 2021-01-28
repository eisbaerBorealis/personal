import pathlib

filePath = pathlib.Path(__file__).parent.absolute()
fileName = "gas_prices.txt"

try:
    fp = open(str(filePath) + "/" + fileName, 'r')

    years = {}

    for line in fp:
        splitLine = line.split(":")
        dates = splitLine[0].split("-")

        year = dates[2]
        month = dates[0]
        price = float(splitLine[1])
        if year not in years:
            years[year] = {}
            years[year]["low"] = price
            years[year]["high"] = price
            years[year]["sum"] = price
            years[year]["count"] = 1
            years[year][month] = {}
            years[year][month]["sum"] = price
            years[year][month]["count"] = 1
        else:
            if years[year]["low"] > price:
                years[year]["low"] = price
            if years[year]["high"] < price:
                years[year]["high"] = price
            years[year]["sum"] += price
            years[year]["count"] += 1

            if month not in years[year]:
                years[year][month] = {}
                years[year][month]["sum"] = price
                years[year][month]["count"] = 1
            else:
                years[year][month]["sum"] += price
                years[year][month]["count"] += 1
    
    for key, value in years.items():
        print("\n" + key + ":")

        lowText = "\tLow: " + "${:,.2f}".format(value["low"]) + ", "
        avgText = "Avg: " + "${:,.2f}".format(value["sum"] / value["count"]) + ", "
        highText = "High: " + "${:,.2f}".format(value["high"])
        print(lowText + avgText + highText)

        for key2, value2 in value.items():
            if key2 != "low" and key2 != "high" and key2 != "sum" and key2 != "count":
                monthText = "\t"

                if key2 == "01":
                    monthText += "January\t"
                elif key2 == "02":
                    monthText += "February"
                elif key2 == "03":
                    monthText += "March\t"
                elif key2 == "04":
                    monthText += "April\t"
                elif key2 == "05":
                    monthText += "May\t"
                elif key2 == "06":
                    monthText += "June\t"
                elif key2 == "07":
                    monthText += "July\t"
                elif key2 == "08":
                    monthText += "August\t"
                elif key2 == "09":
                    monthText += "September"
                elif key2 == "10":
                    monthText += "October\t"
                elif key2 == "11":
                    monthText += "November"
                elif key2 == "12":
                    monthText += "December"
                else:
                    print("\nERROR, something broke. (key2 was " + key2 + ")")
                
                monthText += "\t" + "${:,.2f}".format((value2["sum"] / value2["count"]))
                print(monthText)

except FileNotFoundError:
    print("\nError: File not found. Please make sure gas_prices.txt is in this program's folder and restart the program.")