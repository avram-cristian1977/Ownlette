import '../components/Pagination.css'

const Pagination = ({ recipesPerPage, totalRecipes, paginate }) => {


    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
        pageNumbers.push(i)
    }
    return <div className="pagNumbersNav">
        <div className="paginationNumbers">
            {pageNumbers.map(number => {
                return <span  key={number}>
                    <a onClick={()=>paginate(number)} href="!#" >{number}</a>
                </span>
            })}
        </div>
    </div>
}

export default Pagination;