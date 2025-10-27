import SearchInput from "./SearchInput"
import SearchList from "./SearchList"

export default function AddUsers({query}) {


    return (
        <div>
            <SearchInput />
            <SearchList key={query} query={query} />
        </div>
    )

}