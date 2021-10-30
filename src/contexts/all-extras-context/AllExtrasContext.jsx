import { useState, createContext } from 'react';

const INITIAL_VALUES = {
  isLoading: false,
  setIsLoading: (v) => {},
  modalOpened: false,
  setModalOpened: (v) => {},
  fetchCount: 0,
  setFetchCount: (v) => {},
  allFetchedExtras: null,
  setAllFetchedExtras: (v) => {},
  allExtrasPagination: {
    current_page: 1,
    per_page: 0,
    total: 0
  },
  setAllExtrasPagination: (v) => {},
  selectedExtra: null,
  setSelectedExtra: (v) => {}
};

const AllExtrasContext = createContext(INITIAL_VALUES);

export const AllExtrasProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(INITIAL_VALUES.isLoading);
  const [fetchCount, setFetchCount] = useState(INITIAL_VALUES.fetchCount);
  const [allFetchedExtras, setAllFetchedExtras] = useState(
    INITIAL_VALUES.allFetchedExtras
  );
  const [selectedExtra, setSelectedExtra] = useState(
    INITIAL_VALUES.selectedExtra
  );
  const [allExtrasPagination, setAllExtrasPagination] = useState(
    INITIAL_VALUES.allExtrasPagination
  );
  const [modalOpened, setModalOpened] = useState(INITIAL_VALUES.modalOpened);

  return (
    <AllExtrasContext.Provider
      value={{
        isLoading,
        setIsLoading,
        modalOpened,
        setModalOpened,
        fetchCount,
        setFetchCount,
        allFetchedExtras,
        setAllFetchedExtras,
        selectedExtra,
        setSelectedExtra,
        allExtrasPagination,
        setAllExtrasPagination
      }}
    >
      {children}
    </AllExtrasContext.Provider>
  );
};

export default AllExtrasContext;
