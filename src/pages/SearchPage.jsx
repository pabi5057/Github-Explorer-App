import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setQuery } from '../features/search/searchSlice';
import { FadeLoader } from "react-spinners";

const SearchPage = ({darkMode}) => {
  const dispatch = useDispatch();
  const { query, users, loading } = useSelector((state) => state.search);


  const debouncedFetch = useCallback(
    debounce((value) => {
      dispatch(fetchUsers(value));
    }, 500),
    []
  );
  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(setQuery(value));
    debouncedFetch(value);
  };

  return (
    <>
      <div className="p-4 text-center">
        <h1 className='text-2xl font-stretch-normal mb-4'>Find Github Username</h1>
        <input
          value={query}
          onChange={handleChange}
          placeholder="Search GitHub username"
          className="border p-2 rounded-md"

        />
        <div className="mt-4">
          {
            loading ? (
              <div className='flex items-center justify-center min-h-[200px]'>
                <FadeLoader color={darkMode?"#fff":"#000000"} size={15} margin={5} speedMultiplier={2} />
              </div>
            ) : (
              <>
                {users.map((user) => (
                  <Link key={user.login} to={`/user/${user.login}`}>
                    <div className="flex items-center gap-4 border-b p-2">
                      <img src={user.avatar_url} alt="" className="w-10 h-10 rounded-full" />
                      <span>{user.login}</span>
                    </div>
                  </Link>
                ))}
              </>
            )
          }

        </div>
      </div>
    </>
  )
}

export default SearchPage;
