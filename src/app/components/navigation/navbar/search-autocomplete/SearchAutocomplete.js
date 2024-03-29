import React from "react";
import {Dropdown, Spinner} from "react-bootstrap";
import './SearchAutocomplete.css';
import PropTypes from "prop-types";

const SearchAutocomplete = (props) => {

    const renderDropdownItems = props.autocompleteData.data.map((s, idx) => (
        <React.Fragment key={s.symbol + "-dropdown-item"}>
            <Dropdown.Item onClick={() => props.onItemClick(s.symbol)} as={"div"}>
                <p className="mb-0 font-weight-bold">{s.symbol} <span className="text-muted">({s.exchange})</span></p>
                <span className="text-muted">{s.name}</span>
            </Dropdown.Item>
            {idx !== props.autocompleteData.length - 1 ? <Dropdown.Divider /> : null}
        </React.Fragment>

    ))

    const renderDropdownMenu = () => {
        if(props.autocompleteData.data.length === 0 && !props.loading) {
            return (<Dropdown.Item disabled>
                No data
            </Dropdown.Item>)
        }
        else {
            if(props.loading) {
                return (
                    <Dropdown.Item className="text-center" disabled>
                        <Spinner variant={'primary'} animation="border" style={{width: "40px", height: "40px"}}/>
                    </Dropdown.Item>
                )
            }
            else {
                return renderDropdownItems;
            }
        }
    }

    return(
        <Dropdown className={"ml-auto search-form d-none d-md-block"}>
            <Dropdown.Toggle as={"div"} className="autocomplete-dropdown-toggle">
                <input type="search" onChange={props.onSearchChange} className="form-control" placeholder={props.inputPlaceholder}/>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {renderDropdownMenu()}
            </Dropdown.Menu>
        </Dropdown>
    )
}

SearchAutocomplete.propTypes = {
    loading: PropTypes.bool,
    autocompleteData: PropTypes.object,
    onSearchChange: PropTypes.func,
    onItemClick: PropTypes.func,
    inputPlaceholder: PropTypes.string
}

export default SearchAutocomplete;
