function dateDiff(startDate, endDate) {
    const diff = endDate.getTime() - startDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function daysAdd(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export default function accountRow({index, count, startDate, endDate, prev, faker}) {
    const amt = parseFloat(faker.finance.amount(-100, 100, 0));
    const days = dateDiff(new Date(startDate), new Date(endDate));

    return {
        date: faker.date.between(prev?.date ?? startDate, daysAdd(startDate, days * index / count)),
        desc: faker.lorem.words(faker.datatype.number({min: 2, max: 6})),
        amt: amt,
        bal: (amt + (prev?.bal ?? 0)),
    }
}

export const initialContext = {
    count: 100,
    startDate: '2022-01-01',
    endDate: '2022-12-31'
}
