
function dateDiff(startDate, endDate) {
    const diff = endDate.getTime() - startDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function daysAdd(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export default function accountRow({index, count, startDate, endDate, prev, faker, fn:{randomNumber}}) {
    const amt = parseFloat(faker.finance.amount(-100, 100, 0));
    const days = dateDiff(new Date(startDate), new Date(endDate));
    const initialBalance = Math.abs(randomNumber(100,10000));

    return {
        date: faker.date.between(prev?.date ?? startDate, daysAdd(startDate, days * index / count)).toISOString().substring(0, 10),
        desc: faker.lorem.words(randomNumber(2,5)),
        amt: amt,
        bal: (amt + (prev?.bal ?? initialBalance)),
    }
}

export const initialContext = {
    count: 100,
    startDate: '2022-01-01',
    endDate: '2022-12-31',
}
