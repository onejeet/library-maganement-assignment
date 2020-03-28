export const filterBooks = (lib, query) => {
    query = query.toLowerCase();
    if(query.length > 0){
        return lib.filter((book) => {
            console.log(book);
            let check = (book.title && book.title.toLowerCase().indexOf(query) !== -1) || (book.author && book.author.toLowerCase().indexOf(query) !== -1) || (book.category && book.category.toLowerCase().indexOf(query) !== -1) ;
            return check;
        })
    }
    return lib;
};


export const sortBooks = (lib, ascSorting) => {
    let records = lib.sort((a, b) => {
        let comp = a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1;
        if(ascSorting){
            return comp;
        }
        return comp * -1;
    })
    return records;
}