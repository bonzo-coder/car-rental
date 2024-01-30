import IncomeBarChart from './IncomeBarChart';

const transactionsData = [
    {amount: 0, date: "Dec 11, 2023", id: "1"},
    {amount: 0, date: "Dec 12, 2023", id: "2"},
    {amount: 0, date: "Dec 13, 2023", id: "3"},
    {amount: 0, date: "Dec 14, 2023", id: "4"},
    {amount: 560, date: "Dec 15, 2023", id: "5" },
    {amount: 0, date: "Dec 16, 2023", id: "6"},
    {amount: 0, date: "Dec 17, 2023", id: "7"},
    {amount: 0, date: "Dec 18, 2023", id: "8"},
    {amount: 0, date: "Dec 19, 2023", id: "9"},
    {amount: 0, date: "Dec 20, 2023", id: "10"},
    {amount: 0, date: "Dec 21, 2023", id: "11"},
    {amount: 0, date: "Dec 22, 2023", id: "12"},
    {amount: 980, date: "Dec 23, '2023", id: "13" },
    {amount: 0, date: "Dec 24, 2023", id: "14"},
    {amount: 0, date: "Dec 25, 2023", id: "15"},
    {amount: 0, date: "Dec 26, 2023", id: "16"},
    {amount: 0, date: "Dec 27, 2023", id: "17"},
    {amount: 0, date: "Dec 28, 2023", id: "18"},
    {amount: 0, date: "Dec 29, 2023", id: "19"},
    {amount: 0, date: "Dec 30, 2023", id: "20"},
    {amount: 0, date: "Dec 31, 2023", id: "21"},
    {amount: 0, date: "Jan 1, 2024", id: "22"},
    { amount: 720, date: "Jan 2, 2024", id: "23" },
    {amount: 0, date: "Jan 3, 2024", id: "24"},
    {amount: 0, date: "Jan 4, 2024", id: "25"},
    {amount: 0, date: "Jan 5, 2024", id: "26"},
    {amount: 0, date: "Jan 6, 2024", id: "27"},
    {amount: 150, date: "Jan 7, 2024", id: "28"},
    {amount: 0, date: "Jan 8, 2024", id: "29"},
    {amount: 0, date: "Jan 9, 2024", id: "30"},
]


export default function Income() {
    
    const dataLength = transactionsData.length;
    let sum = 0;
    const sumCurrent = transactionsData.forEach(obj => {
        sum += obj.amount
    })

    return (
        <section className="host-income">
            <h1>Income</h1>
            <p>
                Last <span>30 days</span>
            </p>
            <h2>${`${sum}`}</h2>

            <IncomeBarChart  transactionsData={transactionsData}/>
            
            <div className="info-header">
                <h3>Your transactions ({`${dataLength}`})</h3>
                <p>
                    Last <span>30 days</span>
                </p>
            </div>
            <div className="transactions">
                {transactionsData.map((item) => {
                    if (item.amount !== 0) {
                        return (
                            <div key={item.id} className="transaction">
                                <h3>${item.amount}</h3>
                                <p>{item.date}</p>
                            </div>
                        )}
            })}
            </div>
        </section>
    )
}
