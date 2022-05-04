export const sortUsersOfObjectByKey = (arr: any[], key1: string, key2: string) => {
    // сортировка заточенная под строки
    arr.sort(((firstElem, secondElem) => {
        if (String(firstElem[key1][key2]) < String(secondElem[key1][key2])) {
            return -1;
        }
        if (String(firstElem[key1][key2]) > String(secondElem[key1][key2])) {
            return 1;
        }
        return 0;
    }))
    return arr;
}