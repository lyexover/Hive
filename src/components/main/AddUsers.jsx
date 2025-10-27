import SearchInput from "./SearchInput"
import SearchList from "./SearchList"
import styles from'@/css-modules/main/users.module.css'

export default function AddUsers({query}) {


    return (
        <div className={styles.AddUsersContainer}>
            <SearchInput />
            <SearchList key={query} query={query} />
        </div>
    )

}