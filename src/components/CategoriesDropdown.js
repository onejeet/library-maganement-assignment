import React, { Component }  from "react";

class CategoriesDropdown extends Component {

    clickItem = (e, c) => {
        if(e.target.classList.contains("selected")){
            e.target.classList = 'dropdown-item';
        }else{
            e.target.classList += ' selected';
        }
        this.props.selectCategory(e, c);
    }

    render(){
        const { props } = this;
        let st = props.style ? props.style : {};
        return (
            <>
                {
                    props.showDropDown &&
                    <div className="dropdown-wrapper" style={st}>
                        {
                            props.categories.filter((c) => props.query ? c.category.indexOf(props.query) !== -1 : c).map((c) => 
                            <div className={`dropdown-item`} key={c.id} onClick={(e) => this.clickItem(e, c)}>
                                {c.category}
                            </div>
                            )
                        }
                    </div>
                }
            </>
        );
    }
}

export default CategoriesDropdown;