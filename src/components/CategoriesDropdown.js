import React, { Component }  from "react";

class CategoriesDropdown extends Component {
    constructor(props){
        super(props);
    }

    clickItem = (e, c) => {
        ;
    }

    render(){
        const { props } = this;
        let st = props.style ? props.style : {};
        return (
            <>
                {
                    props.showDropDown ?
                    <>
                        {
                            !props.multiSelect ?
                            <div className="dropdown-wrapper" style={st}>
                                {
                                    props.categories.filter((c) => props.query ? c.category.indexOf(props.query) !== -1 : c).map((c) => 
                                    <div className={`dropdown-item`} key={c.id} onClick={(e) => this.props.selectCategory(e, c)}>
                                        {c.category}
                                    </div>
                                    )
                                }
                            </div>
                            :
                            <div className="dropdown-wrapper" style={st}>
             
                                {
                                    props.categories.filter((c) => props.query ? c.category.indexOf(props.query) !== -1 : c).map((c) => 
                                    <div className={`dropdown-item ${props.categoryFilters.includes(c.id) ? "selected" :""}`} key={c.id} onClick={(e) => props.clickCategoryItem(e,c)}>
                                        {c.category}
                                    </div>
                                    )
                                }
                            </div>
                        }
                    </>
                    : null
                   
                }
            </>
        );
    }
}

export default CategoriesDropdown;